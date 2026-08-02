import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, ShieldCheck, Truck, Info, User, Phone, MapPin, Trash2, Plus, Minus, Sparkles } from 'lucide-react';
import { useAppContext } from '../App';
import { Order } from '../types';
import { useLanguage } from '../i18n/LanguageContext';
import { AICHA_WHATSAPP_NUMBER } from '../constants';

import AichaLogo from '../components/AichaLogo';

const Checkout: React.FC = () => {
  const { cart, addOrder, clearCart, updateCartQuantity, removeFromCart } = useAppContext();
  const { t, language, dir } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const buildWhatsappMessage = (name: string, phone: string, address: string, items: typeof cart, grandTotal: number) => {
    if (language === 'ar') {
      const itemsList = items.map(i => `• *${i.nameAr || i.name}* × ${i.quantity} = ${i.price * i.quantity} د.م.`).join('\n');
      return [
        '🌿 *طلب جديد - متجر عائشة للرفاهية* 🌿',
        '----------------------------------------',
        `👤 *الاسم الكامل:* ${name}`,
        `📱 *الهاتف / الواتساب:* ${phone}`,
        `📍 *عنوان التوصيل والمدينة:* ${address || 'غير محدد'}`,
        '🛍️ *تفاصيل الطلب:*',
        itemsList,
        '----------------------------------------',
        `💰 *المجموع الإجمالي:* *${grandTotal} د.م.*`,
        '----------------------------------------',
        '✨ شكراً لثقتكم! في انتظار تأكيدكم للتوصيل.'
      ].join('\n');
    } else {
      const itemsList = items.map(i => `• *${i.name}* x ${i.quantity} = ${i.price * i.quantity} MAD`).join('\n');
      return [
        '🌿 *NOUVELLE COMMANDE - AICHA WELLNESS STORE* 🌿',
        '----------------------------------------',
        `👤 *Nom Client:* ${name}`,
        `📱 *Téléphone:* ${phone}`,
        `📍 *Adresse & Ville:* ${address || 'Non renseignée'}`,
        '🛍️ *DÉTAIL DES PRODUITS:*',
        itemsList,
        '----------------------------------------',
        `💰 *TOTAL À PAYER:* *${grandTotal} MAD*`,
        '----------------------------------------',
        `✨ Merci pour votre confiance ! Dans l'attente de votre confirmation pour la livraison.`
      ].join('\n');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || cart.length === 0) return;

    const newOrder: Order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: formData.name,
      whatsappNumber: formData.phone,
      address: formData.address,
      items: [...cart],
      total: total,
      status: 'pending',
      date: new Date().toISOString(),
    };

    // Save order in context / localStorage
    addOrder(newOrder);

    // Format WhatsApp message
    const rawMessage = buildWhatsappMessage(formData.name, formData.phone, formData.address, cart, total);
    const cleanNumber = AICHA_WHATSAPP_NUMBER.replace(/\+|\s/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(rawMessage)}`;

    setLastWhatsappUrl(waUrl);
    clearCart();
    setIsSubmitted(true);

    // Redirect to WhatsApp automatically
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600 shadow-xl shadow-emerald-600/10">
          <ShieldCheck size={48} />
        </div>
        <h2 className="text-3xl font-black mb-3 text-slate-900">{t.checkout.orderSuccessTitle}</h2>
        <p className="text-slate-600 font-medium max-w-md mb-8 leading-relaxed text-sm">
          {t.checkout.orderSuccessDesc}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          {lastWhatsappUrl && (
            <a
              href={lastWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 px-6 rounded-2xl font-extrabold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all"
            >
              <MessageSquare size={20} />
              <span>{t.hero.contactBtn}</span>
            </a>
          )}
          
          <Link
            to="/"
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 py-4 px-6 rounded-2xl font-extrabold flex items-center justify-center gap-2 transition-all text-sm"
          >
            <ArrowLeft size={18} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <span>{t.checkout.returnToStore}</span>
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 text-emerald-600">
          <Sparkles size={40} />
        </div>
        <h2 className="text-3xl font-black mb-3 text-slate-900">{t.checkout.emptyCart}</h2>
        <p className="text-slate-500 font-medium max-w-md mb-8 leading-relaxed text-sm">
          {t.checkout.emptyCartDesc}
        </p>
        <Link
          to="/"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-extrabold shadow-lg shadow-emerald-600/20 flex items-center gap-2 transition-all"
        >
          <ArrowLeft size={20} className={dir === 'rtl' ? 'rotate-180' : ''} />
          <span>{t.checkout.returnToStore}</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <nav className="h-20 bg-white border-b border-slate-200 flex items-center px-4 sm:px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <Link to="/" className="shrink-0">
            <AichaLogo showText={true} className="w-9 h-9" textClassName="text-base sm:text-lg" />
          </Link>

          <Link to="/" className="text-xs font-extrabold text-slate-500 hover:text-emerald-600 flex items-center gap-1">
            <ArrowLeft size={14} className={dir === 'rtl' ? 'rotate-180' : ''} />
            <span>{t.checkout.returnToStore}</span>
          </Link>
        </div>
      </nav>

      {/* Main Form Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 mb-2">{t.checkout.title}</h1>
          <p className="text-slate-500 font-medium text-sm sm:text-base">{t.checkout.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Customer Input Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  {t.checkout.fullName}
                </label>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl flex items-center px-4 py-1 focus-within:ring-2 focus-within:ring-emerald-600/20 focus-within:border-emerald-600 transition-all">
                  <User size={18} className="text-slate-400 shrink-0" />
                  <input
                    required
                    type="text"
                    placeholder="Ex: Omar El Mansouri"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="flex-1 bg-transparent border-none py-3 px-3 outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  {t.checkout.whatsappNumber}
                </label>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl flex items-center overflow-hidden focus-within:ring-2 focus-within:ring-emerald-600/20 focus-within:border-emerald-600 transition-all">
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-r border-slate-200 text-slate-700 font-extrabold text-sm shrink-0">
                    <span className="text-base">🇲🇦</span>
                    <span>+212</span>
                  </div>
                  <div className="flex-1 flex items-center px-3">
                    <Phone size={16} className="text-slate-400 shrink-0" />
                    <input
                      required
                      type="tel"
                      placeholder="06 00 00 00 00"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="flex-1 bg-transparent border-none py-3 px-3 outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-600 mb-2">
                  {t.checkout.address}
                </label>
                <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl flex items-start px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-600/20 focus-within:border-emerald-600 transition-all">
                  <MapPin size={18} className="text-slate-400 shrink-0 mt-1" />
                  <textarea
                    required
                    rows={3}
                    placeholder={t.checkout.addressPlaceholder}
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    className="flex-1 bg-transparent border-none py-0 px-3 outline-none text-sm font-medium text-slate-900 placeholder:text-slate-400 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-emerald-600/25 active:scale-95 transition-all"
              >
                <MessageSquare size={22} />
                <span>{t.checkout.confirmOrder}</span>
              </button>

              <div className="flex justify-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>{t.checkout.secureCheckout}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  <Truck size={16} className="text-emerald-600" />
                  <span>{t.checkout.fastDelivery}</span>
                </div>
              </div>
            </form>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h3 className="font-black text-xl mb-6 text-slate-900 pb-3 border-b border-slate-100">
                {t.checkout.orderSummary} ({cart.length})
              </h3>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-1 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-slate-50 p-3 rounded-2xl border border-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-sm text-slate-900 truncate">
                        {language === 'ar' && item.nameAr ? item.nameAr : item.name}
                      </h4>
                      <p className="text-xs font-bold text-emerald-700 mt-0.5">
                        {item.price} {t.products.mad}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-slate-200">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:text-red-500"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-black w-5 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-emerald-600"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <span>{t.checkout.subtotal}</span>
                  <span>{total} {t.products.mad}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <span>{t.checkout.shipping}</span>
                  <span className="text-emerald-700 font-extrabold uppercase text-xs">{t.checkout.free}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 flex justify-between items-end">
                <div>
                  <h4 className="font-black text-xl text-slate-900">{t.checkout.total}</h4>
                  <p className="text-[10px] text-slate-400 font-extrabold uppercase">{t.checkout.taxIncluded}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-700">{total} {t.products.mad}</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex gap-4">
              <div className="bg-emerald-600 text-white w-9 h-9 rounded-full flex items-center justify-center shrink-0">
                <Info size={18} />
              </div>
              <div>
                <h4 className="font-extrabold text-sm mb-1 text-slate-900">{t.checkout.whatNext}</h4>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {t.checkout.whatNextDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
