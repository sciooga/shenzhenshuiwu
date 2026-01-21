
import React, { useState } from 'react';
import { 
  Megaphone, Newspaper, PartyPopper, Calendar, ArrowRight, 
  X, Share2, Clock, Eye, Sparkles
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { MOCK_NEWS } from '../constants';

const NewsView: React.FC = () => {
  const { theme } = useTheme();
  const [filter, setFilter] = useState<'all' | 'news' | 'notice' | 'activity'>('all');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);

  const selectedNews = MOCK_NEWS.find(n => n.id === selectedNewsId);

  const filteredNews = MOCK_NEWS.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'news': return 'bg-blue-100 text-blue-600';
      case 'notice': return 'bg-orange-100 text-orange-600';
      case 'activity': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'news': return '水务资讯';
      case 'notice': return '服务公告';
      case 'activity': return '福利活动';
      default: return '资讯';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'news': return <Newspaper size={14} />;
      case 'notice': return <Megaphone size={14} />;
      case 'activity': return <PartyPopper size={14} />;
      default: return <Newspaper size={14} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 animate-in fade-in duration-300">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-6 pt-14 pb-4 border-b border-gray-50">
        <h2 className="text-3xl font-black text-gray-900 italic tracking-tighter mb-1">
          资讯 <span style={{ color: theme.primary }}>中心</span>
        </h2>
        <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Updates & Stories</p>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 mt-6 mb-6">
        <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
          {[
            { id: 'all', label: '全部' },
            { id: 'news', label: '资讯动态' },
            { id: 'notice', label: '重要公告' },
            { id: 'activity', label: '福利活动' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-5 py-2.5 rounded-[20px] text-xs font-black whitespace-nowrap transition-all border-2 ${
                filter === tab.id
                  ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                  : 'bg-white text-gray-400 border-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* News List */}
      <div className="px-6 space-y-5">
        {filteredNews.map((item, index) => (
          <div 
            key={item.id}
            onClick={() => setSelectedNewsId(item.id)}
            className="group relative bg-white rounded-[32px] p-5 border-4 border-gray-50 active:scale-[0.98] active:border-gray-200 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-xl"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Type Badge */}
            <div className={`absolute top-5 left-5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 z-10 ${getBadgeColor(item.type)}`}>
               {getIcon(item.type)} {getTypeLabel(item.type)}
            </div>

            {/* Date Badge */}
             <div className="absolute top-5 right-5 flex items-center gap-1 text-[10px] font-black text-gray-300 bg-gray-50 px-2 py-1 rounded-lg">
                <Calendar size={12} />
                {item.date}
             </div>

            <div className="mt-10 mb-2">
              <h3 className="text-lg font-black text-gray-900 leading-tight mb-2 line-clamp-2 group-hover:underline decoration-4 underline-offset-4 decoration-yellow-300">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400 font-bold leading-relaxed line-clamp-2">
                {item.summary}
              </p>
            </div>

            {item.image && (
              <div className="mt-4 w-full h-32 rounded-[20px] overflow-hidden relative">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  alt="news thumb" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-end p-3">
                   <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                      <ArrowRight size={16} />
                   </div>
                </div>
              </div>
            )}

            {!item.image && (
               <div className="mt-4 flex justify-end">
                  <span className="text-[10px] font-black text-gray-300 group-hover:text-gray-900 transition-colors uppercase tracking-widest flex items-center gap-1">
                     Read Article <ArrowRight size={12} />
                  </span>
               </div>
            )}
          </div>
        ))}

        {filteredNews.length === 0 && (
           <div className="py-20 text-center">
              <div className="text-4xl opacity-20 mb-2">📭</div>
              <p className="text-xs font-black text-gray-300 uppercase tracking-widest">暂无此类内容</p>
           </div>
        )}
      </div>

      {/* Detail Overlay */}
      {selectedNews && (
        <div className="fixed inset-0 z-[60] bg-white flex flex-col animate-in slide-in-from-bottom duration-300 overflow-y-auto">
           {/* Detail Header */}
           <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md">
              <button 
                onClick={() => setSelectedNewsId(null)}
                className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                 <X size={20} />
              </button>
              <div className="flex gap-2">
                 <button className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 flex items-center justify-center hover:bg-gray-200 transition-colors">
                    <Share2 size={18} />
                 </button>
              </div>
           </div>

           {/* Detail Content */}
           <div className="px-6 pb-20">
              {/* Meta */}
              <div className="flex items-center gap-3 mb-4">
                 <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${getBadgeColor(selectedNews.type)}`}>
                    {getTypeLabel(selectedNews.type)}
                 </span>
                 <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {selectedNews.date}
                 </span>
                 <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                    <Eye size={12} /> 2,341
                 </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl font-black text-gray-900 leading-tight mb-6">
                 {selectedNews.title}
              </h1>

              {/* Hero Image */}
              {selectedNews.image && (
                 <div className="w-full aspect-video rounded-[32px] overflow-hidden mb-8 shadow-2xl">
                    <img src={selectedNews.image} className="w-full h-full object-cover" alt="Detail cover" />
                 </div>
              )}

              {/* Body Text */}
              <div className="prose prose-sm prose-gray max-w-none">
                 <p className="text-sm font-bold text-gray-600 leading-loose whitespace-pre-wrap">
                    {selectedNews.content || selectedNews.summary}
                 </p>
              </div>

              {/* Related/Action */}
              <div className="mt-12 p-6 bg-gray-50 rounded-[32px] border-2 border-gray-100 text-center">
                 <Sparkles size={24} className="mx-auto text-yellow-500 mb-3" />
                 <h4 className="text-sm font-black text-gray-900 mb-2">觉得有用？</h4>
                 <button className="px-8 py-3 rounded-xl bg-gray-900 text-white text-xs font-black shadow-lg active:scale-95 transition-all">
                    点赞并收藏
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default NewsView;
