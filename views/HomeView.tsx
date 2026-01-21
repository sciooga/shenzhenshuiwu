
import React from 'react';
import { 
  Volume2, ShoppingBag, Wrench, Gift, 
  Headphones, Zap, ArrowRight,
  Ticket, Flame, Star, Sparkles, FileSearch,
  Newspaper, Megaphone, PartyPopper
} from 'lucide-react';
import TopHeader from '../components/TopHeader';
import HeroBanner from '../components/HeroBanner';
import { useTheme } from '../ThemeContext';
import { MOCK_PRODUCTS, MOCK_SERVICES, MOCK_WELFARE, MOCK_NEWS } from '../constants';

interface HomeViewProps {
  user?: any;
  onProductClick?: (productId: string) => void;
}

// 统一的卡片组件
const ItemCard: React.FC<{ item: any; theme: any; type: 'product' | 'service' | 'welfare'; onClick?: () => void }> = ({ item, theme, type, onClick }) => {
  const isEmployeeOnly = item.isEmployeeOnly;
  
  return (
    <div 
      onClick={onClick}
      className={`rounded-[32px] p-4 flex flex-col h-full relative group transition-all duration-300 cursor-pointer ${isEmployeeOnly ? 'bg-black text-white' : 'bg-white border-4 border-gray-50 shadow-sm'}`}
    >
      <div className={`relative aspect-square rounded-[24px] overflow-hidden mb-4 ${isEmployeeOnly ? 'bg-white/10' : 'bg-gray-100'}`}>
        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
        
        {item.couponCompatible && (
          <div className="absolute top-2 right-2 bg-[#FF4D4F] text-white p-1.5 rounded-xl shadow-lg animate-pulse z-20">
            <Ticket size={12} fill="currentColor" />
          </div>
        )}

        {item.tags && item.tags[0] && (
          <div 
            className="absolute top-0 left-0 px-3 py-1.5 rounded-br-2xl text-[10px] font-black z-10 uppercase tracking-widest"
            style={{ backgroundColor: isEmployeeOnly ? '#E0F102' : theme.accent, color: '#000' }}
          >
            {item.tags[0]}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <h4 className="text-sm font-black leading-tight line-clamp-2 mb-1 uppercase tracking-tight">{item.name}</h4>
        <p className="text-[10px] text-gray-400 mb-4 line-clamp-1 font-bold italic">{item.desc || '深圳市水务精选'}</p>
        
        <div className="mt-auto flex items-end justify-between">
          <div>
             <span className="text-[10px] font-black mr-0.5">¥</span>
             <span className={`text-xl font-black ${isEmployeeOnly ? 'text-[#E0F102]' : 'text-gray-900'}`}>{item.price}</span>
             {item.pointsPrice && (
               <span className="text-[9px] text-orange-500 font-black ml-1">或 {item.pointsPrice} 积分</span>
             )}
          </div>
          <button 
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg active:scale-90"
            style={{ backgroundColor: isEmployeeOnly ? '#E0F102' : theme.secondary }}
          >
            <ArrowRight size={14} color={isEmployeeOnly ? 'black' : 'white'} strokeWidth={3} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 章节标题组件
const SectionHeader: React.FC<{ title: string; subtitle: string; icon: any; theme: any }> = ({ title, subtitle, icon: Icon, theme }) => (
  <div className="flex items-center justify-between mb-5 px-4">
    <div className="flex items-center gap-3">
      <div className="p-3 rounded-2xl bg-white shadow-xl" style={{ border: `2px solid ${theme.accent}` }}>
        <Icon size={20} className="text-gray-900" />
      </div>
      <div>
        <h3 className="text-xl font-black text-gray-900 leading-none italic uppercase tracking-tighter">{title}</h3>
        <p className="text-[9px] text-gray-400 font-black mt-1 uppercase tracking-widest">{subtitle}</p>
      </div>
    </div>
    <button className="text-[10px] font-black text-gray-400 hover:text-gray-900 uppercase tracking-widest flex items-center gap-1">
      查看更多 <ArrowRight size={12} />
    </button>
  </div>
);

// 资讯列表项
const NewsListItem: React.FC<{ item: any; theme: any }> = ({ item, theme }) => {
  const getIcon = () => {
    switch (item.type) {
      case 'news': return <Newspaper size={18} className="text-blue-500" />;
      case 'notice': return <Megaphone size={18} className="text-orange-500" />;
      case 'activity': return <PartyPopper size={18} className="text-purple-500" />;
      default: return <Newspaper size={18} />;
    }
  };

  const getLabel = () => {
    switch (item.type) {
      case 'news': return '水务资讯';
      case 'notice': return '服务公告';
      case 'activity': return '福利活动';
      default: return '';
    }
  };

  return (
    <div className="bg-white rounded-[24px] p-5 flex items-start gap-4 shadow-sm border-2 border-transparent active:border-gray-100 active:scale-[0.98] transition-all group">
       <div className={`p-3 rounded-2xl shrink-0 group-hover:rotate-6 transition-transform ${item.type === 'news' ? 'bg-blue-50' : item.type === 'notice' ? 'bg-orange-50' : 'bg-purple-50'}`}>
          {getIcon()}
       </div>
       <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
             <span className={`text-[9px] font-black uppercase tracking-widest ${item.type === 'news' ? 'text-blue-400' : item.type === 'notice' ? 'text-orange-400' : 'text-purple-400'}`}>
                {getLabel()}
             </span>
             <span className="text-[9px] font-black text-gray-300">{item.date}</span>
          </div>
          <h4 className="text-sm font-black text-gray-900 mb-1 leading-tight line-clamp-1">{item.title}</h4>
          <p className="text-[11px] text-gray-400 font-bold leading-relaxed line-clamp-1 italic">{item.summary}</p>
       </div>
       <div className="self-center">
          <ArrowRight size={16} className="text-gray-200 group-hover:text-gray-400 transition-colors" />
       </div>
    </div>
  );
};

const HomeView: React.FC<HomeViewProps> = ({ user, onProductClick }) => {
  const { theme } = useTheme();
  const isEmployee = user?.isEmployee || false;

  const popularProducts = MOCK_PRODUCTS
    .filter(p => isEmployee ? p.isEmployeeOnly : !p.isEmployeeOnly)
    .sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .slice(0, 2);

  const popularServices = MOCK_SERVICES
    .filter(s => s.isPopular)
    .sort((a, b) => a.price - b.price)
    .slice(0, 2);

  const welfareSelections = MOCK_WELFARE
    .filter(w => w.isPopular)
    .slice(0, 2);

  return (
    <div className="flex flex-col w-full relative z-0 pb-32">
      <TopHeader />
      
      {/* 通知栏 */}
      <div className="px-4 py-2 flex items-center gap-2 border-b bg-white border-gray-100">
        <Volume2 size={14} style={{ color: theme.secondary }} />
        <div className="flex-1 overflow-hidden h-4">
          <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest animate-pulse">
            {isEmployee 
              ? `[内测专区] 欢迎回来，${user?.name} | 系统已切换为员工视图`
              : '公告: 夏季送水高峰期，预计配送延迟 15 分钟，感谢您的支持'}
          </div>
        </div>
      </div>

      <HeroBanner />

      {/* 核心功能 */}
      <div className="px-4 mt-8">
        <div className="bg-white rounded-[32px] p-6 shadow-xl flex justify-around items-center">
           {[
             { id: 'shop', label: '商品选购', icon: ShoppingBag, color: '#E0F2F1' },
             { id: 'service', label: '水务服务', icon: Wrench, color: '#F3E5F5' },
             { id: 'welfare', label: '福利商城', icon: Gift, color: '#FFF3E0' }
           ].map(entry => (
             <div key={entry.id} className="flex flex-col items-center gap-2 active:scale-95 transition-all cursor-pointer">
                <div className="w-14 h-14 rounded-[22px] flex items-center justify-center shadow-md" style={{ backgroundColor: entry.color }}>
                   <entry.icon size={22} className="text-gray-900" />
                </div>
                <span className="text-[10px] font-black">{entry.label}</span>
             </div>
           ))}
           
           <div className="w-px h-10 bg-gray-100 mx-2"></div>
           
           <div className="flex flex-col items-center gap-2 active:scale-95 transition-all cursor-pointer">
              <div 
                className="w-14 h-14 rounded-[22px] flex items-center justify-center shadow-lg transform rotate-3 relative overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #FF6D00 0%, #FF9E00 100%)' }}
              >
                 <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <FileSearch size={22} className="text-white relative z-10" />
              </div>
              <span className="text-[10px] font-black text-[#FF6D00]">订单查询</span>
           </div>
        </div>
      </div>

      {/* 热门商品 */}
      <div className="mt-12">
        <SectionHeader title="人气推荐" subtitle="Popular Choice" icon={Flame} theme={theme} />
        <div className="px-4 grid grid-cols-2 gap-4">
           {popularProducts.map(item => (
             <ItemCard 
               key={item.id} 
               item={item} 
               theme={theme} 
               type="product" 
               onClick={() => onProductClick?.(item.id)} 
             />
           ))}
        </div>
      </div>

      {/* 热门服务 */}
      <div className="mt-12">
        <SectionHeader title="水务服务" subtitle="Water Services" icon={Star} theme={theme} />
        <div className="px-4 grid grid-cols-2 gap-4">
           {popularServices.map(item => <ItemCard key={item.id} item={item} theme={theme} type="service" />)}
        </div>
      </div>

      {/* 福利精选 */}
      <div className="mt-12">
        <SectionHeader title="特惠福利" subtitle="Special Welfare" icon={Sparkles} theme={theme} />
        <div className="px-4 grid grid-cols-2 gap-4">
           {welfareSelections.map(item => <ItemCard key={item.id} item={item} theme={theme} type="welfare" />)}
        </div>
      </div>

      {/* 资讯中心 */}
      <div className="mt-12">
        <SectionHeader title="资讯中心" subtitle="Info & Updates" icon={Megaphone} theme={theme} />
        <div className="px-4 space-y-4">
           {MOCK_NEWS.map(item => (
             <NewsListItem key={item.id} item={item} theme={theme} />
           ))}
        </div>
      </div>

      {/* 员工看板 */}
      {isEmployee && (
        <div className="px-4 mt-12">
          <div className="bg-black text-white rounded-[32px] p-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-400 rounded-xl"><Zap size={20} className="text-black" /></div>
                <h3 className="text-lg font-black italic">员工管理后台</h3>
             </div>
             <p className="text-xs text-white/50 mb-6 font-bold uppercase tracking-widest leading-relaxed">访问内部审核系统与客户反馈工作台</p>
             <button className="w-full py-4 bg-white text-black font-black rounded-2xl active:scale-95 transition-all">
                进入工作空间
             </button>
          </div>
        </div>
      )}

      {/* 底部客服 */}
      <div className="px-4 mt-12 mb-8">
         <div className="bg-white rounded-[32px] p-5 flex items-center justify-between border-2 border-gray-100">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                  <Headphones size={24} className="text-teal-600" />
               </div>
               <div>
                  <div className="text-sm font-black">24h 智能客服</div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">随时为您解答疑惑</div>
               </div>
            </div>
            <button className="px-5 py-2.5 bg-gray-900 text-white text-[10px] font-black rounded-xl shadow-lg active:scale-95">
               立即咨询
            </button>
         </div>
      </div>
    </div>
  );
};

export default HomeView;
