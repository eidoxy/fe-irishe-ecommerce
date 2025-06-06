import EcommerceMetrics from "../../../components/ecommerce/EcommerceMetrics";
import RecentOrders from "../../../components/ecommerce/RecentOrders";
import PageMeta from "../../../components/common/PageMeta";

export default function Dashboard() {
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-6 gap-4 md:gap-6">
        <div className="col-span-6 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
        </div>
        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
