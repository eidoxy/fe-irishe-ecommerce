export interface FormValidation {
  isValid: boolean;
  errors: string[];
}

// Product Form Data Interface
export interface ProductFormData {
  categoryId: number;
  name: string;
  description?: string | null;
  stock: number | string;
  price: number | string;
  imageFile: File | null;
}

export interface CategoryFormData {
  name: string;
  description?: string | null;
}

// Product From State Interface
export interface ProductFormState extends ProductFormData {
  categoryOptions: CategorySelectOption[];
  loadingCategories: boolean;
  categoryError: string | null;
}

export interface CategoryFormState extends CategoryFormData {
  isLoading: boolean;
  errors: {
    name: string;
    description: string;
  }
}

import { CategorySelectOption } from "./category.model";