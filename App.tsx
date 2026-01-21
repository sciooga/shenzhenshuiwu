
import React, { useState, useEffect } from 'react';
import TabBar from './components/TabBar';
import HomeView from './views/HomeView';
import MemberView from './views/MemberView';
import ProductsView from './views/ProductsView';
import ProductDetailView from './views/ProductDetailView';
import CartView from './views/CartView';
import AuthView from './views/AuthView';
import NewsView from './views/NewsView';
import { ThemeProvider, useTheme } from './ThemeContext';
import { CartProvider } from './CartContext';
import { MOCK_PRODUCTS } from './constants';

const PlaceholderView: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] px-10 text-center animate-in fade-in duration-500">
    <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center text-4xl mb-4">
      🚧
    </div>
    <h2 className="text-xl font-black text-gray-900">{name} 模块开发中</h2>
    <p className="text-sm text-gray-400 mt-2">更多精彩内容即将上线，敬请期待！</p>
  </div>
);

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState<any>(null);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isAuthView, setIsAuthView] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('hydro_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      const guestUser = {
        id: 'guest',
        name: '访客用户',
        isEmployee: false,
        level: 1,
        points: 0,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"
      };
      setUser(guestUser);
    }
  }, []);

  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    localStorage.setItem('hydro_user', JSON.stringify(userData));
    setIsAuthView(false);
    setActiveTab('home');
  };

  const handleLogout = () => {
    const guestUser = {
      id: 'guest',
      name: '访客用户',
      isEmployee: false,
      level: 1,
      points: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky"
    };
    setUser(guestUser);
    localStorage.removeItem('hydro_user');
    setActiveTab('home');
  };

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
  };

  const renderContent = () => {
    if (isAuthView) {
      return <AuthView onLoginSuccess={handleLoginSuccess} />;
    }

    if (selectedProductId) {
      const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId);
      if (product) {
        return (
          <ProductDetailView 
            product={product} 
            user={user} 
            onBack={() => setSelectedProductId(null)} 
            onLoginRequired={() => setIsAuthView(true)}
          />
        );
      }
    }

    switch (activeTab) {
      case 'home':
        return <HomeView user={user} onProductClick={handleProductClick} />;
      case 'member':
        return <MemberView user={user} onLogout={handleLogout} />;
      case 'products':
        return <ProductsView user={user} onProductClick={handleProductClick} onLoginRequired={() => setIsAuthView(true)} />;
      case 'cart':
        return (
          <CartView 
            user={user} 
            onGoShopping={() => setActiveTab('products')} 
            onLoginRedirect={() => setIsAuthView(true)}
          />
        );
      case 'news':
        return <NewsView />;
      default:
        return <HomeView user={user} onProductClick={handleProductClick} />;
    }
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 max-w-md mx-auto relative shadow-2xl overflow-y-auto overflow-x-hidden border-x border-gray-200" style={{ backgroundColor: theme.bg }}>
      <CartProvider user={user}>
        <main className="pb-24 animate-in fade-in duration-300">
          {renderContent()}
        </main>
        {(!selectedProductId && !isAuthView) && <TabBar active={activeTab} onChange={setActiveTab} />}
      </CartProvider>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;