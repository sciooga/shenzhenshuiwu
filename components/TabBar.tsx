import React from 'react';
import { Home, Package, Newspaper, ShoppingCart, User } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface TabBarProps {
  active: string;
  onChange: (id: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ active, onChange }) => {
  const { theme } = useTheme();

  const tabs = [
    { id: 'home', icon: Home, label: '首页' },
    { id: 'products', icon: Package, label: '产品' },
    { id: 'news', icon: Newspaper, label: '资讯' },
    { id: 'cart', icon: ShoppingCart, label: '购物车' },
    { id: 'member', icon: User, label: '会员' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Decorative gradient fade */}
      <div className="h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none"></div>
      
      <div className="bg-white border-t border-gray-100 px-4 pt-3 pb-8 flex justify-between items-center max-w-md mx-auto relative shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {tabs.map((tab) => {
          const isActive = active === tab.id;
          const Icon = tab.icon;
          
          return (
            <button 
              key={tab.id}
              onClick={() => onChange(tab.id)}
              className="flex flex-col items-center gap-1 w-[18%] group"
            >
              <div 
                className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'translate-y-[-8px] shadow-lg' : ''}`}
                style={{ 
                  backgroundColor: isActive ? theme.secondary : 'transparent',
                }}
              >
                <Icon 
                  size={20} 
                  color={isActive ? theme.accent : '#9CA3AF'} 
                  strokeWidth={isActive ? 3 : 2}
                  className="transition-colors"
                />
              </div>
              <span 
                className={`text-[9px] font-black transition-all ${isActive ? 'opacity-100 scale-100' : 'opacity-60 scale-90 translate-y-[-4px]'}`}
                style={{ color: isActive ? theme.secondary : '#9CA3AF' }}
              >
                {tab.label}
              </span>
              
              {isActive && (
                <div 
                  className="absolute bottom-6 w-1 h-1 rounded-full animate-ping"
                  style={{ backgroundColor: theme.accent }}
                ></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;