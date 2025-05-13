import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
  stock: number;
  price: string;
  category: string;
}

// Define the table data using the interface
const tableData: Product[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI.",
    stock: 120,
    price: "$25.99",
    category: "Electronics",
    image: "/images/product/product-01.jpg",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard with blue switches.",
    stock: 75,
    price: "$89.99",
    category: "Electronics",
    image: "/images/product/product-02.jpg",
  },
  {
    id: 3,
    name: "Gaming Headset",
    description: "Surround sound gaming headset with noise cancellation.",
    stock: 50,
    price: "$59.99",
    category: "Gaming",
    image: "/images/product/product-03.jpg",
  },
  {
    id: 4,
    name: "4K Monitor",
    description: "27-inch 4K UHD monitor with HDR support.",
    stock: 30,
    price: "$299.99",
    category: "Electronics",
    image: "/images/product/product-04.jpg",
  },
  {
    id: 5,
    name: "Portable SSD",
    description: "1TB portable SSD with USB-C connectivity.",
    stock: 200,
    price: "$129.99",
    category: "Storage",
    image: "/images/product/product-05.jpg",
  },
];

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
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Product
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Description
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Stock
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 overflow-hidden">
                      <img
                        width={64}
                        height={64}
                        src={product.image}
                        alt={product.name}
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
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="light"
                      color={getRandomColor()}
                    >
                      {product.category}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]">
                  {product.description}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {product.stock}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 dark:text-gray-400">
                      {product.price}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}