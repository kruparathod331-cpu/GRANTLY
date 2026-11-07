import React, { useState } from 'react';
import { 
  GraduationCap, 
  Search, 
  Play, 
  Bookmark, 
  Sparkles, 
  Clock, 
  Eye, 
  ExternalLink, 
  FolderPlus,
  BookOpen,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { useStudent } from '../context/StudentContext';
import { 
  LEARNING_VIDEOS, 
  LEARNING_CATEGORIES, 
  LEARNING_COLLECTIONS 
} from '../data/learningVideos';
import VideoPlayerModal from '../components/VideoPlayerModal';

export default function Learn() {
  const { isVideoSaved, toggleSaveVideo, savedVideos } = useStudent();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Guides');
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [onlySaved, setOnlySaved] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);

  // Filtered Videos
  const filteredVideos = LEARNING_VIDEOS.filter((vid) => {
    // 1. Text search
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      vid.title.toLowerCase().includes(q) || 
      vid.channelName.toLowerCase().includes(q) ||
      vid.description.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    // 2. Category
    if (selectedCategory !== 'All Guides' && vid.category !== selectedCategory) {
      return false;
    }

    // 3. Collection
    if (selectedCollection && !vid.collections?.includes(selectedCollection)) {
      return false;
    }

    // 4. Saved Only
    if (onlySaved && !isVideoSaved(vid.id)) {
      return false;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme shadow-theme-sm relative overflow-hidden">
        <div 
          className="absolute right-0 top-0 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: 'var(--primary)' }}
        />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2">
            <span className="badge-pill bg-theme-secondary text-theme-main text-xs font-bold">
              YouTube Education Hub
            </span>
            <span className="text-xs text-theme-muted font-semibold">
              • Verified Educational Masterclasses
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-theme-main font-heading">
            GRANTLY LEARN
          </h1>
          <p className="text-xs sm:text-sm text-theme-muted max-w-xl leading-relaxed">
            "Learn the skills. Strengthen your application. Unlock opportunities." Master personal statements, behavioral interviews, and financial aid strategies.
          </p>
        </div>

        {/* Saved Videos Counter Pill */}
        <button
          onClick={() => setOnlySaved(!onlySaved)}
          className={`p-3 rounded-2xl border text-xs font-bold flex items-center gap-2 transition-all self-start md:self-auto ${
            onlySaved 
              ? 'bg-theme-primary text-white border-theme-primary' 
              : 'bg-theme-card border-theme text-theme-main hover:bg-theme-secondary'
          }`}
        >
          <Bookmark className={`w-4 h-4 ${onlySaved ? 'fill-white' : ''}`} />
          <span>{onlySaved ? 'Showing Saved' : `My Saved Videos (${savedVideos.length})`}</span>
        </button>
      </div>

      {/* Featured Learning Collections Strip */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-theme-muted flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
          Curated Learning Tracks
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {LEARNING_COLLECTIONS.map((col) => {
            const isSelected = selectedCollection === col.id;
            return (
              <button
                key={col.id}
                onClick={() => {
                  setSelectedCollection(isSelected ? null : col.id);
                  setSelectedCategory('All Guides');
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-theme-secondary border-theme-primary shadow-xs ring-2 ring-primary/20'
                    : 'bg-theme-card border-theme hover:border-theme-primary'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-theme-main text-theme-primary">
                      {col.videoCount} Masterclasses
                    </span>
                    {isSelected && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-theme-primary" />
                    )}
                  </div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-theme-main font-heading group-hover:text-theme-primary transition-colors">
                    {col.title}
                  </h4>
                  <p className="text-[11px] text-theme-muted mt-1 line-clamp-2">
                    {col.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Toolbar: Search & Category Chips */}
      <div className="p-5 rounded-3xl bg-theme-card border border-theme shadow-theme-sm space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-theme-muted absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search learning masterclasses (e.g. SOP, interview, resume, financial aid)..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl text-xs sm:text-sm border border-theme bg-theme-main text-theme-main focus:outline-none focus:border-theme-primary"
          />
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-theme/60">
          <span className="text-xs font-bold text-theme-muted mr-2">Category:</span>
          {LEARNING_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedCollection(null);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat && !selectedCollection
                  ? 'btn-primary shadow-xs'
                  : 'bg-theme-secondary text-theme-muted hover:text-theme-main border border-theme'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Video Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-theme-muted px-1">
          <span>Showing <strong>{filteredVideos.length}</strong> verified masterclasses</span>
          {selectedCollection && (
            <button 
              onClick={() => setSelectedCollection(null)} 
              className="text-theme-primary font-bold hover:underline"
            >
              Clear Track Filter ✕
            </button>
          )}
        </div>

        {filteredVideos.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-theme-card border border-theme space-y-3">
            <GraduationCap className="w-10 h-10 text-theme-muted mx-auto" />
            <h4 className="font-extrabold text-base text-theme-main font-heading">
              No educational videos matched your criteria
            </h4>
            <p className="text-xs text-theme-muted">
              Try resetting your search query or selecting "All Guides".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => {
              const saved = isVideoSaved(video.id);

              return (
                <div
                  key={video.id}
                  className="rounded-3xl bg-theme-card border border-theme shadow-theme-sm hover:shadow-theme-md transition-all duration-200 overflow-hidden flex flex-col justify-between group card-hover-lift"
                >
                  {/* Thumbnail Container */}
                  <div 
                    onClick={() => setActiveVideo(video)}
                    className="relative w-full aspect-video bg-black/80 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-indigo-950 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white transition-transform pl-0.5">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 text-white text-[11px] font-mono font-bold">
                      {video.duration}
                    </span>

                    {/* Category Pill */}
                    <span className="absolute top-2.5 left-2.5 badge-pill bg-white/90 text-zinc-900 text-[10px] font-bold shadow-xs">
                      {video.category}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 
                        onClick={() => setActiveVideo(video)}
                        className="font-extrabold text-sm sm:text-base text-theme-main font-heading leading-snug line-clamp-2 cursor-pointer group-hover:text-theme-primary transition-colors"
                      >
                        {video.title}
                      </h3>

                      <div className="flex items-center gap-2 text-[11px] text-theme-muted mt-1.5 pb-2 border-b border-theme/60">
                        <span className="font-bold text-theme-main">{video.channelName}</span>
                        <span>•</span>
                        <span>{video.views}</span>
                      </div>

                      <p className="text-xs text-theme-muted mt-2 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-4 mt-3 border-t border-theme/60 flex items-center justify-between">
                      <button
                        onClick={() => setActiveVideo(video)}
                        className="btn-primary py-2 px-3.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Watch Now</span>
                      </button>

                      <button
                        onClick={() => toggleSaveVideo(video.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          saved 
                            ? 'bg-theme-primary text-white border-theme-primary' 
                            : 'border-theme bg-theme-card text-theme-muted hover:text-theme-main'
                        }`}
                        title={saved ? 'Remove from saved' : 'Save for later'}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-white' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Modal Player */}
      <VideoPlayerModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
}
