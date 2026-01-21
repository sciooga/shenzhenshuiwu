
import React, { useState, useMemo } from 'react';
import { 
  Search, ArrowUpDown, BellRing, Sparkles, Zap, Ticket, Plus,
  SlidersHorizontal, RefreshCw, LayoutGrid
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useCart } from '../CartContext';
import { CATEGORIES, MOCK_PRODUCTS } from '../constants';

interface ProductsViewProps {
  user?: any;
  onProductClick?: (productId: string) => void;
  onLoginRequired?: () => void;
}

// 商品卡片
const ProductCard: React.FC<{ product: any; theme: any; user: any; onClick?: () => void; onLoginRequired?: () => void }> = ({ product, theme, user, onClick, onLoginRequired }) => {
  const { addToCart } = useCart();
  const isOutOfStock = product.stock <= 0;
  const isGuest = !user || user.id === 'guest';

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isGuest) {
      onLoginRequired?.();
      return;
    }
    addToCart(product.id, product.specs?.[0]?.id, 1);
    alert('已成功加入购物车！');
  };
  
  return (
    <div 
      onClick={onClick}
      className={`relative bg-white rounded-[28px] p-3 border-4 border-gray-50 flex flex-col gap-2 transition-all active:scale-[0.98] cursor-pointer ${isOutOfStock ? 'opacity-85' : ''}`}
    >
      {/* 图片预览 */}
      <div className="relative aspect-square rounded-[22px] overflow-hidden bg-gray-50 group">
        <img 
          src={product.image} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          alt={product.name} 
        />
        
        {/* 业务标签 */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-30">
          {product.isWelfare && (
            <div className="px-2 py-0.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[8px] font-black rounded-lg shadow-lg flex items-center gap-1 uppercase">
              <Sparkles size={8} fill="currentColor" /> 福利专属
            </div>
          )}
          {product.isEmployeeOnly && (
            <div className="px-2 py-0.5 bg-yellow-400 text-black text-[8px] font-black rounded-lg shadow-lg flex items-center gap-1 uppercase">
              <Zap size={8} fill="black" /> 员工内购
            </div>
          )}
        </div>

        {/* 抵用券标识 */}
        {product.couponCompatible && (
          <div className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-xl shadow-md z-30 border border-gray-100">
            <Ticket size={12} className={product.isEmployeeOnly ? 'text-yellow-600' : 'text-red-500'} fill="currentColor" />
          </div>
        )}

        {/* 售罄蒙层 */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center z-20">
             <div className="bg-white/95 px-3 py-1 rounded-full text-[9px] font-black text-gray-900 shadow-xl border-2 border-gray-900 uppercase italic -rotate-12">
               已售罄
             </div>
          </div>
        )}
      </div>

      {/* 信息层 */}
      <div className="flex-1 flex flex-col px-1 pt-1">
        <h4 className="text-[11px] font-black text-gray-900 leading-tight line-clamp-2 min-h-[2.5em] mb-1 uppercase tracking-tighter">
          {product.name}
        </h4>
        
        <div className="flex flex-wrap gap-1 mb-3">
           {product.tags.map((tag: string, i: number) => (
             <span key={i} className="text-[7px] font-bold text-gray-400 border border-gray-100 px-1 py-0.5 rounded uppercase tracking-widest">{tag}</span>
           ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-1">
          <div className="shrink-0">
            <div className="flex items-baseline gap-0.5">
              <span className="text-[9px] font-black text-gray-900">¥</span>
              <span className="text-base font-black text-gray-900 leading-none">{product.price.toFixed(1)}</span>
            </div>
            {product.originalPrice && (
              <div className="text-[8px] text-gray-400 line-through font-bold">¥{product.originalPrice}</div>
            )}
          </div>
          
          {isOutOfStock ? (
            <div className="text-[9px] font-black text-gray-300 uppercase italic tracking-widest pb-1">
              暂时缺货
            </div>
          ) : (
            <button 
              className="w-9 h-9 rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-transform shrink-0"
              style={{ backgroundColor: product.isEmployeeOnly ? theme.accent : theme.secondary }}
              onClick={handleAdd}
            >
              <Plus size={18} color={product.isEmployeeOnly ? 'black' : 'white'} strokeWidth={3} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductsView: React.FC<ProductsViewProps> = ({ user, onProductClick, onLoginRequired }) => {
  const { theme } = useTheme();
  const isEmployee = user?.isEmployee || false;
  
  const initialCatId = isEmployee ? 'emp_all' : 'cat_all';
  const [selectedCat, setSelectedCat] = useState(initialCatId);
  const [sortBy, setSortBy] = useState<'default' | 'sales' | 'price'>('default');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter(cat => cat.isEmployeeOnly === isEmployee);
  }, [isEmployee]);

  const displayedProducts = useMemo(() => {
    let list = MOCK_PRODUCTS.filter(p => {
      if (isEmployee) return p.isEmployeeOnly;
      return !p.isEmployeeOnly;
    });

    if (selectedCat !== 'cat_all' && selectedCat !== 'emp_all') {
      list = list.filter(p => p.categoryId === selectedCat);
    }

    if (sortBy === 'sales') list.sort((a, b) => (b.sales || 0) - (a.sales || 0));
    if (sortBy === 'price') list.sort((a, b) => a.price - b.price);

    return list;
  }, [selectedCat, sortBy, isEmployee]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="px-4 pt-14 pb-4 flex items-center gap-3 bg-white z-40 border-b border-gray-50">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder={isEmployee ? "搜索员工内惠福利品..." : "发现好水，清爽一夏..."}
            className="w-full bg-gray-100 rounded-2xl py-3 pl-11 pr-4 text-xs font-black outline-none border-4 border-transparent focus:border-gray-200 transition-all placeholder:text-gray-400"
          />
        </div>
        <button className="w-11 h-11 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-900 active:scale-90 active:bg-gray-200">
           <SlidersHorizontal size={18} />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        <div className="w-24 bg-gray-50 flex flex-col overflow-y-auto hide-scrollbar border-r border-gray-100">
          {filteredCategories.map(cat => {
            const isActive = selectedCat === cat.id;
            return (
              <button 
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`relative py-7 flex flex-col items-center gap-2 transition-all ${isActive ? 'bg-white' : 'hover:bg-gray-100/50'}`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-1.5 rounded-r-full" style={{ backgroundColor: theme.primary }}></div>
                )}
                <div className={`text-[10px] font-black transition-colors ${isActive ? 'text-gray-900 scale-110' : 'text-gray-400'}`}>
                  {cat.name}
                </div>
                {cat.isWelfare && (
                  <div className="absolute top-3 right-3 flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-500"></span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex-1 bg-white overflow-y-auto hide-scrollbar px-4 pb-32 scroll-smooth">
          <div className="flex items-center justify-between py-5 sticky top-0 bg-white/95 backdrop-blur-md z-30 border-b border-gray-50 mb-5">
            <div className="flex items-center gap-5">
              {[
                { label: '综合', key: 'default' },
                { label: '销量', key: 'sales' },
                { label: '价格', key: 'price' }
              ].map(opt => (
                <button 
                  key={opt.key}
                  onClick={() => setSortBy(opt.key as any)}
                  className={`text-[10px] font-black transition-all relative pb-1 ${sortBy === opt.key ? 'text-gray-900' : 'text-gray-300'}`}
                >
                  {opt.label}
                  {opt.key === 'price' && <ArrowUpDown size={10} className="inline ml-1" />}
                  {sortBy === opt.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full"></div>}
                </button>
              ))}
            </div>
            <button 
              onClick={handleRefresh}
              className={`text-gray-300 hover:text-gray-900 transition-transform ${isRefreshing ? 'animate-spin text-gray-900' : ''}`}
            >
              <RefreshCw size={14} />
            </button>
          </div>

          <div className="mb-6 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-1 h-4 rounded-full" style={{ backgroundColor: theme.primary }}></div>
                <h3 className="text-sm font-black text-gray-900 italic tracking-tighter">
                   {filteredCategories.find(c => c.id === selectedCat)?.name || '精品甄选'}
                </h3>
             </div>
             {isEmployee && (
               <div className="px-2 py-1 bg-yellow-400/10 text-yellow-600 rounded-lg text-[8px] font-black border border-yellow-400/20">
                  内部专属通道
               </div>
             )}
          </div>

          <div className="grid grid-cols-2 gap-3 pb-10">
            {displayedProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                theme={theme} 
                user={user}
                onClick={() => onProductClick?.(product.id)}
                onLoginRequired={onLoginRequired}
              />
            ))}
          </div>

          {displayedProducts.length === 0 && (
             <div className="flex flex-col items-center justify-center py-24 text-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-[40px] flex items-center justify-center mb-6">
                   <LayoutGrid size={32} className="opacity-20" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">暂无相关商品</p>
                <button 
                   onClick={() => setSelectedCat(initialCatId)}
                   className="mt-6 text-[9px] font-black underline decoration-2 underline-offset-4 text-gray-400 hover:text-gray-900"
                >
                   重置分类
                </button>
             </div>
          )}

          <div className="flex items-center gap-3 py-10 opacity-20">
             <div className="h-px bg-gray-400 flex-1"></div>
             <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">到底了哦</span>
             <div className="h-px bg-gray-400 flex-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
