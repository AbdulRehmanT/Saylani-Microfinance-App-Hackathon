import Header from "@/components/header";
import Footer from "@/components/footer";
import LoanCategories from "@/components/loan-categories";
import LoanCalculator from "@/components/loan-calculator";

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <section className="py-12 text-center">
          <h1 className="text-3xl font-semibold">Welcome to Saylani Welfare</h1>
          <p className="mt-4">We are here to help you with your loan needs. Choose a category and calculate your loan today!</p>
        </section>

        <LoanCategories />
        <LoanCalculator selectedCategory={undefined} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
