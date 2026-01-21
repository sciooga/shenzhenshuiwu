
import React, { useState, useEffect } from 'react';
import { 
  Settings, ChevronRight, Palette, CreditCard, Gift, Heart, ShieldCheck, 
  Shuffle, RotateCcw, LogOut, BadgeCheck, Zap, Sparkles, MapPin, 
  UserCircle, Ticket, History, Plus, Trash2, Edit3, Smartphone, ExternalLink,
  Droplets, Info, ChevronLeft, ShoppingBag
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { MOCK_COUPONS, MOCK_ADDRESSES, MOCK_HISTORY, MOCK_PRODUCTS } from '../constants';

interface MemberViewProps {
  user?: any;
  onLogout?: () => void;
}

type SubView = 'main' | 'address' | 'profile' | 'coupons' | 'points_history' | 'coupon_history' | 'employee_store';

const MemberView: React.FC<MemberViewProps> = ({ user, onLogout }) => {
  const { theme, setCustomColors, randomizeTheme, resetTheme } = useTheme();
  const [activeSubView, setActiveSubView] = useState<SubView>('main');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [primaryInput, setPrimaryInput] = useState(theme.primary);
  const [secondaryInput, setSecondaryInput] = useState(theme.secondary);
  
  // Addresses State
  const [addresses, setAddresses] = useState(MOCK_ADDRESSES);
  
  const handleApplyColors = () => {
    setCustomColors(primaryInput, secondaryInput);
    setShowColorPicker(false);
  };

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const syncWaterService = () => {
    // Logic for "fetching address info by phone and sync regional water service"
    alert("正在通过手机号同步区域水务服务信息...");
  };

  // Sub-navigation render helper
  const renderHeader = (title: string) => (
    <div className="sticky top-0 z-50 px-6 pt-12 pb-4 bg-white flex items-center justify-between border-b border-gray-100">
      <button onClick={() => setActiveSubView('main')} className="p-2 rounded-xl bg-gray-50 active:scale-90 transition-all">
        <ChevronLeft size={20} />
      </button>
      <h2 className="text-lg font-black">{title}</h2>
      <div className="w-9"></div>
    </div>
  );

  // Main Member View
  if (activeSubView === 'main') {
    return (
      <div className="flex flex-col min-h-screen pb-32 animate-in fade-in duration-300">
        {/* Header Section */}
        <div 
          className="pt-24 pb-20 px-6 rounded-b-[48px] shadow-2xl relative overflow-hidden transition-all duration-700"
          style={{ background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)` }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-24 -mt-24 animate-pulse"></div>
          
          <div className="flex items-center gap-5 relative z-10">
            <div 
              onClick={() => setActiveSubView('profile')}
              className="relative cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-[30px] border-4 border-white/40 overflow-hidden bg-white shadow-2xl group-active:scale-95 transition-all">
                <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              {user?.isEmployee && (
                 <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-2xl border-4 border-white shadow-lg animate-bounce">
                    <BadgeCheck size={16} fill="currentColor" className="text-[#004B4D]" />
                 </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-2xl font-black text-white tracking-tight">{user?.name || '新用户'}</h2>
                {user?.isEmployee && (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black bg-yellow-400 text-[#004B4D] shadow-xl border border-white/20 uppercase tracking-widest">
                    <Zap size={10} fill="currentColor" /> 员工
                  </div>
                )}
                <div className="bg-white/10 px-2 py-0.5 rounded-lg border border-white/20">
                   <span className="text-[9px] font-black text-white">V{user?.level || 1} 会员</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                   <div className="h-full bg-white rounded-full w-[65%]"></div>
                </div>
                <span className="text-[10px] font-black text-white/80">成长值 {user?.growth || 128}/200</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="px-5 -mt-10 relative z-20">
          <div className="bg-white rounded-[32px] p-6 shadow-2xl grid grid-cols-3 divide-x divide-gray-50 border border-gray-50">
            <div onClick={() => setActiveSubView('points_history')} className="text-center cursor-pointer active:bg-gray-50 rounded-2xl p-2 transition-all">
               <div className="text-xl font-black mb-1" style={{ color: theme.secondary }}>{user?.points || 880}</div>
               <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest">积分余额</div>
            </div>
            <div onClick={() => setActiveSubView('coupons')} className="text-center cursor-pointer active:bg-gray-50 rounded-2xl p-2 transition-all">
               <div className="text-xl font-black mb-1" style={{ color: theme.secondary }}>{MOCK_COUPONS.length}</div>
               <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest">抵用券</div>
            </div>
            <div className="text-center active:bg-gray-50 rounded-2xl p-2 transition-all">
               <div className="text-xl font-black mb-1" style={{ color: theme.secondary }}>V{user?.level || 1}</div>
               <div className="text-[9px] text-gray-400 font-black uppercase tracking-widest">会员等级</div>
            </div>
          </div>
        </div>

        {/* Action List */}
        <div className="px-5 mt-8 space-y-4">
          {/* Employee Specific Module */}
          {user?.isEmployee && (
            <div 
              onClick={() => setActiveSubView('employee_store')}
              className="bg-black text-white rounded-[24px] p-5 flex items-center justify-between shadow-xl active:scale-[0.98] transition-all overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 rounded-2xl bg-white/10 border border-white/20">
                  <ShoppingBag size={22} className="text-yellow-400" />
                </div>
                <div>
                  <span className="font-black block text-sm">员工内购商城</span>
                  <span className="text-[10px] text-white/50 font-bold uppercase tracking-widest">Exlcusive Staff Perks</span>
                </div>
              </div>
              <ChevronRight size={18} className="text-white/30" />
            </div>
          )}

          {/* Regular Menus */}
          <div 
            onClick={() => setActiveSubView('profile')}
            className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-blue-50">
                <UserCircle size={22} className="text-blue-500" />
              </div>
              <span className="font-black text-gray-800">个人基础信息</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>

          <div 
            onClick={() => setActiveSubView('address')}
            className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-teal-50">
                <MapPin size={22} className="text-teal-500" />
              </div>
              <span className="font-black text-gray-800">收货地址管理</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>

          <div 
            onClick={() => setActiveSubView('points_history')}
            className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-orange-50">
                <History size={22} className="text-orange-500" />
              </div>
              <span className="font-black text-gray-800">积分明细记录</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>

          {/* Theme Settings */}
          <div 
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="bg-white rounded-[24px] p-5 flex items-center justify-between shadow-sm cursor-pointer active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl" style={{ backgroundColor: `${theme.primary}10` }}>
                <Palette size={22} style={{ color: theme.primary }} />
              </div>
              <span className="font-black text-gray-800 block">主题实验室</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                 <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.primary }}></div>
                 <div className="w-5 h-5 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: theme.secondary }}></div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </div>

          {showColorPicker && (
            <div className="bg-white rounded-[24px] p-6 shadow-inner border-2 border-gray-50 animate-in fade-in slide-in-from-top-4">
               <div className="space-y-5">
                  <div className="flex gap-4">
                     <div className="flex-1">
                        <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Primary</label>
                        <input type="text" value={primaryInput} onChange={(e) => setPrimaryInput(e.target.value)} className="w-full bg-gray-50 border-2 border-transparent focus:border-gray-100 rounded-xl px-4 py-3 text-sm font-mono font-bold"/>
                     </div>
                     <div className="flex-1">
                        <label className="text-[10px] font-black text-gray-400 mb-2 block uppercase tracking-widest">Secondary</label>
                        <input type="text" value={secondaryInput} onChange={(e) => setSecondaryInput(e.target.value)} className="w-full bg-gray-50 border-2 border-transparent focus:border-gray-100 rounded-xl px-4 py-3 text-sm font-mono font-bold"/>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <button onClick={handleApplyColors} className="py-4 rounded-2xl text-[10px] font-black text-white shadow-xl" style={{ backgroundColor: theme.primary }}>APPLY DESIGN</button>
                     <button onClick={() => randomizeTheme()} className="py-4 rounded-2xl text-[10px] font-black bg-gray-100 text-gray-500">RANDOMIZE</button>
                  </div>
               </div>
            </div>
          )}

          {onLogout && (
            <button onClick={onLogout} className="w-full bg-white rounded-[24px] p-5 flex items-center gap-4 shadow-sm text-red-500 font-black active:bg-red-50 transition-colors mt-8">
              <div className="p-3 rounded-2xl bg-red-50"><LogOut size={22} /></div>
              <span>安全退出登录</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Address View
  if (activeSubView === 'address') {
    return (
      <div className="min-h-screen bg-white pb-32 animate-in slide-in-from-right duration-300">
        {renderHeader('收货地址管理')}
        
        <div className="px-6 mt-6 space-y-4">
          <div 
             onClick={syncWaterService}
             className="bg-teal-50 border-2 border-teal-100 rounded-2xl p-4 flex items-center gap-3 cursor-pointer active:scale-95 transition-all"
          >
             <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-600 shadow-sm">
                <Droplets size={20} />
             </div>
             <div className="flex-1">
                <div className="text-xs font-black text-teal-800">关联家庭住址</div>
                <div className="text-[10px] text-teal-600 font-bold uppercase">Sync regional water service</div>
             </div>
             <Smartphone size={16} className="text-teal-400" />
          </div>

          {addresses.map((addr) => (
            <div key={addr.id} className="bg-gray-50 rounded-3xl p-6 relative group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                   <h3 className="font-black text-gray-900">{addr.name}</h3>
                   <span className="text-sm font-bold text-gray-400">{addr.phone}</span>
                   {addr.isDefault && (
                     <span className="px-2 py-0.5 rounded-md bg-gray-900 text-white text-[8px] font-black uppercase">Default</span>
                   )}
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium mb-4 leading-relaxed">
                {addr.province}{addr.city}{addr.district}{addr.detail}
              </p>
              
              {addr.waterServiceInfo && (
                <div className="p-3 rounded-xl bg-white border border-gray-100 flex items-start gap-2 mb-4">
                   <Info size={14} className="text-teal-500 shrink-0 mt-0.5" />
                   <p className="text-[10px] font-bold text-teal-700">{addr.waterServiceInfo}</p>
                </div>
              )}

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button onClick={() => setDefaultAddress(addr.id)} className="text-[10px] font-black text-gray-400 hover:text-gray-900 transition-colors">设为默认</button>
                <div className="flex-1"></div>
                <button className="p-2 rounded-lg bg-white text-gray-400 hover:text-blue-500 transition-colors"><Edit3 size={16} /></button>
                <button onClick={() => deleteAddress(addr.id)} className="p-2 rounded-lg bg-white text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}

          <button className="w-full py-5 rounded-[28px] border-4 border-dashed border-gray-100 flex items-center justify-center gap-2 text-gray-400 font-black active:bg-gray-50 transition-all">
            <Plus size={20} /> 新增收货地址
          </button>
        </div>
      </div>
    );
  }

  // Profile Edit View
  if (activeSubView === 'profile') {
    return (
      <div className="min-h-screen bg-white pb-32 animate-in slide-in-from-right duration-300">
        {renderHeader('个人资料编辑')}
        <div className="px-6 mt-8 space-y-8">
           <div className="flex flex-col items-center">
              <div className="relative group">
                 <div className="w-24 h-24 rounded-[36px] overflow-hidden border-4 border-gray-100 shadow-xl">
                   <img src={user?.avatar} className="w-full h-full object-cover" />
                 </div>
                 <div className="absolute -bottom-2 -right-2 p-2 bg-gray-900 text-white rounded-2xl shadow-lg cursor-pointer active:scale-90">
                    <Edit3 size={16} />
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">用户姓名</label>
                 <input type="text" defaultValue={user?.name} className="w-full bg-gray-50 rounded-2xl py-4 px-6 font-black outline-none border-2 border-transparent focus:border-gray-100" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">绑定手机</label>
                 <div className="w-full bg-gray-100 rounded-2xl py-4 px-6 font-black text-gray-400 flex justify-between items-center">
                    <span>{user?.phone}</span>
                    <span className="text-[9px] font-black bg-white px-2 py-1 rounded-md text-gray-300 uppercase">Verified</span>
                 </div>
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">性别设置</label>
                 <div className="grid grid-cols-2 gap-3">
                    <button className={`py-4 rounded-2xl font-black border-4 ${user?.gender === 'male' ? 'border-gray-900 bg-gray-50' : 'border-transparent bg-gray-50 text-gray-300'}`}>男生 🙋‍♂️</button>
                    <button className={`py-4 rounded-2xl font-black border-4 ${user?.gender === 'female' ? 'border-gray-900 bg-gray-50' : 'border-transparent bg-gray-50 text-gray-300'}`}>女生 🙋‍♀️</button>
                 </div>
              </div>
           </div>

           <button className="w-full py-5 rounded-[28px] text-white font-black text-lg shadow-2xl active:scale-95 transition-all mt-8" style={{ backgroundColor: theme.primary }}>
             保存修改
           </button>
        </div>
      </div>
    );
  }

  // Coupons View
  if (activeSubView === 'coupons') {
    return (
      <div className="min-h-screen bg-white pb-32 animate-in slide-in-from-right duration-300">
        {renderHeader('可用抵用券')}
        <div className="px-6 mt-6 space-y-4">
           {MOCK_COUPONS.map(coupon => (
             <div key={coupon.id} className="relative group">
                <div className={`rounded-3xl p-5 border-4 ${coupon.type === 'employee' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-50 bg-gray-50'} flex gap-4 transition-all hover:scale-[1.02]`}>
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${coupon.type === 'employee' ? 'bg-yellow-400 text-white' : 'bg-white text-red-500'}`}>
                      {coupon.type === 'employee' ? <Zap size={24} /> : <Ticket size={24} />}
                   </div>
                   <div className="flex-1">
                      <div className="flex justify-between items-start">
                         <h4 className="font-black text-gray-900 leading-tight">{coupon.title}</h4>
                         <div className="text-lg font-black text-red-500">{coupon.value > 0 ? `¥${coupon.value}` : 'FREE'}</div>
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold mt-1 leading-relaxed">{coupon.desc}</p>
                      <div className="flex items-center justify-between mt-4">
                         <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">Valid until: {coupon.expiry}</span>
                         {coupon.linkedProductId && (
                           <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white text-[9px] font-black shadow-sm text-yellow-700">
                              查看适用商品 <ExternalLink size={10} />
                           </button>
                         )}
                      </div>
                   </div>
                </div>
             </div>
           ))}
           
           <div onClick={() => setActiveSubView('coupon_history')} className="text-center pt-8 cursor-pointer">
              <span className="text-xs font-black text-gray-300 hover:text-gray-900 transition-colors uppercase tracking-widest">查看已失效/抵用记录 →</span>
           </div>
        </div>
      </div>
    );
  }

  // Points & Transaction Details
  if (activeSubView === 'points_history' || activeSubView === 'coupon_history') {
    const isPoints = activeSubView === 'points_history';
    return (
      <div className="min-h-screen bg-white pb-32 animate-in slide-in-from-right duration-300">
        {renderHeader(isPoints ? '积分收支明细' : '抵用券发放明细')}
        <div className="px-6 mt-6 space-y-6">
           {MOCK_HISTORY.filter(h => h.type === (isPoints ? 'points' : 'coupon')).map(item => (
             <div key={item.id} className="flex items-center justify-between py-4 border-b border-gray-50">
                <div className="flex items-center gap-4">
                   <div className={`p-3 rounded-2xl ${isPoints ? 'bg-orange-50 text-orange-500' : 'bg-red-50 text-red-500'}`}>
                      {isPoints ? <History size={20} /> : <Ticket size={20} />}
                   </div>
                   <div>
                      <h4 className="font-black text-gray-900 text-sm">{item.title}</h4>
                      <p className="text-[10px] text-gray-300 font-bold mt-0.5">{item.time}</p>
                   </div>
                </div>
                <span className={`text-sm font-black ${item.amount.startsWith('+') ? 'text-green-500' : 'text-gray-900'}`}>{item.amount}</span>
             </div>
           ))}
           
           {MOCK_HISTORY.length === 0 && (
             <div className="py-20 text-center">
                <div className="text-4xl opacity-10 mb-4 italic">No Records Found</div>
             </div>
           )}
        </div>
      </div>
    );
  }

  // Employee Store View
  if (activeSubView === 'employee_store') {
    return (
      <div className="min-h-screen bg-black text-white pb-32 animate-in zoom-in-95 duration-500">
        <div className="sticky top-0 z-50 px-6 pt-12 pb-4 bg-black flex items-center justify-between border-b border-white/10">
          <button onClick={() => setActiveSubView('main')} className="p-2 rounded-xl bg-white/10 active:scale-90 transition-all text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-black text-yellow-400 italic">EMPLOYEE ONLY</h2>
          <div className="w-9"></div>
        </div>
        
        <div className="px-6 mt-8">
           <div className="bg-white/10 p-6 rounded-[32px] mb-10 border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={80} /></div>
              <h3 className="text-xl font-black mb-1">专享福利正在发放</h3>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Selected items with exclusive discount</p>
           </div>

           <div className="grid grid-cols-2 gap-4">
              {MOCK_PRODUCTS.filter(p => p.isEmployeeOnly).map(product => (
                <div key={product.id} className="bg-white/5 border border-white/10 rounded-[28px] p-4 group">
                   <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                      <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-2 left-2 px-2 py-1 bg-yellow-400 text-black text-[8px] font-black rounded-md uppercase">Staff Pick</div>
                   </div>
                   <h4 className="font-black text-sm mb-1 leading-tight">{product.name}</h4>
                   <div className="flex items-end justify-between mt-3">
                      <div>
                         <span className="text-xs font-black text-yellow-400">¥{product.price}</span>
                         <span className="text-[9px] text-gray-500 line-through ml-1">¥{product.originalPrice}</span>
                      </div>
                      <button className="w-8 h-8 rounded-xl bg-yellow-400 text-black flex items-center justify-center active:scale-90 transition-all">
                         <Plus size={16} strokeWidth={3} />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  return null;
};

export default MemberView;
