export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  price: number;
  description: string;
  descriptionAr?: string;
  category: string;
  categoryAr?: string;
  imageUrl: string;
  isBestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  whatsappNumber: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'contacted' | 'completed' | 'cancelled';
  date: string;
}

export interface VisitorMessage {
  id: string;
  customerName: string;
  whatsappNumber: string;
  message: string;
  type: 'complaint' | 'feedback' | 'inquiry';
  date: string;
  isRead: boolean;
}

export interface Stats {
  pendingOrders: number;
  totalRevenue: number;
  totalMessages: number;
  activeProducts: number;
}
