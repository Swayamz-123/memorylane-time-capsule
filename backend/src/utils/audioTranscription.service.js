import OpenAI from "openai";
import axios from "axios";
import fs from "fs";
import path from "path";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const transcribeAudioFromUrl = async (audioUrl) => {
  const tempDir = "temp";
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const tempPath = path.join(tempDir, `audio-${Date.now()}.mp3`);

  const response = await axios({
    url: audioUrl,
    method: "GET",
    responseType: "stream"
  });

  await new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(tempPath);
    response.data.pipe(stream);
    stream.on("finish", resolve);
    stream.on("error", reject);
  });

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(tempPath),
    model: "whisper-1"
  });

  fs.unlinkSync(tempPath);

  return transcription.text;
};
