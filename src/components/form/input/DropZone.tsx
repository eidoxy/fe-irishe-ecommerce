import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone"; // Import FileWithPath jika diperlukan untuk akses path
import ComponentCard from "../../common/ComponentCard"; // Pastikan path ini benar

interface DropzoneComponentProps {
  onFileSelect: (file: File | null) => void; // Callback untuk mengirim File object ke parent
  selectedFile: File | null; // Untuk menampilkan nama file yang dipilih (opsional)
}

const DropzoneComponent: React.FC<DropzoneComponentProps> = ({ onFileSelect, selectedFile }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]); // Kirim file pertama yang diterima
      } else {
        onFileSelect(null); // Atau kirim null jika tidak ada file
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/webp": [".webp"],
      "image/svg+xml": [".svg"],
    },
    multiple: false, // Hanya izinkan satu file
  });

  return (
    <ComponentCard title="Product Image">
      <div
        {...getRootProps()}
        className={`transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500 
          dropzone p-7 lg:p-10 ${
          isDragActive
            ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
            : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
        }`}
      >
        <input {...getInputProps()} />
        <div className="dz-message flex flex-col items-center m-0!">
          <div className="mb-[22px] flex justify-center">
            <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg /* ... ikon SVG Anda ... */ ></svg>
            </div>
          </div>
          {selectedFile ? (
            <p className="text-gray-800 dark:text-white/90">File terpilih: {selectedFile.name}</p>
          ) : (
            <>
              <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                {isDragActive ? "Letakkan file di sini..." : "Seret & Lepas file di sini"}
              </h4>
              <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
                Seret dan lepas gambar PNG, JPG, WebP, SVG Anda di sini atau klik untuk mencari
              </span>
              <span className="font-medium underline text-theme-sm text-brand-500">
                Cari File
              </span>
            </>
          )}
        </div>
      </div>
      {selectedFile && (
        <button
          type="button"
          onClick={() => onFileSelect(null)}
          className="mt-2 px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
        >
          Hapus Gambar
        </button>
      )}
    </ComponentCard>
  );
};

export default DropzoneComponent;