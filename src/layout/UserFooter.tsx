import { Instagram, Twitter, Linkedin, Github} from 'lucide-react';

const Footer = () => {
  return (
    <footer id="about" style={{ backgroundColor: '#212529' }} className="bg-black text-white py-10">
      <div className="container mx-auto flex flex-wrap justify-between px-4 md:px-8 lg:px-20">

        {/* Exclusive Subscribe */}
        <div className="mb-6 w-full md:w-1/5">
          <h3 className="text-xl font-bold mb-4">Irishe E-commerce</h3>
          <h4 className="text-base font-semibold mb-2">Subscribe</h4>
          <p className="text-sm mb-3">Contact us for any questions or inquiries.</p>
          {/* <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="border-x-warning-25 px-1 py-2 text-blue-500 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
            <button className="bg-blue-500 text-white px-2 py-2 rounded-r-lg">
              ➔
            </button>
          </div> */}
        </div>

        {/* Support */}
        <div className="mb-6 w-full md:w-1/5">
          <h4 className="text-base font-semibold mb-3">Support</h4>
          <p className="text-sm mb-2">Perum.Keputih tegal timur , no.28B Blok II ,Keputih,Sukolilo,Surabaya</p>
          <p className="text-sm mb-2">prayogigres@gmail.com</p>
          <p className="text-sm">+62 8533-6748-410</p>
        </div>

        {/* Account */}
        <div className="mb-6 w-full md:w-1/5">
          <h4 className="text-base font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">My Account</a></li>
            {/* <li><a href="#" className="hover:underline">Login / Register</a></li> */}
            {/* <li><a href="#" className="hover:underline">Cart</a></li> */}
            {/* <li><a href="#" className="hover:underline">Wishlist</a></li> */}
            <li><a href="#" className="hover:underline">Product</a></li>
          </ul>
        </div>

        {/* Quick Link */}
        <div className="mb-6 w-full md:w-1/5">
          <h4 className="text-base font-semibold mb-3">Quick Link</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            {/* <li><a href="#" className="hover:underline">Terms Of Use</a></li> */}
            {/* <li><a href="#" className="hover:underline">FAQ</a></li> */}
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="mb-6 w-full md:w-1/5">
          <h4 className="text-base font-semibold mb-3">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://github.com/bgsprayogi"><Github size={20} /></a>
            <a href="#"><Twitter size={20} /></a>
            <a href="https://www.instagram.com/bgs.pryogi/"><Instagram size={20} /></a>
            <a href="#"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-400">
        © Copyright Irishe 2025 Kelompok 7 . All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
