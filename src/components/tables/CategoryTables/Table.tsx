import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";

interface Category {
  id: number;
  name: string;
  description: string;
}

// Define the table data using the interface
const tableData: Category[] = [
  {
    id: 1,
    name: "Electronics",
    description: "Devices and gadgets such as phones, laptops, and accessories.",
  },
  {
    id: 2,
    name: "Fashion",
    description: "Clothing, footwear, and accessories for men, women, and kids.",
  },
  {
    id: 3,
    name: "Home Appliances",
    description: "Appliances and tools for home improvement and daily use.",
  },
  {
    id: 4,
    name: "Books",
    description: "Wide range of books including fiction, non-fiction, and academic.",
  },
  {
    id: 5,
    name: "Sports",
    description: "Sports equipment, apparel, and accessories.",
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

export default function CategoryTable() {
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
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Description
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {tableData.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="light"
                      color={getRandomColor()}
                    >
                      {category.name}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 text-ellipsis overflow-hidden whitespace-nowrap max-w-xl">
                  {category.description}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
