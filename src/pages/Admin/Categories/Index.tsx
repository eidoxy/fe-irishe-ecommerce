import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import PageMeta from "../../../components/common/PageMeta";
import ComponentCard from "../../../components/common/ComponentCard";
import CategoryTable from "../../../components/tables/CategoryTables/Table";

export default function Categories() {
  return (
    <div>
      <PageMeta
        title="React.js Blank Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Blank Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Categories" />
      <div className="space-y-6">
        <ComponentCard title="Category Table">
          <CategoryTable />
        </ComponentCard>
      </div>
    </div>
  );
}