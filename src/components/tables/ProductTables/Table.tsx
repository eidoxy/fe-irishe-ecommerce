import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table"; // Pastikan path ini benar
import Badge from "../../ui/badge/Badge"; // Pastikan path ini benar
// import { useNavigate } from "react-router-dom"; // Uncomment jika Anda menggunakan React Router untuk navigasi edit

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  categoryId: number; // Tambahkan categoryId jika diperlukan untuk Edit
  categoryName: string;
}

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

  // const navigate = useNavigate(); // Uncomment jika Anda menggunakan React Router

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
    console.log("Edit product with ID:", productId);
    // Di sini Anda akan menangani navigasi ke halaman edit atau membuka modal.
    // Contoh dengan React Router:
    // navigate(`/admin/products/edit/${productId}`);

    // Untuk implementasi penuh:
    // 1. Buat route baru untuk halaman edit produk (misalnya /edit-product/:id).
    // 2. Buat komponen FormProduct bisa menerima ID produk.
    // 3. Jika ada ID, FormProduct fetch data produk tersebut dan mengisi form.
    // 4. Tombol submit di FormProduct akan memanggil API update.
    alert(`Edit action for product ID: ${productId}. Implement navigation/modal for editing.`);
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
                <TableRow>
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
                          src={product.imageUrl || 'https://via.placeholder.com/64'} // Fallback image
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
                  <TableCell className="px-4 py-3 text-center text-theme-sm">
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="px-3 py-1 text-xs font-medium text-blue-600 rounded hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-1 text-xs font-medium text-red-600 rounded hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    >
                      Delete
                    </button>
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