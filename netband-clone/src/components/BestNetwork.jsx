// src/components/BestNetwork.tsx
import { Wifi, RadioTower, Server, Satellite } from 'lucide-react';

const services = [
  {
    icon: <Wifi className="w-12 h-12 text-black" />,
    title: 'Corporate Internet',
    desc: 'Average time to resolve a cyber attack\nAverage time to resolve',
  },
  {
    icon: <RadioTower className="w-12 h-12 text-black" />,
    title: 'Home Internet',
    desc: 'Average time to resolve a cyber attack\nAverage time to resolve',
  },
  {
    icon: <Server className="w-12 h-12 text-black" />,
    title: 'Hosting & Development',
    desc: 'Average time to resolve a cyber attack\nAverage time to resolve',
  },
  {
    icon: <Satellite className="w-12 h-12 text-black" />,
    title: 'Satellite Chanel',
    desc: 'Average time to resolve a cyber attack\nAverage time to resolve',
  },
];

export default function BestNetwork() {
  return (
    <section className="py-20 bg-white relative">
      <div className="text-center mb-12">
        <p className="text-red-600 font-semibold uppercase tracking-wider">
          Best Network
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Find Perfect Network <br /> Solutions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {services.map((service, idx) => (
          <div key={idx} className="flex flex-col items-start text-left group">
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-line mb-4">
              {service.desc}
            </p>
            <a
              href="#"
              className="text-sm font-semibold text-gray-900 flex items-center gap-2 group-hover:text-red-600 transition"
            >
              Discover More
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white text-xs">
                →
              </span>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
