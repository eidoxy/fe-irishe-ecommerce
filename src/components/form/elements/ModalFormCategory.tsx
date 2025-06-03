import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Label from "../Label";
import Input from "../input/InputField";
import TextArea from "../input/TextArea";
import { CategoryFormData } from "../../../models/form.model";
import { Category } from "../../../models/category.model";


interface ModalFormCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: Category | null;
  mode?: 'create' | 'edit';
}

export default function ModalFormCategory({ 
  isOpen, 
  onClose, 
  onSuccess, 
  category = null,
  mode = 'create'
}: ModalFormCategoryProps) {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    description: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine if we're in edit mode
  const isEditMode = mode === 'edit' || category !== null;
  const modalTitle = isEditMode ? `Edit Category${category ? `: ${category.name}` : ''}` : 'Create New Category';
  const submitButtonText = isEditMode ? 'Update Category' : 'Create Category';
  const submitLoadingText = isEditMode ? 'Updating...' : 'Creating...';

  // Update form data when category changes or modal opens
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && category) {
        setFormData({
          name: category.name,
          description: category.description || ""
        });
      } else {
        // Reset form for create mode
        setFormData({
          name: "",
          description: ""
        });
      }
      
      // Clear errors when opening modal
      setErrors({
        name: "",
        description: ""
      });
    }
  }, [isOpen, category, isEditMode]);

  // Clear form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: "",
        description: ""
      });
      setErrors({
        name: "",
        description: ""
      });
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors = {
      name: "",
      description: ""
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Clear specific field error when user types
  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  // Handle input change
  const handleInputChange = (field: keyof CategoryFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    clearError(field as keyof typeof errors);
  };

  // Handle textarea change
  const handleTextAreaChange = (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
    clearError('description');
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const url = isEditMode && category 
        ? `http://47.128.233.82:3000/api/categories/update/${category.id}`
        : 'http://47.128.233.82:3000/api/categories/create';
      
      const method = isEditMode ? 'PUT' : 'POST';

      const payload = {
        name: formData.name.trim(),
        description: formData.description?.trim() || null // Send null if empty
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || response.statusText);
      }

      const result = await response.json();
      console.log(`Category ${isEditMode ? 'updated' : 'created'}:`, result);

      const successMessage = isEditMode 
        ? `Category "${formData.name}" updated successfully!`
        : `Category "${formData.name}" created successfully!`;

      toast.success(successMessage, {
        position: "top-right",
        autoClose: 3000,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} category:`, error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      const errorToastMessage = isEditMode 
        ? `Failed to update category: ${errorMessage}`
        : `Failed to create category: ${errorMessage}`;

      toast.error(errorToastMessage, {
        position: "top-right",
        autoClose: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative z-51 w-full max-w-md mx-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl transform transition-all">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {modalTitle}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  placeholder="Category name"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <TextArea
                  value={formData.description || ""}
                  onChange={handleTextAreaChange}
                  rows={4}
                  placeholder="Category description"
                  className={errors.description ? "border-red-500" : ""}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-4 py-2 text-white rounded-md font-medium transition-all duration-200 ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : isEditMode 
                        ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                        : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {submitLoadingText}
                    </div>
                  ) : (
                    submitButtonText
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}