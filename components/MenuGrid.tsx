import React from 'react';
import { CATEGORIES } from '../constants';
import { 
  WaterDropIcon, BubbleIcon, BarrelIcon, TeaIcon, 
  JuiceIcon, EnergyIcon, CoffeeIcon, BundleIcon 
} from './CustomIcons';
import { useTheme } from '../ThemeContext';

const MenuGrid: React.FC = () => {
  const { theme } = useTheme();

  const getIcon = (type: string) => {
    const props = { className: "w-6 h-6", color: theme.primary };
    switch (type) {
      case 'water': return <WaterDropIcon {...props} />;
      case 'bubble': return <BubbleIcon {...props} />;
      case 'barrel': return <BarrelIcon {...props} />;
      case 'tea': return <TeaIcon {...props} />;
      case 'juice': return <JuiceIcon {...props} />;
      case 'energy': return <EnergyIcon {...props} />;
      case 'coffee': return <CoffeeIcon {...props} />;
      case 'bundle': return <BundleIcon {...props} />;
      default: return <WaterDropIcon {...props} />;
    }
  };

  return (
    <div className="mt-6 px-4">
      <div className="bg-white rounded-3xl p-4 grid grid-cols-4 gap-y-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="flex flex-col items-center gap-2 group cursor-pointer">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
              style={{ backgroundColor: `${theme.primary}15` }} // 10% opacity primary
            >
              {getIcon(cat.type)}
            </div>
            <span className="text-xs font-bold text-gray-700">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;