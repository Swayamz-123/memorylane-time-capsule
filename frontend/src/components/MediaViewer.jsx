import React from "react";

const MediaViewer = ({ media }) => {
  if (!media || !media.type) return null;

  const baseClasses = "group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-200/40 p-8 hover:shadow-3xl hover:-translate-y-1 transition-all duration-700 overflow-hidden";

  switch (media.type) {
    case "text":
      return (
        <div className={`${baseClasses} bg-linear-to-br from-amber-50/80 to-orange-50/80`}>
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
          <div className="flex items-start gap-4 mb-6 relative z-10">
            <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl shadow-xl border border-amber-200/50 shrink-0">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-lg font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent uppercase tracking-wide relative z-10">
              Written Memory
            </h3>
          </div>
          <div className="relative z-10">
            <p className="text-xl font-medium text-amber-900 whitespace-pre-wrap leading-relaxed bg-linear-to-r from-amber-50/80 to-orange-50/80 backdrop-blur-sm p-8 rounded-2xl border border-amber-200/30 shadow-xl">
              {media.content}
            </p>
          </div>
        </div>
      );

    case "image":
      return (
        <div className={`${baseClasses} bg-linear-to-br from-amber-50/80 to-orange-50/80 overflow-hidden`}>
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
          <div className="bg-linear-to-r from-amber-100/80 to-orange-100/80 backdrop-blur-sm px-6 py-4 border-b border-amber-200/50 shadow-lg relative z-10 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-amber-200 to-orange-200 rounded-xl shadow-md">
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-bold bg-linear-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent uppercase tracking-wide">
                Photo Memory
              </span>
            </div>
          </div>
          <div className="relative z-10 p-4">
            <img
              src={media.url}
              alt="Capsule media"
              className="w-full h-96 object-contain bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      );

    case "video":
      return (
        <div className={`${baseClasses} bg-linear-to-br from-amber-50/80 to-orange-50/80 overflow-hidden`}>
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
          <div className="bg-linear-to-r from-amber-100/80 to-orange-100/80 backdrop-blur-sm px-6 py-4 border-b border-amber-200/50 shadow-lg relative z-10 mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-linear-to-br from-amber-200 to-orange-200 rounded-xl shadow-md">
                <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-bold bg-linear-to-r from-amber-800 to-orange-800 bg-clip-text text-transparent uppercase tracking-wide">
                Video Memory
              </span>
            </div>
          </div>
          <div className="relative z-10">
            <video
              src={media.url}
              controls
              className="w-full h-96 rounded-2xl bg-linear-to-br from-gray-900 to-black shadow-2xl"
            />
          </div>
        </div>
      );

    case "audio":
      return (
        <div className={`${baseClasses} bg-linear-to-br from-amber-50/80 to-orange-50/80`}>
          <div className="absolute inset-0 bg-linear-to-r from-amber-400/10 via-orange-400/5 to-amber-400/10 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="relative p-4 bg-linear-to-br from-amber-200 to-orange-200 rounded-3xl shadow-2xl border border-amber-300/50 group-hover:scale-110 transition-all duration-500">
              <svg className="w-8 h-8 text-amber-800 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black bg-linear-to-r from-amber-900 to-orange-900 bg-clip-text text-transparent uppercase tracking-wide">
                Audio Recording
              </h3>
            </div>
          </div>
          <div className="relative z-10">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-amber-200/30 shadow-xl">
              <audio
                src={media.url}
                controls
                className="w-full"
              />
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default MediaViewer;
