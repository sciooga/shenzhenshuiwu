
import React, { useState } from 'react';
import { 
  ChevronLeft, Share2, Heart, Info, MapPin, 
  Truck, ShieldCheck, Ticket, Sparkles, Zap, 
  ShoppingCart, CreditCard, Plus, Minus, BellRing
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { useCart } from '../CartContext';
import { Product } from '../types';

interface ProductDetailViewProps {
  product: Product;
  user?: any;
  onBack: () => void;
  onLoginRequired?: () => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, user, onBack, onLoginRequired }) => {
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const isEmployee = user?.isEmployee || false;
  const isGuest = !user || user.id === 'guest';
  
  const [selectedSpecId, setSelectedSpecId] = useState(product.specs?.[0]?.id);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const selectedSpec = product.specs?.find(s => s.id === selectedSpecId) || { price: product.price, stock: product.stock };
  const displayPrice = selectedSpec.price;
  const isOutOfStock = selectedSpec.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (isGuest) {
      onLoginRequired?.();
      return;
    }
    
    setIsAdding(true);
    addToCart(product.id, selectedSpecId, quantity);
    
    setTimeout(() => {
      setIsAdding(false);
      alert('已成功加入购物车！');
    }, 500);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    if (isGuest) {
      onLoginRequired?.();
      return;
    }
    alert(`正在进入结算页面，共 ${quantity} 件商品...`);
  };

  const handleRemindMe = () => {
    alert('订阅成功！补货后我们将第一时间通知您。');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white pb-32 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 顶部导航 */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-12 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-md">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900 active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} strokeWidth={3} />
        </button>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-900">
            <Share2 size={18} />
          </button>
          <button 
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center transition-colors ${isFavorite ? 'text-red-500' : 'text-gray-900'}`}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* 主图 */}
      <div className="w-full aspect-square bg-gray-50 mt-24">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
      </div>

      {/* 商品核心信息 */}
      <div className="px-6 mt-6">
        <div className="flex items-center gap-2 mb-3">
          {product.isWelfare && (
            <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-[10px] font-black rounded-lg shadow-lg flex items-center gap-1 uppercase tracking-widest">
              <Sparkles size={10} fill="currentColor" /> 福利专属
            </div>
          )}
          {product.isEmployeeOnly && (
            <div className="px-3 py-1 bg-yellow-400 text-black text-[10px] font-black rounded-lg shadow-lg flex items-center gap-1 uppercase tracking-widest">
              <Zap size={10} fill="black" /> 员工特供
            </div>
          )}
          {product.tags.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 border border-gray-100 rounded text-[9px] font-black text-gray-400 uppercase tracking-widest">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-2 leading-tight italic tracking-tighter">
          {product.name}
        </h1>
        <p className="text-sm text-gray-400 font-bold mb-6 italic leading-relaxed">
          {product.desc}
        </p>

        <div className="flex items-baseline gap-2 mb-8">
          <span className="text-lg font-black text-gray-900">¥</span>
          <span className="text-4xl font-black text-gray-900 tracking-tighter">
            {displayPrice.toFixed(1)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-300 font-bold line-through ml-2 italic">
              ¥{product.originalPrice}
            </span>
          )}
          {isEmployee && product.isEmployeeOnly && (
            <span className="ml-4 text-[10px] font-black text-yellow-600 bg-yellow-400/10 px-2 py-1 rounded-md">
              已开启员工内惠价
            </span>
          )}
        </div>

        {/* 规则展示 */}
        {(product.couponCompatible || product.usageRules) && (
          <div className="bg-gray-50 rounded-[32px] p-6 mb-8 border border-gray-100">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Info size={14} /> 购买规则与权益
            </h4>
            
            {product.couponCompatible && (
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl mb-4 shadow-sm border border-red-50">
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                  <Ticket size={20} fill="currentColor" />
                </div>
                <div>
                  <div className="text-xs font-black text-gray-900">支持使用抵用券</div>
                  <div className="text-[9px] text-red-400 font-bold uppercase">
                    可使用 {product.couponType === 'employee' ? '员工内购券' : product.couponType === 'service' ? '水务服务券' : '全场现金券'}
                  </div>
                </div>
              </div>
            )}

            <ul className="space-y-2">
              {product.usageRules?.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[11px] font-bold text-gray-600 leading-relaxed">
                  <div className="w-1 h-1 rounded-full bg-gray-300 mt-1.5 shrink-0"></div>
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 规格 */}
        {product.specs && product.specs.length > 0 && (
          <div className="mb-8">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">选择规格</h4>
            <div className="grid grid-cols-2 gap-3">
              {product.specs.map(spec => (
                <button 
                  key={spec.id}
                  onClick={() => setSelectedSpecId(spec.id)}
                  className={`py-4 px-4 rounded-2xl border-4 text-xs font-black transition-all flex flex-col gap-1 items-start relative overflow-hidden ${
                    selectedSpecId === spec.id 
                    ? 'border-gray-900 bg-white shadow-xl' 
                    : 'border-gray-50 bg-gray-50 text-gray-400'
                  }`}
                >
                  {spec.name}
                  <span className={`text-[10px] ${selectedSpecId === spec.id ? 'text-gray-900' : 'text-gray-400'}`}>
                    ¥{spec.price}
                  </span>
                  {selectedSpecId === spec.id && (
                    <div className="absolute top-0 right-0 p-1">
                      <div className="bg-gray-900 text-white rounded-bl-xl p-0.5">
                        <Check size={8} strokeWidth={4} />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 数量 */}
        <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-100">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">购买数量</h4>
          <div className="flex items-center gap-4 bg-gray-100 rounded-2xl p-1.5">
             <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-900 shadow-sm active:scale-90 disabled:opacity-30"
              disabled={quantity <= 1 || isOutOfStock}
             >
               <Minus size={16} strokeWidth={3} />
             </button>
             <span className={`w-8 text-center text-base font-black ${isOutOfStock ? 'text-gray-300' : ''}`}>{isOutOfStock ? 0 : quantity}</span>
             <button 
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-900 shadow-sm active:scale-90 disabled:opacity-30"
              disabled={isOutOfStock}
             >
               <Plus size={16} strokeWidth={3} />
             </button>
          </div>
        </div>

        {/* 配送信息 */}
        <div className="space-y-4 mb-10">
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-gray-300 mt-0.5" />
            <div>
              <div className="text-xs font-black text-gray-900 uppercase tracking-widest">配送范围</div>
              <p className="text-[11px] font-bold text-gray-400 mt-1">{product.deliveryRange || '全深圳地区配送'}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck size={18} className="text-gray-300 mt-0.5" />
            <div>
              <div className="text-xs font-black text-gray-900 uppercase tracking-widest">库存状态</div>
              <p className={`text-[11px] font-black mt-1 uppercase ${isOutOfStock ? 'text-red-500' : 'text-green-500'}`}>
                {isOutOfStock ? '暂时缺货' : `现货: 仅剩 ${selectedSpec.stock} 件`}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} className="text-gray-300 mt-0.5" />
            <div>
              <div className="text-xs font-black text-gray-900 uppercase tracking-widest">服务保障</div>
              <p className="text-[11px] font-bold text-gray-400 mt-1">100% 正品保障 · 坏损必赔 · 专业配送</p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部悬浮条 */}
      <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-10 pt-4 bg-white/90 backdrop-blur-xl border-t border-gray-100 max-w-md mx-auto">
        <div className="flex gap-4">
          {isOutOfStock ? (
            <button 
              onClick={handleRemindMe}
              className="w-full h-14 rounded-[22px] bg-gray-900 text-white flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.2em] shadow-2xl transition-all active:scale-95"
            >
              <BellRing size={20} className="animate-pulse" /> 到货提醒
            </button>
          ) : (
            <>
              <button 
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 h-14 rounded-[22px] border-4 border-gray-900 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50"
              >
                {isAdding ? '正在加入...' : <><ShoppingCart size={18} /> 加入购物车</>}
              </button>
              <button 
                onClick={handleBuyNow}
                className="flex-[1.2] h-14 rounded-[22px] flex items-center justify-center gap-2 text-xs font-black text-white shadow-2xl transition-all active:scale-95 shadow-teal-100 hover:rotate-1"
                style={{ backgroundColor: theme.secondary }}
              >
                <CreditCard size={18} /> 立即购买
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Check = ({ size, strokeWidth, className }: { size: number, strokeWidth: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ProductDetailView;
