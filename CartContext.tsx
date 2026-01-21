
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MOCK_PRODUCTS } from './constants';

export interface CartItem {
  id: string; // unique cart entry id
  productId: string;
  specId?: string;
  quantity: number;
  checked: boolean;
  isEmployeeOnly: boolean;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (productId: string, specId?: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCheck: (id: string) => void;
  toggleAll: (checked: boolean) => void;
  clearCart: () => void;
  totalPrice: number;
  checkedCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode; user: any }> = ({ children, user }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 从本地存储加载购物车数据
  useEffect(() => {
    const savedCart = localStorage.getItem('hydro_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 持久化购物车
  useEffect(() => {
    localStorage.setItem('hydro_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (productId: string, specId?: string, quantity: number = 1) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCart(prev => {
      // 检查是否已存在相同规格的商品
      const existingIdx = prev.findIndex(item => item.productId === productId && item.specId === specId);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        productId,
        specId,
        quantity,
        checked: true,
        isEmployeeOnly: !!product.isEmployeeOnly
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const toggleCheck = (id: string) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const toggleAll = (checked: boolean) => {
    // 仅针对当前角色可见的商品进行全选/全不选
    const filteredIds = cart
      .filter(item => (user?.isEmployee ? item.isEmployeeOnly : !item.isEmployeeOnly))
      .map(i => i.id);
    setCart(prev => prev.map(item => filteredIds.includes(item.id) ? { ...item, checked } : item));
  };

  const clearCart = () => {
    // 仅清空当前角色下的商品
    setCart(prev => prev.filter(item => (user?.isEmployee ? !item.isEmployeeOnly : item.isEmployeeOnly)));
  };

  // 针对当前角色过滤显示的购物车项目
  const visibleItems = cart.filter(item => {
    if (user?.isEmployee) return item.isEmployeeOnly;
    return !item.isEmployeeOnly;
  });

  const checkedItems = visibleItems.filter(i => i.checked);
  
  const totalPrice = checkedItems.reduce((acc, item) => {
    const product = MOCK_PRODUCTS.find(p => p.id === item.productId);
    const spec = product?.specs?.find(s => s.id === item.specId);
    const price = spec ? spec.price : (product?.price || 0);
    return acc + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{ 
      cart: visibleItems, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      toggleCheck, 
      toggleAll,
      clearCart,
      totalPrice,
      checkedCount: checkedItems.length
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
