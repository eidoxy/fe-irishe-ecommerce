import { useState, ChangeEvent, useEffect } from "react"; // Tambahkan useEffect
import ComponentCard from "../../common/ComponentCard.tsx";
import Label from "../Label.tsx";
import Input from "../input/InputField.tsx";
import TextArea from "../input/TextArea.tsx";
import Select from "../Select.tsx";
import DropzoneComponent from "../input/DropZone.tsx"; // Pastikan ini adalah path ke DropzoneComponent yang benar

// Definisikan tipe untuk kategori dari API
interface ApiCategory {
  id: number;
  name: string;
  description?: string; // description opsional jika tidak selalu ada atau tidak digunakan
}

// Definisikan tipe untuk opsi Select
interface SelectOption {
  value: string;
  label: string;
}

export default function FormProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [stock, setStock] = useState<number | string>("");
  const [price, setPrice] = useState<number | string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // State untuk menyimpan opsi kategori dari API
  const [categoryOptions, setCategoryOptions] = useState<SelectOption[]>([]);
  // State untuk loading dan error saat fetch kategori
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // useEffect untuk mengambil data kategori saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      setCategoryError(null);
      try {
        const response = await fetch("http://47.128.233.82:3000/api/categories");
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        const result: { data: ApiCategory[] } = await response.json();
        
        // Transformasi data API ke format yang dibutuhkan oleh komponen Select
        const transformedOptions = result.data.map(category => ({
          value: String(category.id), // id dari API (number) dijadikan string untuk value
          label: category.name,       // name dari API untuk label
        }));
        setCategoryOptions(transformedOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []); // Array dependency kosong agar useEffect hanya berjalan sekali saat mount

  const handleSelectChange = (value: string) => { // value adalah string ID kategori
    // Cari opsi yang dipilih dari categoryOptions (data dari API)
    const selectedOption = categoryOptions.find(option => option.value === value);
    if (selectedOption) {
      setCategoryId(Number(selectedOption.value)); // Konversi value (string ID) kembali ke number
      setCategoryName(selectedOption.label);     // Ambil label sebagai categoryName
    } else {
      setCategoryId(null);
      setCategoryName("");
    }
  };

  const handleFileSelect = (file: File | null) => {
    setImageFile(file);
  };

  const handleNumericInputChange = (setter: React.Dispatch<React.SetStateAction<string | number>>) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image for the product.");
      return;
    }
    // Pastikan categoryId tidak null (kategori sudah dipilih)
    if (!name || !description || categoryId === null || price === "" || stock === "") {
      alert("Please fill in all required fields, including category.");
      return;
    }

    const finalStock = Number(stock);
    const finalPrice = Number(price);

    if (isNaN(finalStock) || finalStock < 0) {
        alert("Stock must be a valid non-negative number.");
        return;
    }
    if (isNaN(finalPrice) || finalPrice <= 0) {
        alert("Price must be a valid positive number.");
        return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    // categoryId sudah number, jadi kita kirim sebagai string
    formData.append("categoryId", String(categoryId));
    // Kirim categoryName jika backend Anda membutuhkannya (opsional)
    // Jika backend hanya butuh categoryId, Anda bisa hapus baris append categoryName
    if (categoryName) {
        formData.append("categoryName", categoryName);
    }
    formData.append("stock", String(finalStock));
    formData.append("price", String(finalPrice));
    formData.append("image", imageFile);

    console.log("Submitting FormData:", Object.fromEntries(formData.entries()));

    try {
      const response = await fetch("http://47.128.233.82:3000/api/products/create", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Product created:", result);
        alert("Product created successfully!");
        setName("");
        setDescription("");
        setCategoryId(null);
        setCategoryName("");
        setStock("");
        setPrice("");
        setImageFile(null);
      } else {
        const errorData = await response.json().catch(() => ({ message: "Failed to parse error response from server." }));
        console.error("Failed to create product. Status:", response.status, "Data:", errorData);
        alert(`Failed to create product: ${errorData.message || errorData.error || response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`An error occurred while creating product: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <ComponentCard title="Create Product">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <DropzoneComponent onFileSelect={handleFileSelect} selectedFile={imageFile} />
        </div>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" value={name} onChange={e => setName(e.target.value)}  />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <TextArea value={description} onChange={value => setDescription(value)} rows={6} />
        </div>
        <div>
          <Label>Category</Label>
          {loadingCategories && <p>Loading categories...</p>}
          {categoryError && <p className="text-red-500">Error: {categoryError}</p>}
          {!loadingCategories && !categoryError && (
            <Select
              options={categoryOptions} // Gunakan state categoryOptions dari API
              placeholder="Select an option"
              onChange={handleSelectChange} // Fungsi ini sudah disesuaikan
              // value={categoryId ? String(categoryId) : ""} 
              className="dark:bg-dark-900"
              // required
              // disabled={categoryOptions.length === 0} // Disable jika tidak ada opsi (misal API gagal & tidak ada cache)
            />
          )}
        </div>
        <div>
          <Label htmlFor="stock">Stock</Label>
          <Input type="number" id="stock" value={stock} onChange={handleNumericInputChange(setStock)} min="0"  />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input type="number" id="price" value={price} onChange={handleNumericInputChange(setPrice)} min="0.01" step={0.01} />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Product
        </button>
      </form>
    </ComponentCard>
  );
}