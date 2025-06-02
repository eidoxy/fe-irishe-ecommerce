export interface Product {
  id: number;
  categoryId: number;
  categoryName: string;
  name: string;
  description?: string;
  stock: number;
  price: number;
  imageUrl: string;
}

export interface ProductResponse {
  status: string;
  message: string;
  data: Product[];
}

export interface SingleProductResponse {
  status: string;
  message: string;
  data: Product;
}

// * API Request Types
// TODO: Define the API request types for creating, updating, and deleting products
export interface CreateProductRequest {
  categoryId: number;
  name: string;
  description?: string;
  stock: number;
  price: number;
  imageFile?: File | null;
}

export interface UpdateProductRequest {
  id: number;
  categoryId?: number;
  name?: string;
  description?: string;
  stock?: number;
  price?: number;
  imageFile?: File | null;
}