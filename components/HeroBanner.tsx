import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface BannerItem {
  id: string;
  tag: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  bgType: 'secondary' | 'primary' | 'black';
}

const HeroBanner: React.FC = () => {
  const { theme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners: BannerItem[] = [
    {
      id: '1',
      tag: 'Summer Sale',
      title: '半价',
      highlight: '爽喝',
      subtitle: '品牌水狂欢节',
      image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=300&auto=format&fit=crop',
      bgType: 'secondary'
    },
    {
      id: '2',
      tag: 'Staff Only',
      title: '员工',
      highlight: '特惠',
      subtitle: '专属内购通道已开启',
      image: 'https://images.unsplash.com/photo-1560023907-5f339617ea30?q=80&w=300&auto=format&fit=crop',
      bgType: 'black'
    },
    {
      id: '3',
      tag: 'Quality First',
      title: '水质',
      highlight: '透明',
      subtitle: '实时监测 饮用无忧',
      image: 'https://images.unsplash.com/photo-1516733968668-dbdce39c46ef?q=80&w=300&auto=format&fit=crop',
      bgType: 'primary'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const getBgColor = (type: string) => {
    switch (type) {
      case 'secondary': return theme.secondary;
      case 'primary': return theme.primary;
      case 'black': return '#000000';
      default: return theme.secondary;
    }
  };

  return (
    <div className="px-4 mt-6 relative">
      <div className="relative w-full aspect-[2/1] rounded-[32px] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out flex flex-col justify-center px-6 ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'
            }`}
            style={{ backgroundColor: getBgColor(banner.bgType) }}
          >
            {/* Abstract Geometry Background */}
            <div className="absolute right-0 top-0 w-1/2 h-full skew-x-12 translate-x-10 opacity-30 bg-black/20"></div>
            <div className="absolute right-10 bottom-0 w-24 h-24 rounded-full opacity-50" style={{ backgroundColor: theme.primary }}></div>
            <div className="absolute top-4 right-4 text-[100px] leading-none opacity-5 font-black text-white select-none pointer-events-none italic">
              {banner.id === '1' ? 'H2O' : banner.id === '2' ? 'VIP' : 'PURE'}
            </div>

            {/* Content */}
            <div className="z-10 relative max-w-[70%]">
              <div 
                className="inline-block px-3 py-1 mb-3 text-[10px] font-black tracking-widest uppercase rounded-lg transform -rotate-2 origin-left shadow-lg"
                style={{ backgroundColor: theme.accent, color: '#000' }}
              >
                {banner.tag}
              </div>
              <h1 className="text-3xl font-black text-white leading-none mb-1 italic">
                {banner.title}<span style={{ color: theme.accent }}>{banner.highlight}</span>
              </h1>
              <h2 className="text-lg font-bold text-white/80 mb-4 tracking-tight">
                {banner.subtitle}
              </h2>
              
              <button 
                className="px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all active:translate-y-1 shadow-xl"
                style={{ 
                  backgroundColor: 'white', 
                  color: '#000',
                  boxShadow: `4px 4px 0px ${theme.accent}`
                }}
              >
                GO 抢购 <ArrowRight size={14} strokeWidth={3} />
              </button>
            </div>

            {/* Graphic Element */}
            <div className="absolute right-0 bottom-0 w-44 h-44 pointer-events-none">
                 <img 
                   src={banner.image}
                   alt="Promo"
                   className="w-full h-full object-cover mix-blend-lighten opacity-60 transition-transform duration-[10s] ease-linear"
                   style={{ 
                     clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
                     transform: index === currentSlide ? 'scale(1.2)' : 'scale(1)'
                   }}
                 />
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-6 z-20 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;