import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import FormAddProduct from "../../../components/form/elements/FormAddProduct";
import PageMeta from "../../../components/common/PageMeta";

export default function AddProduct() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Add Product" />
      <div className="mx-auto max-w-2xl">
        <FormAddProduct />
      </div>
    </div>
  );
}
