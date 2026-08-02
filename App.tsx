import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Storefront from './pages/Storefront';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import { Product, CartItem, Order, VisitorMessage } from './types';
import { INITIAL_PRODUCTS } from './constants';
import { LanguageProvider } from './i18n/LanguageContext';
import PageFrame from './components/PageFrame';
import {
  fetchProducts, insertProduct, updateProductInDB, deleteProductFromDB,
  fetchOrders, insertOrder, updateOrderStatusInDB, deleteOrderFromDB,
  fetchMessages, insertMessage, deleteMessageFromDB, markMessageReadInDB,
  upsertProduct,
} from './services/supabaseService';

interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  deleteOrder: (id: string) => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  messages: VisitorMessage[];
  addMessage: (msg: VisitorMessage) => void;
  deleteMessage: (id: string) => void;
  markMessageRead: (id: string) => void;
  isLoading: boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<VisitorMessage[]>([]);

  // Cart stays in localStorage — it's session-local
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aicha_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('aicha_cart', JSON.stringify(cart));
  }, [cart]);

  // ── Bootstrap: load all data from Supabase ──────────────────────────────
  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Clean up legacy localStorage keys
        localStorage.removeItem('ferdaous_products');
        localStorage.removeItem('ferdaous_cart');
        localStorage.removeItem('ferdaous_orders');
        localStorage.removeItem('aicha_products');
        localStorage.removeItem('aicha_orders');
        localStorage.removeItem('aicha_messages');

        const [dbProducts, dbOrders, dbMessages] = await Promise.all([
          fetchProducts(),
          fetchOrders(),
          fetchMessages(),
        ]);

        // Auto-seed products table if it's empty
        if (dbProducts.length === 0) {
          await Promise.all(INITIAL_PRODUCTS.map((p) => upsertProduct(p)));
          setProducts(INITIAL_PRODUCTS);
        } else {
          setProducts(dbProducts);
        }

        setOrders(dbOrders);
        setMessages(dbMessages);
      } catch (err) {
        console.error('Supabase bootstrap error:', err);
        // Fallback to constants so the UI never breaks
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setIsLoading(false);
      }
    };
    bootstrap();
  }, []);

  // ── Cart operations ─────────────────────────────────────────────────────
  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setCart((prev) => prev.map((item) => item.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  // ── Order operations ────────────────────────────────────────────────────
  const addOrder = async (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    try { await insertOrder(order); } catch (e) { console.error('insertOrder:', e); }
  };

  const updateOrderStatus = async (id: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    try { await updateOrderStatusInDB(id, status); } catch (e) { console.error('updateOrderStatus:', e); }
  };

  const deleteOrder = async (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    try { await deleteOrderFromDB(id); } catch (e) { console.error('deleteOrder:', e); }
  };

  // ── Product operations ──────────────────────────────────────────────────
  const addProduct = async (product: Product) => {
    setProducts((prev) => [product, ...prev]);
    try { await insertProduct(product); } catch (e) { console.error('insertProduct:', e); }
  };

  const updateProduct = async (updatedProduct: Product) => {
    setProducts((prev) => prev.map((p) => p.id === updatedProduct.id ? updatedProduct : p));
    try { await updateProductInDB(updatedProduct); } catch (e) { console.error('updateProduct:', e); }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try { await deleteProductFromDB(id); } catch (e) { console.error('deleteProduct:', e); }
  };

  // ── Message operations ──────────────────────────────────────────────────
  const addMessage = async (msg: VisitorMessage) => {
    setMessages((prev) => [msg, ...prev]);
    try { await insertMessage(msg); } catch (e) { console.error('insertMessage:', e); }
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    try { await deleteMessageFromDB(id); } catch (e) { console.error('deleteMessage:', e); }
  };

  const markMessageRead = async (id: string) => {
    setMessages((prev) => prev.map((m) => m.id === id ? { ...m, isRead: true } : m));
    try { await markMessageReadInDB(id); } catch (e) { console.error('markMessageRead:', e); }
  };

  return (
    <LanguageProvider>
      <AppContext.Provider value={{
        products, setProducts, addProduct, updateProduct, deleteProduct,
        cart, addToCart, updateCartQuantity, removeFromCart, clearCart,
        orders, addOrder, updateOrderStatus, deleteOrder,
        messages, addMessage, deleteMessage, markMessageRead,
        isLoading,
      }}>
        <HashRouter>
          <PageFrame>
            {isLoading ? (
              <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-emerald-50 to-teal-100">
                <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                <p className="text-emerald-700 font-semibold text-lg tracking-wide">
                  Chargement de la boutique…
                </p>
              </div>
            ) : (
              <Routes>
                <Route path="/" element={<Storefront />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </PageFrame>
        </HashRouter>
      </AppContext.Provider>
    </LanguageProvider>
  );
};

export default App;
