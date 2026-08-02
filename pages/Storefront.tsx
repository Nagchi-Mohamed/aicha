import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, MessageSquare, CheckCircle2, Truck, Leaf, ChevronDown, X, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { useAppContext } from '../App';
import { useLanguage } from '../i18n/LanguageContext';
import { AICHA_WHATSAPP_NUMBER } from '../constants';

import AichaLogo from '../components/AichaLogo';

const Storefront: React.FC = () => {
  const { products, cart } = useAppContext();
  const { t, language, dir } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'name'>('recommended');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const totalCartValue = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(products.map(p => (language === 'ar' && p.categoryAr ? p.categoryAr : p.category)))];
    return cats;
  }, [products, language]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.nameAr && p.nameAr.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        (p.descriptionAr && p.descriptionAr.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => 
        p.category === selectedCategory || p.categoryAr === selectedCategory
      );
    }

    // Apply sorting
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sorted.sort((a, b) => {
          const nameA = language === 'ar' && a.nameAr ? a.nameAr : a.name;
          const nameB = language === 'ar' && b.nameAr ? b.nameAr : b.name;
          return nameA.localeCompare(nameB);
        });
        break;
      case 'recommended':
      default:
        sorted.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
    }

    return sorted;
  }, [products, searchQuery, selectedCategory, sortBy, language]);

  const handleOpenWhatsAppAicha = () => {
    const defaultMsg = language === 'ar'
      ? 'مرحباً عائشة، أود الاستفسار عن منتجات فوريفير المتوفرة لديكم.'
      : 'Bonjour Aicha, je souhaite me renseigner sur vos produits Forever.';
    window.open(`https://wa.me/${AICHA_WHATSAPP_NUMBER.replace(/\+|\s/g, '')}?text=${encodeURIComponent(defaultMsg)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 flex flex-col">
      <Navbar onSearch={setSearchQuery} />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-7xl mx-auto w-full">
        <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-emerald-950 text-white p-8 sm:p-14 lg:p-20 min-h-[460px] flex flex-col justify-center shadow-2xl">
          
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-40 mix-blend-overlay">
            <img
              src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000"
              alt="Aloe Vera Wellness Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/80 to-transparent"></div>

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-900/80 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-extrabold text-emerald-300 border border-emerald-500/30 mb-6">
              <Sparkles size={14} className="text-emerald-400" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6 tracking-tight drop-shadow-md">
              {t.hero.title} <span className="text-emerald-400">{t.hero.titleHighlight}</span> {t.hero.titleEnd}
            </h1>

            <p className="text-emerald-100 text-base sm:text-lg font-medium mb-8 max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#catalog"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-7 py-4 rounded-2xl font-black text-base flex items-center gap-3 shadow-xl shadow-emerald-950/50 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>{t.hero.cta}</span>
                <ArrowRight size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
              </a>

              <button
                onClick={handleOpenWhatsAppAicha}
                className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-6 py-4 rounded-2xl font-extrabold text-sm flex items-center gap-2 border border-white/20 transition-all"
              >
                <MessageSquare size={18} className="text-emerald-400" />
                <span>{t.hero.contactBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Catalog Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-2 text-slate-900">{t.products.featured}</h2>
            <p className="text-slate-500 text-sm font-medium">{t.products.description}</p>
          </div>

          <div className="flex gap-3 relative flex-wrap">
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowFilterMenu(!showFilterMenu);
                  setShowSortMenu(false);
                }}
                className="bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-extrabold flex items-center gap-2 hover:border-emerald-600/30 transition-colors shadow-sm"
              >
                <span>{selectedCategory === 'all' ? t.products.filter : selectedCategory}</span>
                <ChevronDown size={16} className={`transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
              </button>

              {showFilterMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowFilterMenu(false)} />
                  <div className={`absolute top-full mt-2 ${dir === 'rtl' ? 'left-0' : 'right-0'} bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 min-w-[220px]`}>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-xs sm:text-sm font-bold transition-colors flex justify-between items-center ${
                          selectedCategory === cat
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span>{cat === 'all' ? t.products.allProducts : cat}</span>
                        {selectedCategory === cat && <span className="text-emerald-600 font-extrabold">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowSortMenu(!showSortMenu);
                  setShowFilterMenu(false);
                }}
                className="bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-extrabold flex items-center gap-2 hover:border-emerald-600/30 transition-colors shadow-sm"
              >
                <span>
                  {sortBy === 'recommended' ? t.products.sortRecommended :
                   sortBy === 'price-low' ? t.products.sortPriceLow :
                   sortBy === 'price-high' ? t.products.sortPriceHigh : t.products.sortName}
                </span>
                <ChevronDown size={16} className={`transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
              </button>

              {showSortMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowSortMenu(false)} />
                  <div className={`absolute top-full mt-2 ${dir === 'rtl' ? 'left-0' : 'right-0'} bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-50 min-w-[220px]`}>
                    {[
                      { value: 'recommended', label: t.products.sortRecommended },
                      { value: 'price-low', label: t.products.sortPriceLow },
                      { value: 'price-high', label: t.products.sortPriceHigh },
                      { value: 'name', label: t.products.sortName }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value as any);
                          setShowSortMenu(false);
                        }}
                        className={`w-full px-4 py-3 text-left text-xs sm:text-sm font-bold transition-colors flex justify-between items-center ${
                          sortBy === option.value
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'hover:bg-slate-50 text-slate-800'
                        }`}
                      >
                        <span>{option.label}</span>
                        {sortBy === option.value && <span className="text-emerald-600 font-extrabold">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.products.activeFilters}</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-2 hover:bg-emerald-200 transition-colors"
              >
                <span>{t.products.searchLabel} "{searchQuery}"</span>
                <X size={14} />
              </button>
            )}
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-2 hover:bg-emerald-200 transition-colors"
              >
                <span>{t.products.categoryLabel} {selectedCategory}</span>
                <X size={14} />
              </button>
            )}
          </div>
        )}

        {/* Products Grid (Flexbox/Grid Dynamic Responsive Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              <Leaf className="mx-auto mb-4 text-emerald-600" size={56} />
              <h3 className="text-2xl font-black mb-2 text-slate-900">{t.products.noProducts}</h3>
              <p className="text-slate-500 mb-6 text-sm">{t.products.tryAdjusting}</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-extrabold text-sm hover:bg-emerald-700 transition-colors shadow-md"
              >
                {t.products.clearFilters}
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 flex flex-col items-center">
          <p className="text-xs text-slate-500 font-extrabold uppercase tracking-widest">
            {t.products.showing} {filteredAndSortedProducts.length} {t.products.of} {products.length} {t.products.items}
          </p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-t border-slate-200/80 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6 leading-tight">
              {t.howItWorks.title} <br />
              <span className="text-emerald-600">{t.howItWorks.titleHighlight}</span>
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed mb-10 text-base sm:text-lg">
              {t.howItWorks.description}
            </p>

            <div className="space-y-8">
              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 font-black">
                  1
                </div>
                <div>
                  <h4 className="font-extrabold text-lg mb-1 text-slate-900">{t.howItWorks.step1Title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.howItWorks.step1Desc}</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 font-black">
                  2
                </div>
                <div>
                  <h4 className="font-extrabold text-lg mb-1 text-slate-900">{t.howItWorks.step2Title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.howItWorks.step2Desc}</p>
                </div>
              </div>

              <div className="flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 font-black">
                  3
                </div>
                <div>
                  <h4 className="font-extrabold text-lg mb-1 text-slate-900">{t.howItWorks.step3Title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.howItWorks.step3Desc}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-emerald-600/10 rounded-[3rem] blur-2xl"></div>
            <div className="relative bg-white p-4 rounded-[2.5rem] border border-slate-200 shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1000"
                alt="Aicha Wellness Products"
                className="rounded-[2rem] w-full h-[450px] sm:h-[550px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Bar / Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom duration-300">
          <Link
            to="/checkout"
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 sm:px-8 py-4 rounded-full flex items-center gap-4 shadow-2xl hover:scale-105 transition-all border border-slate-700 group"
          >
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Total: {totalCartValue} {t.products.mad}
              </span>
              <span className="text-xs sm:text-sm font-extrabold">
                {t.checkout.checkout} ({cart.length} {t.products.items})
              </span>
            </div>
            <div className="w-10 h-10 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center font-black group-hover:rotate-12 transition-transform">
              <ShoppingBag size={20} />
            </div>
          </Link>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <AichaLogo showText={true} className="w-9 h-9" textClassName="text-base sm:text-lg" />

          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <a href="#" className="hover:text-emerald-600 transition-colors">{t.footer.shippingPolicy}</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">{t.footer.authorizedPartner}</a>
          </div>

          <button
            onClick={handleOpenWhatsAppAicha}
            className="flex items-center gap-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-full text-xs font-extrabold transition-colors border border-emerald-200"
          >
            <MessageSquare size={16} />
            <span>{t.footer.contactAicha}</span>
          </button>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 font-extrabold tracking-wide">
            {t.footer.copyright}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Storefront;
