import React from 'react';
import { MapPin, Search, Bell, Sun } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const TopHeader: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div 
      className="sticky top-0 z-50 pt-12 pb-4 shadow-sm transition-colors duration-300"
      style={{ backgroundColor: theme.primary }}
    >
      <div className="px-4">
        {/* Top Row: Location & Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div 
              className="px-3 py-1.5 rounded-full flex items-center space-x-1"
              style={{ backgroundColor: theme.secondary }}
            >
              <MapPin size={14} color={theme.accent} />
              <span className="text-white text-xs font-bold truncate max-w-[140px]">
                深圳 ABC SOHO 办公区
              </span>
              <span className="text-white/50 text-[10px] ml-1">▼</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
             <div className="flex items-center space-x-1 text-white/90">
                <Sun size={16} className="text-[#FDB813]" fill="#FDB813" />
                <span className="text-xs font-bold">32°C</span>
             </div>
             <div className="relative p-1.5 bg-white/10 rounded-full">
               <Bell size={18} className="text-white" />
               <span 
                 className="absolute top-1 right-1 w-2 h-2 rounded-full border border-opacity-50" 
                 style={{ backgroundColor: theme.accent, borderColor: theme.primary }}
               ></span>
             </div>
          </div>
        </div>

        {/* Search Bar - High Contrast */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none z-10">
            <Search size={18} className="text-gray-900" />
          </div>
          <input 
            type="text" 
            placeholder="搜「电解质水」试试..." 
            className="w-full py-3 pl-10 pr-4 rounded-xl text-sm font-bold text-gray-900 placeholder-gray-500 focus:outline-none transition-transform active:scale-[0.99]"
            style={{ 
              backgroundColor: theme.accent,
              boxShadow: `4px 4px 0px ${theme.secondary}`
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;