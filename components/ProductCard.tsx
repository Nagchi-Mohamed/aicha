import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Eye, Check, Info, X } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../App';
import { useLanguage } from '../i18n/LanguageContext';
import { AichaIcon } from './AichaLogo';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useAppContext();
  const { t, language, dir } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const displayName = (language === 'ar' && product.nameAr) ? product.nameAr : product.name;
  const displayCategory = (language === 'ar' && product.categoryAr) ? product.categoryAr : product.category;
  const displayDescription = (language === 'ar' && product.descriptionAr) ? product.descriptionAr : product.description;

  const handleIncrement = () => setQuantity(q => q + 1);
  const handleDecrement = () => setQuantity(q => Math.max(1, q - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 1800);
    setQuantity(1);
  };

  return (
    <>
      <div className="bg-white rounded-3xl overflow-hidden border border-emerald-600/10 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative">
        
        {/* Image Container with Dynamic Responsive Aspect Ratio */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          {product.isBestseller && (
            <span className={`absolute top-3 ${dir === 'rtl' ? 'right-3' : 'left-3'} z-10 bg-emerald-600/90 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md flex items-center gap-1.5`}>
              <AichaIcon size={13} className="text-white shrink-0" />
              {t.products.bestseller}
            </span>
          )}

          <img
            src={product.imageUrl}
            alt={displayName}
            loading="lazy"
            onError={(e) => {
              // Fallback image if uploaded URL is broken
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800';
            }}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          />

          {/* Overlay Quick View Button */}
          <button
            onClick={() => setShowDetailModal(true)}
            className="absolute bottom-3 right-3 bg-white/95 text-slate-800 p-2.5 rounded-full shadow-lg opacity-95 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-emerald-600 hover:text-white"
            title={t.products.viewDetails}
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Product Details */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 leading-snug line-clamp-1">
              {displayName}
            </h3>
            <span className="font-black text-base text-emerald-700 shrink-0">
              {product.price} {t.products.mad}
            </span>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed mb-5 line-clamp-2 min-h-[2.25rem]">
            {displayDescription}
          </p>

          {/* Quantity and Cart Action Bar */}
          <div className="mt-auto flex items-center gap-2 pt-3 border-t border-slate-100">
            <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={handleDecrement}
                className="p-2 hover:bg-emerald-100 text-slate-600 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="w-7 text-center text-xs font-black text-slate-800">{quantity}</span>
              <button
                onClick={handleIncrement}
                className="p-2 hover:bg-emerald-100 text-slate-600 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all duration-200 flex items-center justify-center gap-2 ${
                showAddedToast
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95'
              }`}
            >
              {showAddedToast ? (
                <>
                  <Check size={16} />
                  <span>Ajouté !</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  <span>{t.products.addToCart}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative">
            <button
              onClick={() => setShowDetailModal(false)}
              className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="h-64 w-full overflow-hidden bg-slate-100 relative">
              <img
                src={product.imageUrl}
                alt={displayName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    {displayCategory}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">{displayName}</h3>
                </div>
                <span className="text-2xl font-black text-emerald-700">{product.price} {t.products.mad}</span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {displayDescription}
              </p>

              <div className="pt-4 flex items-center gap-3">
                <button
                  onClick={() => {
                    handleAddToCart();
                    setShowDetailModal(false);
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={18} />
                  {t.products.addToCart}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
