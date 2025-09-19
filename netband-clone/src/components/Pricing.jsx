// src/components/PricingPlans.tsx
import { Wifi, Tv, Phone } from 'lucide-react';

const plans = [
  {
    category: 'Internet',
    title: 'Easy Surfing',
    features: [
      'Up to 50Mbps',
      'Night Turbo-Speed',
      'WiFi router',
      'Unlimited devices',
    ],
    price: '$24.99',
    icon: <Wifi className="w-6 h-6 text-[#fe8900]" />,
  },
  {
    category: 'TV',
    title: 'Impression',
    features: [
      'Up to 50Mbps',
      'Night Turbo-Speed',
      'WiFi router',
      'Unlimited devices',
    ],
    price: '$18.99',
    icon: <Tv className="w-6 h-6 text-[#fe8900]" />,
  },
  {
    category: 'Internet + TV',
    title: 'Home Comfort',
    features: [
      'Up to 50Mbps',
      'Night Turbo-Speed',
      'WiFi router',
      'Unlimited devices',
    ],
    price: '$37.99',
    icon: (
      <>
        <Wifi className="w-6 h-6 text-[#fe8900]" />{' '}
        <Tv className="w-6 h-6 text-[#fe8900]" />
      </>
    ),
    popular: true,
  },
  {
    category: 'Internet + TV + Phone',
    title: 'Premium Plan',
    features: [
      'Up to 50Mbps',
      'Night Turbo-Speed',
      'WiFi router',
      'Unlimited devices',
    ],
    price: '$49.99',
    icon: (
      <>
        <Wifi className="w-6 h-6 text-[#fe8900]" />{' '}
        <Tv className="w-6 h-6 text-[#fe8900]" />{' '}
        <Phone className="w-6 h-6 text-[#fe8900]" />
      </>
    ),
  },
];

export default function PricingPlans() {
  return (
    <section className="py-20 bg-[#0b0b18]">
      <div className="container mx-auto px-6 text-center">
        <p className="text-[#fe8900] font-semibold uppercase tracking-wider">
          Pricing Plan
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#fe8900] mt-2">
          Choose Your Internet Pack By Speed
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              {/* Popular Ribbon */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-xs px-3 py-1 font-semibold">
                  Popular
                </div>
              )}

              {/* Header */}
              <div className="bg-gray-100 py-6">
                <p className="text-red-600 font-semibold">{plan.category}</p>
                <h3 className="text-lg font-bold mt-1">{plan.title}</h3>
                <div className="flex justify-center gap-3 mt-4">
                  {plan.icon}
                </div>
              </div>

              {/* Features */}
              <div className="px-6 py-6 text-left">
                <ul className="space-y-3">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-gray-700">
                      <span className="text-red-600 mr-2">✔</span> {feature}
                    </li>
                  ))}
                </ul>

                {/* Price */}
                <p className="mt-6 text-lg font-bold text-gray-900">
                  {plan.price}{' '}
                  <span className="text-sm font-normal text-gray-500">
                    | month
                  </span>
                </p>

                {/* Button */}
                <button className="mt-6 w-full bg-[#fe8900] text-white py-3 rounded-md font-semibold hover:bg-red-700 transition">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
