
import React, { useState } from 'react';
import { 
  Trash2, Plus, Minus, Check, ShoppingBag, ArrowRight, 
  Ticket, Info, AlertCircle, ShoppingCart, Sparkles, Zap 
} from 'lucide-react';
import { useCart } from '../CartContext';
import { useTheme } from '../ThemeContext';
import { MOCK_PRODUCTS, MOCK_COUPONS } from '../constants';

interface CartViewProps {
  user?: any;
  onGoShopping?: () => void;
  onLoginRedirect?: () => void;
}

const CartView: React.FC<CartViewProps> = ({ user, onGoShopping, onLoginRedirect }) => {
  const { theme } = useTheme();
  const { cart, updateQuantity, removeFromCart, toggleCheck, toggleAll, clearCart, totalPrice, checkedCount } = useCart();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const isEmployee = user?.isEmployee || false;

  // 模拟寻找匹配的抵用券
  const getAppliedCoupon = () => {
    if (checkedCount === 0) return null;
    // 简单逻辑：如果是员工，找员工券；如果是普通用户，找现金券
    return MOCK_COUPONS.find(c => isEmployee ? c.type === 'employee' : c.type === 'cash');
  };

  const appliedCoupon = getAppliedCoupon();
  const finalPrice = Math.max(0, totalPrice - (appliedCoupon?.value || 0));

  if (!user || user.id === 'guest') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-10 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center text-5xl mb-8 border-4 border-gray-100 shadow-inner">
           🔒
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase italic">请先登录</h2>
        <p className="text-sm text-gray-400 mb-10 leading-relaxed font-bold">登录后即可同步您的购物车信息并享受专属优惠权益。</p>
        <button 
          onClick={onLoginRedirect}
          className="w-full py-5 rounded-[28px] text-white font-black text-lg shadow-2xl active:scale-95 transition-all"
          style={{ backgroundColor: theme.primary }}
        >
          立即前往登录
        </button>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-10 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center mb-8 relative">
           <ShoppingCart size={48} className="text-gray-200" />
           <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center">
              <Plus size={16} className="text-gray-300" />
           </div>
        </div>
        <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase italic">购物车空空如也</h2>
        <p className="text-sm text-gray-400 mb-10 leading-relaxed font-bold">快去挑选心仪的商品补充水分吧！</p>
        <button 
          onClick={onGoShopping}
          className="w-full py-5 rounded-[28px] border-4 border-gray-900 text-gray-900 font-black text-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag size={20} /> 去逛逛
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white pb-40 animate-in fade-in duration-300">
      {/* 顶部标题栏 */}
      <div className="sticky top-0 z-50 px-6 pt-14 pb-4 bg-white/80 backdrop-blur-md flex items-center justify-between border-b border-gray-50">
        <div>
           <h2 className="text-2xl font-black italic tracking-tighter">购物车 <span className="text-gray-300 ml-1">({cart.length})</span></h2>
           {isEmployee && <div className="text-[9px] font-black text-yellow-600 bg-yellow-400/10 px-2 py-0.5 rounded uppercase mt-1 inline-block">员工内购通道</div>}
        </div>
        <button 
          onClick={() => setShowClearConfirm(true)}
          className="p-2 text-gray-300 hover:text-red-500 transition-colors"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {/* 商品列表 */}
      <div className="px-6 mt-6 space-y-4">
        {cart.map(item => {
          const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
          const spec = product?.specs?.find(s => s.id === item.specId);
          const price = spec ? spec.price : (product?.price || 0);

          return (
            <div key={item.id} className={`flex items-center gap-4 p-4 rounded-[32px] border-4 transition-all ${item.checked ? 'border-gray-900 bg-white shadow-xl' : 'border-gray-50 bg-gray-50'}`}>
              {/* 选择框 */}
              <button 
                onClick={() => toggleCheck(item.id)}
                className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${item.checked ? 'bg-gray-900 text-white' : 'bg-white border-2 border-gray-200'}`}
              >
                {item.checked && <Check size={16} strokeWidth={4} />}
              </button>

              {/* 商品图 */}
              <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-gray-100">
                 <img src={product?.image} className="w-full h-full object-cover" alt={product?.name} />
              </div>

              {/* 内容信息 */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-black text-gray-900 leading-tight line-clamp-1 truncate">{product?.name}</h4>
                <div className="text-[10px] text-gray-400 font-bold mt-1 uppercase tracking-widest">{spec?.name || '默认规格'}</div>
                
                <div className="flex items-center justify-between mt-3">
                   <div className="flex items-baseline gap-0.5">
                      <span className="text-[10px] font-black text-gray-900">¥</span>
                      <span className="text-lg font-black text-gray-900">{price.toFixed(1)}</span>
                   </div>
                   
                   {/* 数量选择 */}
                   <div className="flex items-center gap-3 bg-gray-100/50 rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-900 shadow-sm active:scale-90"
                      >
                        <Minus size={12} strokeWidth={3} />
                      </button>
                      <span className="w-4 text-center text-xs font-black">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-900 shadow-sm active:scale-90"
                      >
                        <Plus size={12} strokeWidth={3} />
                      </button>
                   </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 结算栏 - 悬浮 */}
      <div className="fixed bottom-24 left-0 right-0 z-50 px-6 max-w-md mx-auto">
        <div className="bg-gray-900 rounded-[36px] p-6 shadow-2xl">
           {/* 优惠信息 */}
           {appliedCoupon && checkedCount > 0 && (
             <div className="flex items-center justify-between mb-4 px-2 py-2 bg-white/10 rounded-2xl border border-white/10 animate-in slide-in-from-bottom-2">
                <div className="flex items-center gap-2">
                   <div className="p-1 bg-yellow-400 rounded-lg text-black"><Ticket size={14} /></div>
                   <span className="text-[10px] font-black text-white/80">{appliedCoupon.title} (立减 ¥{appliedCoupon.value})</span>
                </div>
                <Sparkles size={14} className="text-yellow-400 animate-pulse" />
             </div>
           )}

           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <button 
                    onClick={() => toggleAll(checkedCount !== cart.length)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${checkedCount === cart.length ? 'bg-yellow-400 text-black' : 'bg-white/10 border border-white/20'}`}
                 >
                    {checkedCount === cart.length && <Check size={14} strokeWidth={4} />}
                 </button>
                 <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">全选</span>
              </div>
              
              <div className="flex-1 px-6 text-right">
                 <div className="text-[10px] font-black text-white/40 uppercase">合计金额</div>
                 <div className="flex items-baseline justify-end gap-1">
                    <span className="text-xs font-black text-yellow-400">¥</span>
                    <span className="text-2xl font-black text-white">{finalPrice.toFixed(1)}</span>
                 </div>
              </div>

              <button 
                disabled={checkedCount === 0}
                className="h-14 px-8 rounded-2xl bg-yellow-400 text-black font-black text-sm uppercase tracking-widest flex items-center gap-2 shadow-xl active:scale-95 transition-all disabled:opacity-20 disabled:grayscale"
              >
                结算 <ArrowRight size={18} strokeWidth={3} />
              </button>
           </div>
        </div>
      </div>

      {/* 二次确认弹窗 */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in" onClick={() => setShowClearConfirm(false)}></div>
           <div className="relative bg-white rounded-[48px] p-10 w-full max-w-sm text-center shadow-2xl animate-in zoom-in-95">
              <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                 <AlertCircle size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-2">清空购物车？</h3>
              <p className="text-sm text-gray-400 font-bold mb-10">此操作将移除所有已加购的商品，确定要清空吗？</p>
              <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setShowClearConfirm(false)} className="py-4 rounded-2xl bg-gray-100 text-gray-500 font-black text-sm uppercase">我再想想</button>
                 <button onClick={() => { clearCart(); setShowClearConfirm(false); }} className="py-4 rounded-2xl bg-red-500 text-white font-black text-sm uppercase shadow-lg shadow-red-100">确定清空</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default CartView;
