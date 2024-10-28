export interface Product {
  id: string;
  product: string;
  rules: number;
  lastUpdate: string;
  status: string;
  image: string;
  [key: string]: unknown; // Cho phép truy cập vào các trường bằng khóa chuỗi
}

export interface Rule {
  buyFrom: string;
  buyTo: string;
  discount: string;
}
