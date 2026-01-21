
import React, { useState, useEffect } from 'react';
import { MessageCircle, Phone, User as UserIcon, Calendar, CheckCircle2, Ticket, Gift, ArrowLeft, Smartphone, ShieldCheck, Sparkles, Loader2, Droplets } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface AuthViewProps {
  onLoginSuccess: (userData: any) => void;
}

// Mock Database for logic demonstration
const MOCK_DB = {
  employees: ['13800138000', '13912345678'],
  existingUsers: ['13800138000'] 
};

const AuthView: React.FC<AuthViewProps> = ({ onLoginSuccess }) => {
  const { theme } = useTheme();
  const [step, setStep] = useState<'login' | 'sms' | 'verifying' | 'syncing' | 'register' | 'reward'>('login');
  const [loginMethod, setLoginMethod] = useState<'wechat' | 'sms'>('wechat');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(0);
  
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male',
    birthday: ''
  });

  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOtp = () => {
    if (phone.length === 11) {
      setCountdown(60);
      setStep('sms');
    }
  };

  const verifyUser = (phoneNum: string) => {
    setStep('verifying');
    
    setTimeout(() => {
      const isEmployee = MOCK_DB.employees.includes(phoneNum);
      const isExisting = MOCK_DB.existingUsers.includes(phoneNum);

      if (isExisting) {
        setStep('syncing');
        setTimeout(() => {
          onLoginSuccess({
            id: 'u1',
            name: isEmployee ? '张三 (内测)' : '老友',
            phone: phoneNum,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phoneNum}`,
            isEmployee,
            isNew: false,
            level: 3,
            growth: 1250,
            points: 4500
          });
        }, 1200);
      } else {
        setStep('register');
      }
    }, 1500);
  };

  const handleWechatAuth = () => {
    const mockedPhone = '15912345678';
    setPhone(mockedPhone);
    verifyUser(mockedPhone);
  };

  const handleOtpVerify = () => {
    verifyUser(phone);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('reward');
  };

  const handleCompleteRewardAndLogin = () => {
    const isEmployee = MOCK_DB.employees.includes(phone);
    onLoginSuccess({
      id: 'u-new',
      name: formData.name || '新用户',
      phone: phone,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${phone}`,
      isEmployee,
      gender: formData.gender,
      birthday: formData.birthday,
      isNew: true,
      level: 1,
      growth: 0,
      points: 500
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-8 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[100px] opacity-15" style={{ backgroundColor: theme.primary }}></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-[100px] opacity-15" style={{ backgroundColor: theme.accent }}></div>

      {(step === 'login' || step === 'verifying' || step === 'syncing') && (
        <div className="w-full text-center animate-in fade-in zoom-in-95 duration-500">
          {step === 'login' && (
            <>
              <div className="w-24 h-24 rounded-[32px] mx-auto mb-8 flex items-center justify-center shadow-2xl rotate-6 relative transition-transform hover:rotate-0" style={{ backgroundColor: theme.primary }}>
                <span className="text-5xl">💧</span>
                <div className="absolute -right-3 -top-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-lg border-4" style={{ borderColor: theme.bg }}>
                   <ShieldCheck size={20} style={{ color: theme.primary }} />
                </div>
              </div>
              <h1 className="text-4xl font-black text-gray-900 mb-2 italic tracking-tighter">HYDRO<span style={{ color: theme.primary }}>POP</span></h1>
              <p className="text-gray-400 text-[10px] mb-12 font-black tracking-[0.3em] uppercase">Shenzhen Fresh Supply</p>
              
              {loginMethod === 'wechat' ? (
                <div className="space-y-4">
                  <button onClick={handleWechatAuth} className="w-full py-5 rounded-[24px] flex items-center justify-center gap-3 text-white font-black text-lg shadow-xl active:scale-95 transition-all" style={{ backgroundColor: '#07C160' }}>
                    <MessageCircle fill="currentColor" size={24} /> 微信快速登录
                  </button>
                  <button onClick={() => setLoginMethod('sms')} className="w-full py-4 text-gray-400 font-black text-xs flex items-center justify-center gap-2 uppercase tracking-widest">
                    <Smartphone size={14} /> 手机验证码登录
                  </button>
                </div>
              ) : (
                <div className="space-y-5 text-left">
                  <div className="bg-gray-100 rounded-[22px] p-5 flex items-center border-4 border-transparent focus-within:border-gray-200 focus-within:bg-white transition-all shadow-inner">
                    <Phone size={20} className="text-gray-400 mr-3" />
                    <input type="tel" maxLength={11} placeholder="请输入手机号" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} className="bg-transparent w-full text-lg font-black outline-none placeholder:text-gray-300" />
                  </div>
                  <button disabled={phone.length < 11} onClick={handleSendOtp} className="w-full py-5 rounded-[24px] text-white font-black text-lg shadow-2xl active:scale-95 transition-all disabled:opacity-50" style={{ backgroundColor: theme.primary }}>发送验证码</button>
                  <button onClick={() => setLoginMethod('wechat')} className="w-full text-center text-xs font-black text-gray-400 flex items-center justify-center gap-1 uppercase"><ArrowLeft size={14} /> 返回微信登录</button>
                </div>
              )}
            </>
          )}

          {(step === 'verifying' || step === 'syncing') && (
            <div className="flex flex-col items-center">
               <div className="relative">
                  <Loader2 size={64} className="animate-spin text-gray-100" strokeWidth={1} />
                  <div className="absolute inset-0 flex items-center justify-center">
                     {step === 'syncing' ? <Droplets size={32} className="text-teal-500 animate-bounce" /> : <div className="w-8 h-8 rounded-full animate-pulse" style={{ backgroundColor: theme.primary }}></div>}
                  </div>
               </div>
               <h2 className="mt-8 text-xl font-black text-gray-900">{step === 'verifying' ? '正在匹配身份...' : '同步区域水务信息...'}</h2>
               <p className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-widest">{step === 'verifying' ? 'Verifying user data' : 'Fetching regional data'}</p>
            </div>
          )}
        </div>
      )}

      {step === 'sms' && (
        <div className="w-full animate-in slide-in-from-right-12 duration-500">
          <button onClick={() => setStep('login')} className="mb-10 p-4 rounded-full bg-gray-100 text-gray-400 active:scale-90 transition-transform"><ArrowLeft size={24} /></button>
          <h2 className="text-3xl font-black text-gray-900 mb-2">输入验证码</h2>
          <p className="text-sm text-gray-400 mb-12">已发送至 <span className="text-gray-900 font-black">{phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}</span></p>
          <div className="flex justify-between gap-3 mb-12">
            {otp.map((digit, idx) => (
              <input key={idx} type="text" maxLength={1} value={digit} onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                const newOtp = [...otp];
                newOtp[idx] = val;
                setOtp(newOtp);
                if (val && e.target.nextSibling) (e.target.nextSibling as HTMLInputElement).focus();
              }} className="w-full aspect-square bg-gray-100 rounded-3xl text-center text-3xl font-black outline-none border-4 border-transparent focus:border-gray-900 focus:bg-white transition-all shadow-inner" />
            ))}
          </div>
          <button disabled={otp.some(d => !d)} onClick={handleOtpVerify} className="w-full py-5 rounded-[24px] text-white font-black text-xl shadow-2xl active:scale-95 transition-all disabled:opacity-30" style={{ backgroundColor: theme.primary }}>确认验证</button>
        </div>
      )}

      {step === 'register' && (
        <div className="w-full animate-in slide-in-from-bottom-12 duration-500 max-h-[95vh] overflow-y-auto hide-scrollbar py-10">
          <div className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-[10px] font-black mb-4 uppercase tracking-[0.2em]">New Connection ⚡️</div>
          <h2 className="text-4xl font-black text-gray-900 mb-3 leading-tight">欢迎加入<br/>深圳水务!</h2>
          <p className="text-sm text-gray-500 mb-10 font-bold uppercase tracking-widest">Personalize your water life</p>
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div className="bg-gray-50 rounded-[32px] p-8 border-4 border-gray-100 space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">真实姓名</label>
                <div className="relative group">
                  <UserIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white rounded-2xl py-5 pl-12 pr-4 outline-none border-2 border-transparent focus:border-gray-900 transition-all font-black text-lg" placeholder="您的称呼" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">出生日期</label>
                <div className="relative">
                  <Calendar size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input type="date" required className="w-full bg-white rounded-2xl py-5 pl-12 pr-4 outline-none border-2 border-transparent focus:border-gray-900 transition-all font-black text-lg" value={formData.birthday} onChange={e => setFormData({...formData, birthday: e.target.value})} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">您的性别</label>
                <div className="grid grid-cols-2 gap-4">
                   <button type="button" onClick={() => setFormData({...formData, gender: 'male'})} className={`py-5 rounded-2xl font-black transition-all border-4 ${formData.gender === 'male' ? 'bg-white text-gray-900 border-gray-900 shadow-xl' : 'bg-white/50 text-gray-300 border-transparent'}`}>男 🙋‍♂️</button>
                   <button type="button" onClick={() => setFormData({...formData, gender: 'female'})} className={`py-5 rounded-2xl font-black transition-all border-4 ${formData.gender === 'female' ? 'bg-white text-gray-900 border-gray-900 shadow-xl' : 'bg-white/50 text-gray-300 border-transparent'}`}>女 🙋‍♀️</button>
                </div>
              </div>
            </div>
            <button type="submit" className="w-full py-5 mt-4 rounded-[28px] text-white font-black text-xl shadow-2xl active:scale-95 transition-all" style={{ backgroundColor: theme.primary }}>完成注册 · 激活福利</button>
          </form>
        </div>
      )}

      {step === 'reward' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500"></div>
          <div className="relative w-full max-w-sm bg-white rounded-[56px] p-10 shadow-2xl animate-in zoom-in-95 duration-500 overflow-hidden text-center">
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-teal-100 to-white -z-10"></div>
            <div className="text-8xl mb-8 animate-bounce">🧧</div>
            <h3 className="text-3xl font-black text-gray-900 mb-2 italic">SUCCESS!</h3>
            <p className="text-sm text-gray-400 mb-10 font-bold uppercase tracking-widest">New user rewards activated</p>
            <div className="space-y-4 mb-12">
              <div className="flex gap-5 bg-[#FFF4F4] p-6 rounded-[32px] border-4 border-white items-center text-left shadow-sm">
                <div className="w-14 h-14 shrink-0 rounded-[18px] bg-white flex items-center justify-center text-red-500 shadow-xl"><Ticket size={32} /></div>
                <div><div className="text-lg font-black text-red-600 leading-none">服务体验券</div><div className="text-[10px] text-red-400 mt-2 font-black uppercase">Service Pack x1</div></div>
              </div>
              <div className="flex gap-5 bg-[#FFF9E6] p-6 rounded-[32px] border-4 border-white items-center text-left shadow-sm">
                <div className="w-14 h-14 shrink-0 rounded-[18px] bg-white flex items-center justify-center text-amber-500 shadow-xl"><Gift size={32} /></div>
                <div><div className="text-lg font-black text-amber-600 leading-none">新人立减券</div><div className="text-[10px] text-amber-500 mt-2 font-black uppercase">¥10 Cash Coupon</div></div>
              </div>
            </div>
            <button onClick={handleCompleteRewardAndLogin} className="w-full py-6 rounded-[32px] text-white font-black text-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all" style={{ backgroundColor: theme.primary }}>立即起航 <Sparkles size={24} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthView;
