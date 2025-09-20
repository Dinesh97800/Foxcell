import React from "react";
import CountUp from "react-countup";

const StatsCounter = () => {
  const stats = [
    { value: 20, suffix: "+", label: "Years of Experience" },
    { value: 220, suffix: "k", label: "Clients in the World" },
    { value: 25, suffix: "k", label: "Kilometers of Fibers" },
    { value: 991, suffix: "", label: "Satellite Channels" },
  ];

  return (
    <section className="bg-[#fe8900] text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index}>
            <h2 className="text-4xl font-bold">
              <CountUp end={stat.value} duration={3} />{stat.suffix}
            </h2>
            <p className="uppercase text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCounter;
