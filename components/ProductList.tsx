import React from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { Plus, Flame, Zap } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface ProductListProps {
  isEmployee?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ isEmployee = false }) => {
  const { theme } = useTheme();

  // Filter products based on user role
  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    if (isEmployee) {
      return product.isEmployeeOnly === true;
    } else {
      return product.isEmployeeOnly !== true;
    }
  });

  return (
    <div className="px-4 pb-28 mt-8 animate-in fade-in duration-500">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-gray-900 leading-none italic uppercase">
              {isEmployee ? '员工专享 · 精选' : '大家都在买'}
            </h3>
            {isEmployee && (
              <div className="px-2 py-0.5 bg-gray-900 rounded-md">
                <span className="text-[8px] font-black text-[#E0F102] uppercase tracking-widest">Internal</span>
              </div>
            )}
          </div>
          <p className="text-xs text-gray-400 font-bold mt-2 uppercase tracking-tighter">
            {isEmployee ? 'ONLY VERIFIED STAFF CAN VIEW' : 'TOP TRENDING THIS WEEK'}
          </p>
        </div>
        <button 
          className="text-xs font-black underline decoration-4 underline-offset-4 text-gray-900"
          style={{ textDecorationColor: theme.accent }}
        >
          VIEW ALL
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className={`rounded-[28px] p-4 flex flex-col h-full relative group transition-all duration-300 ${isEmployee ? 'bg-black text-white' : 'bg-white border-4 border-gray-50 shadow-sm'}`}
          >
            {/* Image Container */}
            <div className={`relative aspect-square rounded-[20px] overflow-hidden mb-4 ${isEmployee ? 'bg-white/10' : 'bg-gray-100'}`}>
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Floating Tag */}
              {product.tags[0] && (
                <div 
                  className="absolute top-0 left-0 px-3 py-1.5 rounded-br-2xl text-[10px] font-black z-10 uppercase tracking-widest shadow-lg"
                  style={{ 
                    backgroundColor: isEmployee ? '#E0F102' : theme.accent, 
                    color: '#000' 
                  }}
                >
                  {product.tags[0]}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <h4 className={`text-sm font-black leading-tight line-clamp-2 mb-1 uppercase tracking-tight ${isEmployee ? 'text-white' : 'text-gray-900'}`}>
                {product.name}
              </h4>
              <p className="text-[10px] text-gray-400 mb-4 line-clamp-1 font-bold italic">{product.desc || '深圳市水务精选'}</p>
              
              <div className="mt-auto flex items-end justify-between">
                <div>
                   <span className={`text-xs font-black mr-0.5 ${isEmployee ? 'text-white' : 'text-gray-900'}`}>¥</span>
                   <span className={`text-2xl font-black ${isEmployee ? 'text-[#E0F102]' : 'text-gray-900'}`}>{product.price}</span>
                   {product.originalPrice && (
                     <span className="text-[10px] text-gray-500 line-through ml-2 font-bold italic">¥{product.originalPrice}</span>
                   )}
                </div>
                
                <button 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all active:scale-90 active:rotate-12 shadow-xl"
                  style={{ backgroundColor: isEmployee ? '#E0F102' : theme.secondary }}
                >
                  {isEmployee ? (
                    <Zap size={20} color="black" strokeWidth={3} fill="black" />
                  ) : (
                    <Plus size={20} color="white" strokeWidth={3} />
                  )}
                </button>
              </div>
              
              {/* Sales Count */}
              {!isEmployee && (
                <div className="mt-3 flex items-center gap-1 text-[9px] text-gray-400 font-black uppercase tracking-widest">
                  <Flame size={10} className="text-red-500" fill="#EF4444" />
                  <span>Sold {product.sales}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
           <div className="text-4xl mb-4">📦</div>
           <p className="text-sm font-black text-gray-300 uppercase italic">暂无可选商品</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;