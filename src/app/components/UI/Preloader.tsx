"use client";

export default function Preloader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      {/* Smooth Spinner */}
      <div className="relative mb-8">
        <div className="h-20 w-20 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-4 border-t-red-500 animate-spin"></div>
      </div>

      {/* Brand Letters with Wave Animation */}
      <div className="flex space-x-2 text-4xl font-extrabold tracking-widest text-red-600">
        {"FOXCell".split("").map((letter, index) => (
          <span
            key={index}
            className="animate-[wave_1.5s_ease-in-out_infinite]"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Loading Text with Fade Pulse */}
      <p className="mt-6 text-gray-600 font-medium tracking-[0.3em] uppercase animate-pulse">
        Loading
      </p>

      {/* Tailwind custom keyframes */}
      <style jsx>{`
        @keyframes wave {
          0%,
          60%,
          100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
