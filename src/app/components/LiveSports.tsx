// src/components/LiveSports.tsx
import { CheckCircle, Award, Headphones } from 'lucide-react';

export default function LiveSports() {
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Image + Red Stats Bar */}
        <div className="relative flex">
          {/* Vertical Red Bar */}
          <div className="bg-[#fe8900] text-white flex flex-col justify-center items-center px-6 py-16 space-y-12">
            <div className="text-center">
              <p className="text-3xl font-extrabold">5k+</p>
              <p className="text-sm tracking-wide">Awesome Clients</p>
            </div>
            <div className="border-t border-white/50 w-8"></div>
            <div className="text-center">
              <p className="text-3xl font-extrabold">500+</p>
              <p className="text-sm tracking-wide">Awesome Clients</p>
            </div>
          </div>

          {/* Main Image */}
          <img
            src="https://netband-react.vercel.app/assets/img/feature/trusted.jpg"
            alt="Live Sports"
            className="object-cover w-[71%] h-full"
          />
        </div>

        {/* Right Content */}
        <div>
          <p className="uppercase text-xs font-bold tracking-wider text-gray-600">
            Live Sports
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            Live Sport And TV-Shows <br /> For Best Friends
          </h2>
          <p className="text-gray-600 mt-4">
            Transmds is the world’s driving worldwide coordinations supplier —
            we uphold industry and exchange the worldwide trade of merchandi.
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button className="px-4 py-2 bg-gray-200 font-semibold rounded">
              Our Mission
            </button>
            <button className="px-4 py-2 bg-[#fe8900] text-white font-semibold rounded relative">
              Our Strategy
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-t-red-600 border-l-transparent border-r-transparent"></span>
            </button>
            <button className="px-4 py-2 bg-gray-200 font-semibold rounded">
              Our Vision
            </button>
          </div>

          {/* Features List */}
          <ul className="mt-6 space-y-2">
            <li className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-[#fe8900]" /> 100 Mbps YouTube
            </li>
            <li className="flex items-center gap-2 text-gray-700">
              <CheckCircle className="w-5 h-5 text-[#fe8900]" /> Connect Multiple
              Users
            </li>
          </ul>

          {/* Awards + Support */}
          <div className="flex items-center gap-12 mt-6">
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8 text-[#fe8900]" />
              <p className="font-semibold">Award Winning</p>
            </div>
            <div className="flex items-center gap-2">
              <Headphones className="w-8 h-8 text-[#fe8900]" />
              <p className="font-semibold">Best Support</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <p className="text-sm font-semibold mb-1">
              Real Technology Solution
            </p>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-[#fe8900] h-2 rounded"
                style={{ width: '75%' }}
              ></div>
            </div>
            <p className="text-right text-sm font-bold text-[#fe8900]">75%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
