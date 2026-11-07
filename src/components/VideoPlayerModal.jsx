import React from 'react';
import { X, Bookmark, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function VideoPlayerModal({ video, onClose }) {
  const { isVideoSaved, toggleSaveVideo } = useStudent();

  if (!video) return null;

  const saved = isVideoSaved(video.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-4xl max-h-[92vh] rounded-3xl bg-theme-card border border-theme shadow-theme-lg flex flex-col overflow-hidden"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-theme bg-theme-secondary">
          <div className="flex items-center gap-2">
            <span className="badge-pill bg-theme-primary text-white text-[11px]">
              {video.category}
            </span>
            <span className="text-xs font-semibold text-theme-muted hidden sm:inline">
              Duration: {video.duration}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveVideo(video.id)}
              className={`p-2 rounded-xl border border-theme text-xs font-bold flex items-center gap-1.5 transition-colors ${
                saved 
                  ? 'bg-theme-primary text-white' 
                  : 'bg-theme-card text-theme-main hover:bg-theme-secondary'
              }`}
              title={saved ? 'Remove from saved' : 'Save for later'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
              <span className="hidden sm:inline">{saved ? 'Saved' : 'Save Video'}</span>
            </button>

            <a
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-theme bg-theme-card text-theme-muted hover:text-theme-main hover:bg-theme-secondary transition-colors"
              title="Open in YouTube"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-theme-muted hover:text-theme-main hover:bg-theme-main transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Responsive YouTube Embed Container */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/90 shadow-theme-md border border-theme">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Video Metadata & Description */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-extrabold text-theme-main font-heading leading-snug">
              {video.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-xs text-theme-muted pb-2 border-b border-theme">
              <span className="font-bold text-theme-main">Channel: {video.channelName}</span>
              <span>•</span>
              <span>{video.views}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-theme-secondary text-[11px] font-semibold text-theme-primary">
                Level: {video.level}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-theme-muted leading-relaxed">
              {video.description}
            </p>

            {/* Key Learning Takeaways */}
            {video.takeaways && video.takeaways.length > 0 && (
              <div className="p-4 rounded-2xl bg-theme-secondary/70 border border-theme space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-theme-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Key Takeaways for Your Application
                </h4>
                <ul className="space-y-1.5">
                  {video.takeaways.map((point, idx) => (
                    <li key={idx} className="text-xs text-theme-main flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
