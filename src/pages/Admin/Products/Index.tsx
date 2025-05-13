import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import ComponentCard from "../../../components/common/ComponentCard";
import ProductTable from "../../../components/tables/ProductTables/Table";

export default function Products() {
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Product List" />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <ProductTable />
        </ComponentCard>
      </div>
    </div>
  );
}