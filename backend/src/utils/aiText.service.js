import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const generateSummary = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Summarize this memory emotionally." },
      { role: "user", content: text }
    ]
  });

  return response.choices[0].message.content;
};

export const generateCaption = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Generate a short emotional caption." },
      { role: "user", content: text }
    ]
  });

  return response.choices[0].message.content;
};
