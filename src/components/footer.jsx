import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Saylani Welfare. All rights reserved.</p>
        <div className="mt-4">
          <Link href="/contact" className="hover:underline mx-2">Contact Us</Link>
          <Link href="/privacy" className="hover:underline mx-2">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
