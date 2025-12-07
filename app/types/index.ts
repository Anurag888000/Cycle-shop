export interface Bicycle {
  id?: string;
  name: string;
  price: number;
  description: string;
  features: string;
  image_url?: string; // Added field
  created_at?: string;
}

export interface ReceiptItem {
  id?: string;
  receipt_id?: string;
  item_name: string;
  price: number;
  quantity: number;
  amount: number;
}

export interface Receipt {
  id?: string;
  receipt_no: string;
  customer_name?: string;
  customer_phone?: string;
  subtotal: number;
  discount_percent: number;
  discount_amount: number;
  gst_enabled: boolean;
  gst_rate: number;
  gst_amount: number;
  grand_total: number;
  notes?: string;
  created_at?: string;
  items?: ReceiptItem[];
}
