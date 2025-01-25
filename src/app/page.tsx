import Header from "@/components/header";
import Footer from "@/components/footer";
import LoanCalculator from "@/components/loan-calculator";
import LoanCategoryCard from "@/components/loan-category-card";

export default function Home() {
  return (
    <div>
      <Header />

      <section className="loan-categories mt-12">
        <h2 className="text-4xl font-semibold text-center text-gray-800 mb-10">
          Loan Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <LoanCategoryCard category="Wedding" link="/wedding-loan" />
          <LoanCategoryCard category="Home Construction" link="/home-loan" />
          <LoanCategoryCard category="Business Startup" link="/business-loan" />
          <LoanCategoryCard category="Education" link="/education-loan" />
        </div>
      </section>

      <section className="loan-calculator mt-12 bg-gray-50 p-8 rounded-lg shadow-md">
        <LoanCalculator />
      </section>

      <Footer />
    </div>
  );
}
