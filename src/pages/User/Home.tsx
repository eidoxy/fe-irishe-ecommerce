import CardProductUser from "../../components/common/CardProductUser";
import Header from "../../layout/UserHeader";
import BestSellingProducts from "./BestProduct";
import CategoryBrowser from "./CategoryUser";
import Footer from "../../layout/UserFooter"

export default function HomeProduct() {
  return (
    <div>
      <Header />
      <CardProductUser />
      <hr />
      <CategoryBrowser />
      <hr />
      <BestSellingProducts/>
      <Footer />
    </div>
  );
}