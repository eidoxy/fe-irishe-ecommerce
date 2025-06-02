import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import FormEditProduct from "../../../components/form/elements/FormEditProduct";
import PageMeta from "../../../components/common/PageMeta";

export default function EditProduct() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Edit Product" />
      <div className="mx-auto max-w-2xl">
        <FormEditProduct productId={id ? parseInt(id) : null} />
      </div>
    </div>
  )
}