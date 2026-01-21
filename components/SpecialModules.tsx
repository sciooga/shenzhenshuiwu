import React from 'react';
import { Wrench, ShoppingBag } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const SpecialModules: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="px-4 mt-6">
      <div className="grid grid-cols-2 gap-3">
        
        {/* Service Booking - Poster Style */}
        <div 
          className="relative h-32 rounded-2xl p-4 flex flex-col justify-between overflow-hidden group active:opacity-90 transition-opacity"
          style={{ backgroundColor: '#fff', border: `2px solid ${theme.secondary}` }}
        >
          <div className="z-10">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1 rounded-md bg-gray-100">
                <Wrench size={16} color={theme.secondary} />
              </div>
              <span className="text-xs font-bold text-gray-500">上门服务</span>
            </div>
            <h3 className="text-lg font-black text-gray-900 leading-tight">设备<br/>检修安装</h3>
          </div>
          <div className="z-10 flex justify-end">
            <div 
              className="w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{ backgroundColor: theme.secondary }}
            >
              <span className="text-lg font-bold">→</span>
            </div>
          </div>
          
          {/* Background Graphic */}
          <div 
            className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-20"
            style={{ backgroundColor: theme.primary }}
          ></div>
        </div>

        {/* Internal Store - High Contrast */}
        <div 
          className="relative h-32 rounded-2xl p-4 flex flex-col justify-between overflow-hidden active:opacity-90 transition-opacity transition-colors duration-300"
          style={{ backgroundColor: theme.secondary }}
        >
          <div className="z-10">
             <div className="flex items-center gap-2 mb-1">
              <div className="p-1 rounded-md bg-white/10">
                <ShoppingBag size={16} color={theme.accent} />
              </div>
              <span className="text-xs font-bold text-white/60">员工福利</span>
            </div>
            <h3 className="text-lg font-black text-white leading-tight">
              内购<br/>
              <span style={{ color: theme.accent }}>专属商城</span>
            </h3>
          </div>
          
          <div className="z-10 flex justify-end">
            <div 
              className="px-3 py-1 rounded-full text-[10px] font-black"
              style={{ backgroundColor: theme.accent, color: theme.secondary }}
            >
              ENTER
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SpecialModules;