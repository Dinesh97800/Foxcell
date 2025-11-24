// src/components/LiveSports.tsx
import { CheckCircle, Award, Headphones } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getShowcaseFeatures } from "src/api/services/featureService";

export default function FeatureShowcaseSection() {
  const [data, setData] = useState({
    id: null,
    title: "",
    subtitle: "",
    description: "",
    stats: [],
    tabs: [],
    features: [],
    awards: [],
    progress: { label: "", value: 0 },
    image: null as string | null,
  });
  useEffect(() => {
    const fetchData = async () => {
      const data = await getShowcaseFeatures();

      setData({
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        progress: {
          label: data.progress_label,
          value: data.progress_value,
        },
        // If backend returns JSON strings, parse them safely
        stats:
          typeof data.stats === "string"
            ? JSON.parse(data.stats)
            : data.stats || [],
        tabs:
          typeof data.tabs === "string"
            ? JSON.parse(data.tabs)
            : data.tabs || [],
        features:
          typeof data.features === "string"
            ? JSON.parse(data.features)
            : data.features || [],
        awards:
          typeof data.awards === "string"
            ? JSON.parse(data.awards)
            : data.awards || [],
        image: data.image_url,
      });
    };

    fetchData();
  }, []);

  if (data.image == null) {
    return null;
  }
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left side */}
        <div className="relative flex">
          <div className="bg-[#fe8900] text-white flex flex-col justify-center items-center px-6 py-16 space-y-12">
            {data?.stats.map((stat: any, i: number) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold">{stat.value}</p>
                <p className="text-sm tracking-wide">{stat.label}</p>

                {i === 0 && (
                  <div className="border-t border-white/50 w-8 my-8"></div>
                )}
              </div>
            ))}
          </div>

          <div className="relative w-full h-96">
            <Image
              src={data.image}
              alt="Live Sports"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Right side */}
        <div>
          <p className="uppercase text-xs font-bold tracking-wider text-gray-600">
            {data.subtitle}
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2">
            {data.title}
          </h2>

          <p className="text-gray-600 mt-4">{data.description}</p>

          {/* Tabs */}
          <div className="flex space-x-4 mt-6">
            {data.tabs.map((tab: string, i: number) => (
              <button
                key={i}
                className={`px-4 py-2 font-semibold rounded ${
                  i === 1 ? "bg-[#fe8900] text-white relative" : "bg-gray-200"
                }`}
              >
                {tab}

                {i === 1 && (
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-t-red-600 border-l-transparent border-r-transparent"></span>
                )}
              </button>
            ))}
          </div>

          {/* Features */}
          <ul className="mt-6 space-y-2">
            {data.features.map((feature: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="w-5 h-5 text-[#fe8900]" /> {feature}
              </li>
            ))}
          </ul>

          {/* Awards */}
          <div className="flex items-center gap-12 mt-6">
            {data.awards.map((award: any, i: number) => (
              <div key={i} className="flex items-center gap-2">
                {award.icon === "award" && (
                  <Award className="w-8 h-8 text-[#fe8900]" />
                )}
                {award.icon === "headphones" && (
                  <Headphones className="w-8 h-8 text-[#fe8900]" />
                )}
                <p className="font-semibold">{award.label}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-8">
            <p className="text-sm font-semibold mb-1">{data.progress.label}</p>

            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-[#fe8900] h-2 rounded"
                style={{ width: `${data.progress.value}%` }}
              ></div>
            </div>

            <p className="text-right text-sm font-bold text-[#fe8900]">
              {data.progress.value}%
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
