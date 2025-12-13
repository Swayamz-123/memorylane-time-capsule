const buildCapsuleEmailHTML = (capsule) => {
  let html = `<h2>${capsule.title}</h2>`;

  if (capsule.description) {
    html += `<p>${capsule.description}</p>`;
  }

  capsule.media.forEach((item) => {
    if (item.type === "text") {
      html += `<p>${item.content}</p>`;
    }

    if (item.type === "image") {
      html += `<p>🖼️ <a href="${item.url}">View Image</a></p>`;
    }

    if (item.type === "audio") {
      html += `<p>🎧 <a href="${item.url}">Listen Audio</a></p>`;
    }

    if (item.type === "video") {
      html += `<p>🎥 <a href="${item.url}">Watch Video</a></p>`;
    }
  });

  html += `<p><strong>— MemoryLane Team</strong></p>`;

  return html;
};

export default buildCapsuleEmailHTML;
