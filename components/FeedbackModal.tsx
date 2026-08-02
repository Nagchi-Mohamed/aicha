import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { useAppContext } from '../App';
import { VisitorMessage } from '../types';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const { t, dir } = useLanguage();
  const { addMessage } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'feedback' as 'feedback' | 'complaint' | 'inquiry',
    message: '',
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    const newMessage: VisitorMessage = {
      id: `MSG-${Date.now()}`,
      customerName: formData.name,
      whatsappNumber: formData.phone || 'Non renseigné',
      message: formData.message,
      type: formData.type,
      date: new Date().toISOString(),
      isRead: false,
    };

    addMessage(newMessage);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', phone: '', type: 'feedback', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className={`bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 text-white p-6 relative">
          <button
            onClick={onClose}
            className={`absolute top-4 ${dir === 'rtl' ? 'left-4' : 'right-4'} p-2 rounded-full hover:bg-white/10 transition-colors text-white`}
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-emerald-200">
              <MessageSquareHeart size={26} />
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">{t.feedbackModal.title}</h3>
              <p className="text-xs text-emerald-100 font-medium">{t.feedbackModal.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h4 className="text-xl font-extrabold text-slate-900 mb-2">{t.feedbackModal.successTitle}</h4>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-xs">{t.feedbackModal.successDesc}</p>
            <button
              onClick={handleReset}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              {t.feedbackModal.close}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5 uppercase tracking-wide">
                {t.feedbackModal.nameLabel} *
              </label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.feedbackModal.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5 uppercase tracking-wide">
                {t.feedbackModal.phoneLabel}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Ex: 06 00 00 00 00"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5 uppercase tracking-wide">
                {t.feedbackModal.typeLabel}
              </label>
              <select
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm outline-none transition-all bg-white"
              >
                <option value="feedback">{t.feedbackModal.typeFeedback}</option>
                <option value="complaint">{t.feedbackModal.typeComplaint}</option>
                <option value="inquiry">{t.feedbackModal.typeInquiry}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-slate-600 mb-1.5 uppercase tracking-wide">
                {t.feedbackModal.messageLabel} *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder={t.feedbackModal.messagePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 text-sm outline-none transition-all resize-none"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-600 font-extrabold text-sm hover:bg-slate-50 transition-colors"
              >
                {t.products.close}
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Send size={16} />
                {t.feedbackModal.submit}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
