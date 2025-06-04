import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import TextArea from "../input/TextArea.tsx";
import Select from "../Select.tsx";
import DropzoneComponent from "../input/DropZone.tsx";

import { Product } from "../../../models/product.model.ts";

import {
  CategoryResponse,
  CategorySelectOption
}  from "../../../models/category.model.ts";

import {
  ProductFormData,
} from "../../../models/form.model.ts";

import { AuthService } from "../../../utils/authService.ts";
interface FormEditProductProps {
  productId?: number | null;
}

export default function FormEditProduct({ productId }: FormEditProductProps) {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ProductFormData>({
    categoryId: 0,
    name: "",
    description: null,
    stock: "",
    price: "",
    imageFile: null,
  });

  const [existingImageUrl, setExistingImageUrl] = useState<string>("");
  const [categoryOptions, setCategoryOptions] = useState<CategorySelectOption[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [loadingProduct, setLoadingProduct] = useState<boolean>(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [productError, setProductError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    category: "",
    stock: "",
    price: "",
    image: ""
  });

  // Fetch product data if productId is provided
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        setProductError("No product ID provided");
        setLoadingProduct(false);
        return;
      }

      // Check authentication before fetching product
      if (!AuthService.isAuthenticated()) {
        toast.error("You must be logged in to edit products.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate('/login');
        return;
      }

      setLoadingProduct(true);
      setProductError(null);
      
      try {
        const response = await AuthService.authenticatedFetch(`https://be-irishe.seido.my.id/api/products/${productId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }

        const result = await response.json();
        const product: Product = result.data;

        setFormData({
          categoryId: product.categoryId,
          name: product.name,
          description: product.description,
          stock: String(product.stock),
          price: String(product.price),
          imageFile: null,
        });
        
        setExistingImageUrl(product.imageUrl);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProductError(error instanceof Error ? error.message : "An unknown error occurred");

        // Handle authentication errors
        if (error instanceof Error && error.message.includes('401')) {
          toast.error("Session expired. Please sign in again.", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate('/signin');
        }
      } finally {
        setLoadingProduct(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);
  
  // Fetch categories for the select input
  useEffect(() => {
    const fetchCategories = async () => {
      // Check authentication before fetching
      if (!AuthService.isAuthenticated()) {
        toast.error("Please sign in to access this page.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate('/signin');
        return;
      }
      
      setLoadingCategories(true);
      setCategoryError(null);
      try {
        // Use AuthService for authenticated API call
        const response = await AuthService.authenticatedFetch("https://be-irishe.seido.my.id/api/categories");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }

        const result: CategoryResponse = await response.json();
        const categoryData: CategorySelectOption[] = result.data.map(category => ({
          value: String(category.id),
          label: category.name,
        }));

        setCategoryOptions(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryError(error instanceof Error ? error.message : "An unknown error occurred");

        // Handle authentication errors
        if (error instanceof Error && error.message.includes('401')) {
          toast.error("Session expired. Please sign in again.", {
            position: "top-right",
            autoClose: 3000,
          });
          navigate('/signin');
        }
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [navigate]);

  // Form validation function
  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      description: "",
      category: "",
      stock: "",
      price: "",
      image: ""
    };

    let isValid = true;

    // Validate each field
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
      isValid = false;
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
      isValid = false;
    }

    if (!formData.categoryId || formData.categoryId === 0) {
      newErrors.category = "Please select a category";
      isValid = false;
    }

    if (!formData.stock || Number(formData.stock) < 0) {
      newErrors.stock = "Valid stock number is required";
      isValid = false;
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Valid price is required";
      isValid = false;
    }

    if (!formData.imageFile && !existingImageUrl) {
      newErrors.image = "Product image is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Clear specific field error when user types
  const clearError = (field: string) => {
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // FormData for API submission
  const createApiFormData = (): FormData => {
    const apiFormData = new FormData();
    apiFormData.append("name", formData.name.trim());
    apiFormData.append("description", formData.description?.trim() || "");
    apiFormData.append("categoryId", String(formData.categoryId));
    apiFormData.append("stock", String(formData.stock));
    apiFormData.append("price", String(formData.price));
    if (formData.imageFile) {
      apiFormData.append("image", formData.imageFile);
    }

    return apiFormData;
  };

  // Update form data helper function
  const updateFormData = (updates: Partial<ProductFormData>): void => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Event handlers
  const handleSelectChange = (value: string): void => {
    const selectedOption = categoryOptions.find(option => option.value === value);
    updateFormData({
      categoryId: selectedOption ? Number(selectedOption.value) : 0
    });
    clearError('category');
  };

  const handleFileSelect = (file: File | null): void => {
    updateFormData({ imageFile: file });
    clearError('image');
  };

  const handleInputChange = (field: keyof ProductFormData) => (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    let value: string | number = e.target.value;

    if (field === 'stock' || field === 'price') {
      value = e.target.value;
    }

    updateFormData({ [field]: value });
    clearError(field);
  };

  const handleTextAreaChange = (value: string): void => {
    updateFormData({ description: value });
    clearError('description');
  };

  // Function handle form submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    // Check authentication before submission
    if (!AuthService.isAuthenticated()) {
      toast.error("Session expired. Please sign in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate('/signin');
      return;
    }
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const apiFormData = createApiFormData();

      // Get authentication headers
      const token = AuthService.getToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`https://be-irishe.seido.my.id/api/products/update/${productId}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: apiFormData,
      });

      // Handle authentication errors
      if (response.status === 401) {
        AuthService.logout(); // Clear invalid token
        toast.error("Session expired. Please sign in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate('/signin');
        return;
      }

      if (response.status === 403) {
        toast.error("You don't have permission to edit this product.", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: "Failed to parse error response from server." 
        }));
        throw new Error(errorData.message || errorData.error || response.statusText);
      }

      const result = await response.json();
      console.log("Product created:", result);

      toast.success(`🎉 Product "${formData.name}" created successfully!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
      });

      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      // Handle specific error cases
      if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
        AuthService.logout();
        toast.error("Session expired. Please sign in again.", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate('/signin');
      } else {
        toast.error(`❌ Failed to update product: ${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingProduct) {
    return <div className="p-4 text-center">Loading product data...</div>;
  }

  if (productError) {
    return <div className="p-4 text-center text-red-500">Error: {productError}</div>;
  }
  
  return (
    <ComponentCard title="Create Product">
      <form onSubmit={handleSubmit} className="space-y-6">
        {existingImageUrl && (
          <div className="mb-4">
            <Label>Current Image</Label>
            <div className="mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg">
              <img 
                src={existingImageUrl} 
                alt="Current product" 
                className="max-w-full h-48 object-cover rounded-lg mx-auto"
                onError={(e) => {
                  console.error("Failed to load image:", existingImageUrl);
                  e.currentTarget.style.display = 'none';
                }}
              />
              <p className="text-sm text-gray-500 text-center mt-2">Current product image</p>
            </div>
          </div>
        )}
        
        <div>
          <DropzoneComponent 
            onFileSelect={handleFileSelect} 
            selectedFile={formData.imageFile}
          />
          {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            type="text" 
            id="name" 
            value={formData.name} 
            onChange={handleInputChange('name')} 
            placeholder="Your product name"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <TextArea 
            value={formData.description || ""} 
            onChange={handleTextAreaChange} 
            rows={6}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>
        <div>
          <Label>Category</Label>
          {loadingCategories && <p>Loading categories...</p>}
          {categoryError && <p className="text-red-500">Error: {categoryError}</p>}
          {!loadingCategories && !categoryError && (
            <>
              <Select
                options={categoryOptions}
                placeholder="Select an option"
                onChange={handleSelectChange}
                value={formData.categoryId ? String(formData.categoryId) : ""}
                className={`dark:bg-dark-900 ${errors.category ? "border-red-500" : ""}`}
              />
              {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
            </>
          )}
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input 
            type="number" 
            id="stock" 
            value={formData.stock} 
            onChange={handleInputChange('stock')} 
            min="0" 
            placeholder="0"
            className={errors.stock ? "border-red-500" : ""}
          />
          {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input 
            type="number" 
            id="price" 
            value={formData.price} 
            onChange={handleInputChange('price')} 
            min="0.01" 
            step={0.01} 
            placeholder="0"
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`px-4 py-2 text-white rounded font-medium transition-all duration-200 ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg'
          }`}
        >
          {isSubmitting ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </ComponentCard>
  );
}