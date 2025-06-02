import { useEffect, useState } from "react";
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
    if (window.confirm(`Are you sure you want to delete product ID: ${productId}?`)) {
      try {
        const response = await fetch(
          `http://47.128.233.82:3000/api/products/delete/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Hapus produk dari state untuk update UI secara instan
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
          alert("Product deleted successfully!");
        } else {
          // Tangani error dari API
          const errorData = await response.json().catch(() => null); // Coba parse error JSON
          console.error("Failed to delete product:", response.status, errorData);
          alert(`Failed to delete product: ${errorData?.message || response.statusText}`);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert(`An error occurred while deleting the product: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
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