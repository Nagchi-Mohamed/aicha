import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Sparkles, MessageSquareHeart, Globe, Menu, X } from 'lucide-react';
import { useAppContext } from '../App';
import { useLanguage } from '../i18n/LanguageContext';
import FeedbackModal from './FeedbackModal';

import AichaLogo from './AichaLogo';

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { cart } = useAppContext();
  const { t, language, setLanguage, dir } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'ar' : 'fr');
  };

  return (
    <>
      <header className="bg-white/90 backdrop-blur-md border-b border-emerald-600/10 sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="shrink-0">
            <AichaLogo showText={true} className="w-11 h-11" textClassName="text-lg sm:text-xl" />
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-full border border-emerald-600/10 w-72 lg:w-96 focus-within:ring-2 focus-within:ring-emerald-600/20 focus-within:bg-white transition-all">
            <Search size={18} className="text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder={t.nav.search}
              value={searchValue}
              onChange={handleSearchChange}
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 outline-none text-slate-800"
            />
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-emerald-600/20 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-800 text-xs font-extrabold transition-all"
              title="Changer de langue / تغيير اللغة"
            >
              <Globe size={15} />
              <span>{language === 'fr' ? 'العربية' : 'Français'}</span>
            </button>

            {/* Feedback & Complaint Button */}
            <button
              onClick={() => setIsFeedbackOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-100 hover:bg-emerald-100/50 text-slate-700 hover:text-emerald-700 text-xs font-extrabold transition-all border border-slate-200"
            >
              <MessageSquareHeart size={16} className="text-emerald-600" />
              <span>{t.nav.feedback}</span>
            </button>

            {/* Cart Button */}
            <Link
              to="/checkout"
              className="relative p-2.5 hover:bg-emerald-50 rounded-full transition-colors group"
              title={t.nav.cart}
            >
              <ShoppingCart size={22} className="text-slate-800 group-hover:text-emerald-600 transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center rounded-full shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Link */}
            <Link
              to="/admin"
              className="p-2.5 hover:bg-emerald-50 rounded-full transition-colors text-slate-800 hover:text-emerald-600"
              title={t.nav.admin}
            >
              <User size={22} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-emerald-600"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-emerald-600/10 px-4 py-4 space-y-4 animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder={t.nav.search}
                value={searchValue}
                onChange={handleSearchChange}
                className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsFeedbackOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-50 text-slate-800 font-extrabold text-sm hover:bg-emerald-50"
              >
                <MessageSquareHeart size={18} className="text-emerald-600" />
                <span>{t.nav.feedback}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Feedback Modal */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
    </>
  );
};

export default Navbar;
