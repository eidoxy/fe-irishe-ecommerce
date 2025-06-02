export interface FormValidation {
  isValid: boolean;
  errors: string[];
}

// Product From Data Interface
export interface ProductFormData {
  categoryId: number;
  name: string;
  description?: string | null;
  stock: number | string;
  price: number | string;
  imageFile: File | null;
}

// Product From State Interface
export interface ProductFormState extends ProductFormData {
  categoryOptions: CategorySelectOption[];
  loadingCategories: boolean;
  categoryError: string | null;
}

import { CategorySelectOption } from "./category.model";