import { supabase } from '../lib/supabaseClient';
import { Product, Order, VisitorMessage } from '../types';

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Convert DB row (snake_case) → Product (camelCase) */
function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    nameAr: row.name_ar as string | undefined,
    price: Number(row.price),
    description: row.description as string,
    descriptionAr: row.description_ar as string | undefined,
    category: row.category as string,
    categoryAr: row.category_ar as string | undefined,
    imageUrl: row.image_url as string,
    isBestseller: row.is_bestseller as boolean | undefined,
  };
}

/** Convert Product → DB row (snake_case) */
function productToRow(p: Product) {
  return {
    id: p.id,
    name: p.name,
    name_ar: p.nameAr ?? null,
    price: p.price,
    description: p.description,
    description_ar: p.descriptionAr ?? null,
    category: p.category,
    category_ar: p.categoryAr ?? null,
    image_url: p.imageUrl,
    is_bestseller: p.isBestseller ?? false,
  };
}

/** Convert DB row → Order */
function rowToOrder(row: Record<string, unknown>): Order {
  return {
    id: row.id as string,
    customerName: row.customer_name as string,
    whatsappNumber: row.whatsapp_number as string,
    address: row.address as string,
    items: row.items as Order['items'],
    total: Number(row.total),
    status: row.status as Order['status'],
    date: row.date as string,
  };
}

/** Convert DB row → VisitorMessage */
function rowToMessage(row: Record<string, unknown>): VisitorMessage {
  return {
    id: row.id as string,
    customerName: row.customer_name as string,
    whatsappNumber: row.whatsapp_number as string,
    message: row.message as string,
    type: row.type as VisitorMessage['type'],
    date: row.date as string,
    isRead: row.is_read as boolean,
  };
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(rowToProduct);
}

export async function insertProduct(product: Product): Promise<void> {
  const { error } = await supabase.from('products').insert(productToRow(product));
  if (error) throw error;
}

export async function upsertProduct(product: Product): Promise<void> {
  const { error } = await supabase.from('products').upsert(productToRow(product));
  if (error) throw error;
}

export async function updateProductInDB(product: Product): Promise<void> {
  const { error } = await supabase
    .from('products')
    .update(productToRow(product))
    .eq('id', product.id);
  if (error) throw error;
}

export async function deleteProductFromDB(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) throw error;
}

// ─── Image Upload ─────────────────────────────────────────────────────────────

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop() ?? 'jpg';
  const filename = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from('product-images')
    .upload(filename, file, { upsert: false, contentType: file.type });

  if (error) throw error;

  const { data } = supabase.storage.from('product-images').getPublicUrl(filename);
  return data.publicUrl;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToOrder);
}

export async function insertOrder(order: Order): Promise<void> {
  const { error } = await supabase.from('orders').insert({
    id: order.id,
    customer_name: order.customerName,
    whatsapp_number: order.whatsappNumber,
    address: order.address,
    items: order.items,
    total: order.total,
    status: order.status,
    date: order.date,
  });
  if (error) throw error;
}

export async function updateOrderStatusInDB(id: string, status: Order['status']): Promise<void> {
  const { error } = await supabase.from('orders').update({ status }).eq('id', id);
  if (error) throw error;
}

export async function deleteOrderFromDB(id: string): Promise<void> {
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) throw error;
}

// ─── Messages ────────────────────────────────────────────────────────────────

export async function fetchMessages(): Promise<VisitorMessage[]> {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToMessage);
}

export async function insertMessage(msg: VisitorMessage): Promise<void> {
  const { error } = await supabase.from('messages').insert({
    id: msg.id,
    customer_name: msg.customerName,
    whatsapp_number: msg.whatsappNumber,
    message: msg.message,
    type: msg.type,
    date: msg.date,
    is_read: msg.isRead,
  });
  if (error) throw error;
}

export async function deleteMessageFromDB(id: string): Promise<void> {
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) throw error;
}

export async function markMessageReadInDB(id: string): Promise<void> {
  const { error } = await supabase.from('messages').update({ is_read: true }).eq('id', id);
  if (error) throw error;
}
