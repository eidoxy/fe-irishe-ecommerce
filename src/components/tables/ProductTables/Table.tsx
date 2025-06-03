import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import { useNavigate } from "react-router-dom";

import { Product } from "../../../models/product.model";

type BadgeColor =
  | "primary"
  | "success"
  | "error"
  | "warning"
  | "info"
  | "light"
  | "dark";

const badgeColors: BadgeColor[] = [
  "primary",
  "success",
  "error",
  "warning",
  "info",
  "light",
  "dark",
];

const getRandomColor = (): BadgeColor => {
  const randomIndex = Math.floor(Math.random() * badgeColors.length);
  return badgeColors[randomIndex];
};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchProducts = () => {
    setLoading(true);
    setError(null);
    fetch("http://47.128.233.82:3000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.data)) { // Pastikan data.data adalah array
          setProducts(data.data);
        } else {
          console.warn("Fetched data is not in the expected format:", data);
          setProducts([]); // Atau tangani kasus data kosong/format salah
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEditProduct = (productId: number) => {
    navigate(`/products/edit/${productId}`);
  };

  const handleDeleteProduct = async (productId: number) => {
    const product = products.find(p => p.id === productId);
    const productName = product ? product.name : `Product ID: ${productId}`;

    const isDark = localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete <strong>"${productName}"</strong>.<br/>This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      focusCancel: true,
      buttonsStyling: false,
      background: isDark ? '#1f2937' : '#ffffff',
      color: isDark ? '#f3f4f6' : '#1f2937',
      customClass: {
        popup: `rounded-xl shadow-2xl border-0 ${isDark ? 'bg-gray-800' : 'bg-white'}`,
        title: `text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`,
        htmlContainer: `text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`,
        confirmButton: 'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-500/50 transform hover:scale-105 shadow-lg hover:shadow-xl mr-3',
        cancelButton: `${isDark ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-500/50 transform hover:scale-105 shadow-lg hover:shadow-xl`,
        actions: 'gap-4 mt-8',
        icon: 'border-orange-200 text-orange-600 scale-110'
      },
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const response = await fetch(
            `http://47.128.233.82:3000/api/products/delete/${productId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || response.statusText);
          }

          return response.json();
        } catch (error) {
          Swal.showValidationMessage(
            `<div class="text-red-500 text-sm font-semibold bg-red-50 p-3 rounded-lg border border-red-200">
              <svg class="w-5 h-5 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
              Request failed: ${error instanceof Error ? error.message : "Unknown error"}
            </div>`
          );
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (result.isConfirmed) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );

      await Swal.fire({
        title: 'Deleted!',
        html: `<div class="text-center">
          <div class="mb-4">
            <svg class="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <p><strong>"${productName}"</strong> has been deleted successfully.</p>
        </div>`,
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 3000,
        timerProgressBar: true,
        buttonsStyling: false,
        background: isDark ? '#1f2937' : '#ffffff',
        color: isDark ? '#f3f4f6' : '#1f2937',
        customClass: {
          popup: `rounded-xl shadow-2xl border-0 ${isDark ? 'bg-gray-800' : 'bg-white'}`,
          title: `text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`,
          htmlContainer: `text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`,
          confirmButton: 'bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500/50 transform hover:scale-105 shadow-lg hover:shadow-xl',
          timerProgressBar: 'bg-gradient-to-r from-green-500 to-green-600 h-1',
          icon: 'border-green-200 text-green-600 scale-110'
        }
      });
    }
  };

  if (loading) {
    return <p className="p-4 text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="p-4 text-center text-red-500">Error loading products: {error}</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Product</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Category</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 max-w-[200px]">Description</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Stock</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Price</TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {products.length === 0 && !loading ? (
                <TableRow key="no-products">
                    <TableCell className="px-5 py-4 text-center text-gray-500 dark:text-gray-400">
                        No products found.
                    </TableCell>
                </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-16 h-16 overflow-hidden">
                        <img
                          width={64}
                          height={64}
                          src={product.imageUrl || 'https://via.placeholder.com/64'}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {product.name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge variant="light" color={getRandomColor()}>
                      {product.categoryName || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                    {product.description}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {product.stock}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <span>${product.price ? product.price.toFixed(2) : '0.00'}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2 h-full">
                      <button
                        onClick={() => handleEditProduct(product.id)}
                        className="flex justify-center items-center px-3 py-1 text-xs font-medium text-amber-400 rounded hover:bg-amber-100 dark:text-amber-400 dark:hover:bg-amber-700 transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
                      >
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-edit">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                          <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                          <path d="M16 5l3 3" />
                        </svg>
                        <span className="ms-2">
                          Edit
                        </span>
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex justify-center items-center px-3 py-1 text-xs font-medium text-red-600 rounded hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                      >
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="16"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M4 7l16 0" />
                          <path d="M10 11l0 6" />
                          <path d="M14 11l0 6" />
                          <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                          <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                        <span className="ms-2">
                          Delete
                        </span>
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}