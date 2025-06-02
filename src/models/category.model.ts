export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface CategoryResponse {
  status: string;
  message: string;
  data: Category[];
}

export interface SingleCategoryResponse {
  status: string;
  message: string;
  data: Category;
}

// * API Request Types
// TODO: Define the API request types for creating, updating, and deleting categories
export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest {
  id: number;
  name?: string;
  description?: string;
}

// * API Request For Forms
// TODO: Define the API request types for forms that will be used in the application
export interface CategorySelectOption {
  value: string;
  label: string;
}

export type CategoryToSelectOption = (categories: Category[]) => CategorySelectOption[];