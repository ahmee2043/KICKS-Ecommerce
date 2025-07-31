import React from 'react';
import KicksLogo from '/images/assets/Header/Kicks_2.png';
import KickLogo2 from '/images/assets/Header/Kick_pic.png';

const Footer = () => {
  return (
    <footer className="bg-[#4a63f7] w-[91.7%] mx-auto rounded-[2.5rem] overflow-hidden">
      <div className="bg-[#4a63f7] py-10 px-6 md:py-16 rounded-t-[2.5rem] flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-8">
        <div className="text-left px-10">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 text-white leading-tight">
            JOIN OUR KICKSPLUS <br /> CLUB & GET 15% OFF
          </h2>
          <p className="text-sm md:text-lg text-blue-100 mb-6">
            Sign up for free! Join the community.
          </p>
          <form className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full max-w-md mx-auto md:mx-0">
            <input
              type="email"
              placeholder="Email address"
              className="flex-grow p-3 rounded-md bg-[#4a63f7] border border-white text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-gray-800 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-900 transition-colors duration-200"
            >
              SUBMIT
            </button>
          </form>
        </div>
        <div className="flex-shrink-0">
          <img src={KickLogo2} className="h-16 w-auto md:h-20 lg:h-32 lg:px-40" alt="KICKS Logo Top Section" />
        </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-4xl px-8 pt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-10 md:gap-y-16 lg:gap-y-20 gap-x-8 md:gap-x-12 lg:gap-x-16 mb-16">
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-3xl font-bold mb-4 text-[#FFA52F]">About us</h3>
            <p className="text-white text-sm md:text-lg leading-relaxed max-w-md">
              We are the biggest hyperstore in the universe. We got you all covered with our exclusive
              collections and latest drops.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#FFA52F]">Categories</h3>
            <ul className="space-y-2 text-white text-base">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Runners</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Sneakers</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Basketball</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Outdoor</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Golf</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Hiking</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#FFA52F]">Company</h3>
            <ul className="space-y-2 text-white text-base">
              <li><a href="#" className="hover:text-white transition-colors duration-200">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Blogs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4 text-[#FFA52F]">Follow us</h3>
            <div className="flex space-x-6">
              <a href="#" aria-label="Facebook">
                <img src="/Facebook.svg" alt="Facebook Icon" className="h-4 w-4 md:h-6 md:w-6" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src="/Insta.svg" alt="Instagram Icon" className="h-4 w-4 md:h-6 md:w-6" />
              </a>
              <a href="#" aria-label="Twitter">
                <img src="/Twitter.svg" alt="Twitter Icon" className="h-4 w-4 md:w-6 md:h-6" />
              </a>
              <a href="#" aria-label="TikTok">
                <img src="/Tiktok.svg" alt="TikTok Icon" className="h-4 w-4 md:w-6 md:h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="flex">
          <img src={KicksLogo} alt="Large KICKS Logo" className="w-full h-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
