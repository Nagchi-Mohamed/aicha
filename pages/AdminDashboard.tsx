import React, { useState, useRef } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  MessageSquare, 
  Trash2, 
  Edit,
  Globe,
  Sparkles,
  X,
  Clock,
  Menu as MenuIcon,
  MessageSquareHeart,
  UploadCloud,
  Image as ImageIcon,
  Link as LinkIcon,
  Check,
  Upload,
  Loader2
} from 'lucide-react';
import { useAppContext } from '../App';
import { useLanguage } from '../i18n/LanguageContext';
import { Product, VisitorMessage } from '../types';
import AichaLogo from '../components/AichaLogo';
import { uploadProductImage } from '../services/supabaseService';

const AdminDashboard: React.FC = () => {
  const { 
    products, setProducts, addProduct, updateProduct, deleteProduct,
    orders, updateOrderStatus, deleteOrder,
    messages, deleteMessage, markMessageRead
  } = useAppContext();

  const { t, language, setLanguage, dir } = useLanguage();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog' | 'messages' | 'analytics'>('orders');
  const [showAddModal, setShowAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  // Image Upload State & Ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<'upload' | 'url'>('upload');
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: '',
    nameAr: '',
    price: '',
    category: 'Aloe Vera',
    categoryAr: 'الألوفيرا',
    description: '',
    descriptionAr: '',
    imageUrl: '',
    isBestseller: false,
  });

  // Calculate metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const unreadMessagesCount = messages.filter(m => !m.isRead).length;

  const processSelectedFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert(language === 'ar' ? 'يرجى اختيار ملف صورة صالحة' : 'Veuillez sélectionner un fichier image valide.');
      return;
    }
    setIsUploadingImage(true);
    try {
      const publicUrl = await uploadProductImage(file);
      setProductForm(prev => ({ ...prev, imageUrl: publicUrl }));
    } catch (err) {
      console.error('Image upload failed:', err);
      alert(language === 'ar' ? 'فشل رفع الصورة، يرجى المحاولة مجددًا.' : "Échec du téléchargement de l'image. Veuillez réessayer.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processSelectedFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processSelectedFile(file);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return;

    const prodData: Product = {
      id: editingProductId || `PRD-${Date.now()}`,
      name: productForm.name,
      nameAr: productForm.nameAr || productForm.name,
      price: Number(productForm.price),
      category: productForm.category,
      categoryAr: productForm.categoryAr || productForm.category,
      description: productForm.description,
      descriptionAr: productForm.descriptionAr || productForm.description,
      imageUrl: productForm.imageUrl || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800',
      isBestseller: productForm.isBestseller,
    };

    if (editingProductId) {
      updateProduct(prodData);
    } else {
      addProduct(prodData);
    }

    setShowAddModal(false);
    setEditingProductId(null);
    resetProductForm();
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      nameAr: '',
      price: '',
      category: 'Aloe Vera',
      categoryAr: 'الألوفيرا',
      description: '',
      descriptionAr: '',
      imageUrl: '',
      isBestseller: false,
    });
  };

  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setProductForm({
      name: product.name,
      nameAr: product.nameAr || '',
      price: product.price.toString(),
      category: product.category,
      categoryAr: product.categoryAr || '',
      description: product.description,
      descriptionAr: product.descriptionAr || '',
      imageUrl: product.imageUrl,
      isBestseller: !!product.isBestseller,
    });
    setShowAddModal(true);
  };

  const handleContactCustomerWA = (phone: string, customerName: string) => {
    const cleanPhone = phone.replace(/\+|\s|-/g, '');
    const msg = language === 'ar'
      ? `مرحباً ${customerName}، معكم عائشة من متجر عائشة للرفاهية تواصلت معكم بشأن طلبكم.`
      : `Bonjour ${customerName}, c'est Aicha du magasin Aicha Wellness Store concernant votre commande.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  // Authentication View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-md text-center">
          <AichaLogo className="w-16 h-16 mx-auto mb-6" size={34} />
          
          <h2 className="text-2xl font-black text-slate-900 mb-2">{t.admin.loginTitle}</h2>
          <p className="text-xs text-slate-500 mb-6">Aicha Wellness Store - Dashboard</p>

          <form onSubmit={(e) => {
            e.preventDefault();
            if (password === 'FatiFer29') {
              setIsAuthenticated(true);
            } else {
              alert(language === 'ar' ? 'كلمة السر غير صحيحة' : 'Mot de passe incorrect');
            }
          }} className="space-y-4">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.admin.loginPlaceholder}
              className="w-full rounded-2xl border border-slate-200 p-4 text-center text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-slate-50"
            />
            
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-2xl font-extrabold shadow-lg shadow-emerald-600/25 transition-all text-sm"
            >
              {t.admin.loginBtn}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100">
            <button
              onClick={() => setIsAuthenticated(true)}
              className="text-xs font-extrabold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200"
            >
              ⚡ {t.admin.demoLogin}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen overflow-hidden bg-slate-50 text-slate-900 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
      
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — sticky in flex flow on desktop, slide-in on mobile */}
      <aside className={`
        flex-shrink-0 w-64 bg-white border-r border-slate-200 flex flex-col
        h-screen overflow-y-auto
        lg:sticky lg:top-0
        fixed top-0 bottom-0 z-40
        transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <AichaLogo showText={true} className="w-9 h-9" textClassName="text-xs sm:text-sm" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1 py-5">
          <SidebarButton 
            icon={<LayoutDashboard size={18} />} 
            label={t.admin.orders} 
            badge={pendingOrdersCount > 0 ? pendingOrdersCount : undefined}
            active={activeTab === 'orders'} 
            onClick={() => { setActiveTab('orders'); setSidebarOpen(false); }}
          />
          <SidebarButton 
            icon={<Package size={18} />} 
            label={t.admin.catalog} 
            badge={products.length}
            active={activeTab === 'catalog'} 
            onClick={() => { setActiveTab('catalog'); setSidebarOpen(false); }}
          />
          <SidebarButton 
            icon={<MessageSquareHeart size={18} />} 
            label={t.admin.messages} 
            badge={unreadMessagesCount > 0 ? unreadMessagesCount : undefined}
            active={activeTab === 'messages'} 
            onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }}
          />
          <SidebarButton 
            icon={<Sparkles size={18} />} 
            label={t.admin.analytics} 
            active={activeTab === 'analytics'} 
            onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-emerald-50 rounded-2xl p-3 flex items-center gap-3 border border-emerald-100">
            <img 
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200" 
              alt="Aicha" 
              className="w-10 h-10 rounded-xl object-cover border border-emerald-300 flex-shrink-0"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-black text-slate-900 truncate">Aicha (عائشة)</p>
              <p className="text-[10px] text-emerald-700 font-bold uppercase truncate">Propriétaire</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content — takes remaining space, never overlaps sidebar */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto overflow-x-hidden">
        
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-20 flex-shrink-0">
          {/* Left side: hamburger (mobile) + language toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 text-slate-700"
            >
              <MenuIcon size={20} />
            </button>
            <button
              onClick={() => setLanguage(language === 'fr' ? 'ar' : 'fr')}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-full text-xs font-extrabold transition-colors border border-slate-200"
            >
              <Globe size={14} />
              <span>{language === 'fr' ? 'العربية' : 'Français'}</span>
            </button>
          </div>

          {/* Right side: add product button */}
          <button 
            onClick={() => {
              setEditingProductId(null);
              resetProductForm();
              setShowAddModal(true);
            }}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all"
          >
            <PlusCircle size={16} />
            <span className="hidden sm:inline">{t.admin.addProduct}</span>
            <span className="sm:hidden">+</span>
          </button>
        </header>

        <div className="p-5 sm:p-8 lg:p-10 space-y-8 max-w-full">
          
          {/* Quick Metrics Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label={t.admin.pendingOrders} value={pendingOrdersCount} icon={<Clock size={20}/>} color="amber" />
            <StatCard label={t.admin.activeProducts} value={products.length} icon={<Package size={20}/>} color="emerald" />
            <StatCard label={t.admin.totalMessages} value={messages.length} icon={<MessageSquareHeart size={20}/>} color="purple" />
            <StatCard label={t.admin.totalRevenue} value={`${totalRevenue} MAD`} icon={<Sparkles size={20}/>} color="blue" />
          </section>

          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">{t.admin.recentOrders}</h2>
                  <p className="text-xs text-slate-500 font-medium">{t.admin.manageOrders}</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                {orders.length === 0 ? (
                  <div className="p-12 text-center text-slate-500">
                    <p className="text-sm font-bold">{t.admin.noOrders}</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                          <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">{t.admin.customerInfo}</th>
                          <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">{t.admin.orderedItems}</th>
                          <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">{t.admin.totalAmount}</th>
                          <th className="px-6 py-4 text-xs font-black uppercase text-slate-500">{t.admin.status}</th>
                          <th className="px-6 py-4 text-xs font-black uppercase text-slate-500 text-center">{t.admin.actions}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {orders.map(order => (
                          <tr key={order.id} className="hover:bg-slate-50/80 transition-colors">
                            
                            <td className="px-6 py-4">
                              <div className="font-extrabold text-sm text-slate-900">{order.customerName}</div>
                              <div className="text-xs font-bold text-emerald-700 mt-0.5">{order.whatsappNumber}</div>
                              <div className="text-xs text-slate-500 truncate max-w-xs mt-0.5">{order.address}</div>
                            </td>

                            <td className="px-6 py-4">
                              <div className="text-xs font-medium space-y-1">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="flex gap-1.5">
                                    <span className="font-bold text-emerald-600">{item.quantity}x</span>
                                    <span className="text-slate-800">{language === 'ar' && item.nameAr ? item.nameAr : item.name}</span>
                                  </div>
                                ))}
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-black text-slate-900 border border-slate-200">
                                {order.total} {t.products.mad}
                              </span>
                            </td>

                            <td className="px-6 py-4">
                              <select
                                value={order.status}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                                className={`text-xs font-extrabold px-3 py-1 rounded-full border outline-none cursor-pointer ${
                                  order.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                    : order.status === 'contacted'
                                    ? 'bg-blue-100 text-blue-800 border-blue-300'
                                    : order.status === 'cancelled'
                                    ? 'bg-red-100 text-red-800 border-red-300'
                                    : 'bg-amber-100 text-amber-800 border-amber-300'
                                }`}
                              >
                                <option value="pending">{t.admin.orderStatusPending}</option>
                                <option value="contacted">{t.admin.orderStatusContacted}</option>
                                <option value="completed">{t.admin.orderStatusCompleted}</option>
                                <option value="cancelled">{t.admin.orderStatusCancelled}</option>
                              </select>
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleContactCustomerWA(order.whatsappNumber, order.customerName)}
                                  className="p-2 bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl transition-all"
                                  title={t.admin.contactCustomer}
                                >
                                  <MessageSquare size={16} />
                                </button>

                                <button
                                  onClick={() => deleteOrder(order.id)}
                                  className="p-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                  title={t.admin.delete}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* TAB 2: PRODUCT CATALOG */}
          {activeTab === 'catalog' && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">{t.admin.activeCatalog}</h2>
                  <p className="text-xs text-slate-500 font-medium">{t.admin.modifyCatalog}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
                    <div className="h-44 w-full bg-slate-100 overflow-hidden relative">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      {product.isBestseller && (
                        <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                          {t.products.bestseller}
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1">
                          {language === 'ar' && product.nameAr ? product.nameAr : product.name}
                        </h4>
                        <span className="font-black text-emerald-700 text-xs shrink-0">{product.price} {t.products.mad}</span>
                      </div>
                      <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider mb-2">
                        {language === 'ar' && product.categoryAr ? product.categoryAr : product.category}
                      </span>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed flex-1">
                        {language === 'ar' && product.descriptionAr ? product.descriptionAr : product.description}
                      </p>
                      <div className="flex gap-2 border-t border-slate-100 pt-3">
                        <button
                          onClick={() => handleEditClick(product)}
                          className="flex-1 bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-700 py-2 rounded-xl text-xs font-extrabold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Edit size={14} />
                          <span>{t.admin.edit}</span>
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                          title={t.admin.delete}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* TAB 3: VISITOR MESSAGES & COMPLAINTS */}
          {activeTab === 'messages' && (
            <section>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-black tracking-tight">{t.admin.messages}</h2>
                  <p className="text-xs text-slate-500 font-medium">Réclamations, questions et retours des visiteurs</p>
                </div>
              </div>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center text-slate-500">
                    <p className="text-sm font-bold">{t.admin.noMessages}</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div
                      key={msg.id}
                      className={`bg-white p-6 rounded-3xl border transition-all ${
                        msg.isRead ? 'border-slate-200' : 'border-emerald-300 shadow-md bg-emerald-50/20'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                            msg.type === 'complaint' ? 'bg-red-100 text-red-700' :
                            msg.type === 'inquiry' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                          }`}>
                            {msg.type}
                          </span>
                          <h4 className="font-extrabold text-sm text-slate-900">{msg.customerName}</h4>
                          <span className="text-xs text-slate-400">({msg.whatsappNumber})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {!msg.isRead && (
                            <button
                              onClick={() => markMessageRead(msg.id)}
                              className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold hover:bg-emerald-200"
                            >
                              {t.admin.markRead}
                            </button>
                          )}
                          <button
                            onClick={() => handleContactCustomerWA(msg.whatsappNumber, msg.customerName)}
                            className="p-2 bg-emerald-100 text-emerald-700 rounded-xl hover:bg-emerald-600 hover:text-white"
                          >
                            <MessageSquare size={16} />
                          </button>
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-2 text-red-400 hover:bg-red-50 rounded-xl"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 font-medium">
                        "{msg.message}"
                      </p>
                      <span className="text-[10px] text-slate-400 mt-2 block font-bold">
                        {new Date(msg.date).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* TAB 4: ANALYTICS & STATS */}
          {activeTab === 'analytics' && (
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-black tracking-tight">{t.admin.analytics}</h2>
                <p className="text-xs text-slate-500 font-medium">Vue d'ensemble des ventes et performances</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="font-extrabold text-base mb-4 text-slate-900">Répartition des Commandes par Statut</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>En attente ({pendingOrdersCount})</span>
                        <span>{orders.length ? Math.round((pendingOrdersCount / orders.length) * 100) : 0}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: `${orders.length ? (pendingOrdersCount / orders.length) * 100 : 0}%` }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold mb-1">
                        <span>Livrées / Terminées ({orders.filter(o => o.status === 'completed').length})</span>
                        <span>{orders.length ? Math.round((orders.filter(o => o.status === 'completed').length / orders.length) * 100) : 0}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                        <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${orders.length ? (orders.filter(o => o.status === 'completed').length / orders.length) * 100 : 0}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-center text-center">
                  <Sparkles size={40} className="text-emerald-600 mx-auto mb-3" />
                  <h3 className="font-black text-2xl text-slate-900">{totalRevenue} MAD</h3>
                  <p className="text-xs text-slate-500 font-extrabold uppercase mt-1">Revenu Brut Estimé des Commandes</p>
                </div>
              </div>
            </section>
          )}

        </div>
      </main>

      {/* Modal Overlay for Product Add / Edit */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col my-auto border border-slate-100">
            
            {/* Modal Header */}
            <div className="p-6 sm:px-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/60">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {editingProductId ? t.admin.edit : t.admin.addProduct}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {language === 'ar' ? 'أدخل تفاصيل المنتج للخصم أو العرض في المتجر' : 'Remplissez les informations du produit ci-dessous'}
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveProduct} className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
              
              {/* Product Image Section */}
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <ImageIcon size={16} className="text-emerald-600" />
                    <span>{language === 'ar' ? 'صورة المنتج' : 'Image du Produit'}</span>
                  </label>

                  {/* Mode switcher (Upload File vs Image URL) */}
                  <div className="flex bg-slate-200/80 p-1 rounded-xl gap-1">
                    <button
                      type="button"
                      onClick={() => setImageInputMode('upload')}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                        imageInputMode === 'upload'
                          ? 'bg-white text-emerald-700 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {language === 'ar' ? 'رفع صورة' : 'Télécharger'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageInputMode('url')}
                      className={`px-3 py-1 rounded-lg text-xs font-extrabold transition-all ${
                        imageInputMode === 'url'
                          ? 'bg-white text-emerald-700 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {language === 'ar' ? 'رابط URL' : 'Lien URL'}
                    </button>
                  </div>
                </div>

                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {imageInputMode === 'upload' ? (
                  <div>
                    {productForm.imageUrl ? (
                      /* Image Preview Card */
                      <div className="relative rounded-2xl overflow-hidden border border-emerald-300 bg-white p-3 flex items-center gap-4 shadow-sm">
                        <img
                          src={productForm.imageUrl}
                          alt="Product Preview"
                          className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full mb-1">
                            <Check size={10} />
                            {language === 'ar' ? 'تم اختيار الصورة' : 'Image prête'}
                          </span>
                          <p className="text-xs font-bold text-slate-700 truncate">
                            {productForm.imageUrl.startsWith('data:') ? 'Image importée depuis votre appareil' : productForm.imageUrl}
                          </p>
                        </div>
                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1 border border-emerald-200"
                          >
                            <Upload size={12} />
                            <span>{language === 'ar' ? 'تغيير' : 'Changer'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setProductForm(prev => ({ ...prev, imageUrl: '' }))}
                            className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded-xl text-xs font-extrabold transition-colors flex items-center gap-1 border border-red-200"
                          >
                            <Trash2 size={12} />
                            <span>{language === 'ar' ? 'حذف' : 'Effacer'}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Drag & Drop Upload Zone */
                      <div
                        onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-200 ${
                          isUploadingImage
                            ? 'border-emerald-400 bg-emerald-50 cursor-wait'
                            : isDragging
                            ? 'border-emerald-500 bg-emerald-100/60 scale-[1.01] cursor-pointer'
                            : 'border-emerald-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 cursor-pointer'
                        }`}
                      >
                        {isUploadingImage ? (
                          <>
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                              <Loader2 size={24} className="animate-spin" />
                            </div>
                            <h4 className="text-sm font-black text-emerald-700 mb-1">
                              {language === 'ar' ? 'جارٍ رفع الصورة…' : 'Téléchargement en cours…'}
                            </h4>
                            <p className="text-xs text-slate-400 font-medium">
                              {language === 'ar' ? 'يرجى الانتظار' : 'Veuillez patienter'}
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm">
                              <UploadCloud size={24} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900 mb-1">
                              {language === 'ar' ? 'اضغط هنا لرفع صورة من جهازك' : 'Cliquez ici pour choisir une photo'}
                            </h4>
                            <p className="text-xs text-slate-500 font-medium">
                              {language === 'ar' ? 'أو اسحب الصورة وأسقطها هنا (PNG, JPG, WEBP)' : "Ou glissez-déposez l'image depuis votre ordinateur / téléphone"}
                            </p>
                          </>
                        )}
                      </div>
                    )}

                  </div>
                ) : (
                  /* URL Input */
                  <div>
                    <div className="relative flex items-center">
                      <LinkIcon size={16} className="absolute left-4 text-slate-400" />
                      <input
                        type="url"
                        placeholder="https://images.unsplash.com/photo-..."
                        value={productForm.imageUrl}
                        onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-white"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium mt-1.5">
                      {language === 'ar' ? 'أدخل رابط الصورة مباشرة من الإنترنت' : 'Collez le lien direct de l\'image web'}
                    </p>
                  </div>
                )}
              </div>

              {/* Names Input Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                    {t.admin.productName} *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Ex: Gel d'Aloe Vera"
                    value={productForm.name}
                    onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-slate-50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                    {t.admin.productNameAr}
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: جل الألوفيرا"
                    value={productForm.nameAr}
                    onChange={e => setProductForm({ ...productForm, nameAr: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-slate-50"
                  />
                </div>
              </div>

              {/* Price & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                    {t.admin.price} *
                  </label>
                  <div className="relative flex items-center">
                    <input
                      required
                      type="number"
                      placeholder="295"
                      value={productForm.price}
                      onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-extrabold outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-slate-50"
                    />
                    <span className="absolute right-4 text-xs font-black text-emerald-700">MAD</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                    {t.admin.category}
                  </label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-slate-50 cursor-pointer"
                  >
                    <option value="Aloe Vera">Aloe Vera</option>
                    <option value="Produits d'Abeille">Produits d'Abeille</option>
                    <option value="Soins de la Peau">Soins de la Peau</option>
                    <option value="Soins Personnels">Soins Personnels</option>
                    <option value="Nutrition & Santé">Nutrition & Santé</option>
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  {t.admin.description} *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Description du produit en français..."
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-slate-50 resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                  {t.admin.descriptionAr}
                </label>
                <textarea
                  rows={3}
                  placeholder="وصف المنتج باللغة العربية..."
                  value={productForm.descriptionAr}
                  onChange={e => setProductForm({ ...productForm, descriptionAr: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 bg-slate-50 resize-none leading-relaxed"
                />
              </div>

              {/* Bestseller Checkbox */}
              <div className="flex items-center gap-3 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80">
                <input
                  type="checkbox"
                  id="bestseller"
                  checked={productForm.isBestseller}
                  onChange={e => setProductForm({ ...productForm, isBestseller: e.target.checked })}
                  className="w-5 h-5 accent-emerald-600 rounded cursor-pointer"
                />
                <label htmlFor="bestseller" className="text-xs font-extrabold text-slate-800 cursor-pointer select-none">
                  {t.products.bestseller} (Marquer comme produit phare / Meilleure vente)
                </label>
              </div>

              {/* Footer Actions */}
              <div className="flex gap-4 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3.5 border border-slate-200 hover:bg-slate-100 rounded-2xl text-xs font-extrabold text-slate-600 transition-colors"
                >
                  {t.admin.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-extrabold shadow-lg shadow-emerald-600/25 active:scale-95 transition-all"
                >
                  {t.admin.publish}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

const SidebarButton = ({ icon, label, badge, active, onClick }: { icon: any, label: string, badge?: number, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-extrabold text-xs transition-all ${
      active
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {badge !== undefined && (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
        active ? 'bg-white text-emerald-800' : 'bg-slate-200 text-slate-700'
      }`}>
        {badge}
      </span>
    )}
  </button>
);

const StatCard = ({ label, value, icon, color }: { label: string, value: any, icon: any, color: string }) => {
  const colorMap: any = {
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    purple: 'bg-purple-100 text-purple-700',
    blue: 'bg-blue-100 text-blue-700'
  };

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] font-extrabold text-slate-400 uppercase">{label}</h4>
        <p className="text-xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
