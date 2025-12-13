import React from "react";

const MediaViewer = ({ media }) => {
  if (!media || !media.type) return null;

  switch (media.type) {
    case "text":
      return (
        <div className="bg-gray-50 border rounded p-4">
          <p className="text-gray-800 whitespace-pre-wrap">
            {media.content}
          </p>
        </div>
      );

    case "image":
      return (
        <div className="border rounded overflow-hidden">
          <img
            src={media.url}
            alt="Capsule media"
            className="w-full object-contain"
          />
        </div>
      );

    case "video":
      return (
        <div className="border rounded overflow-hidden">
          <video
            src={media.url}
            controls
            className="w-full"
          />
        </div>
      );

    case "audio":
      return (
        <div className="border rounded p-3">
          <audio
            src={media.url}
            controls
            className="w-full"
          />
        </div>
      );

    default:
      return null;
  }
};

export default MediaViewer;
