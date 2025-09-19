export default function Brands() {
  return (
    <section className="py-20 container mx-auto text-center">
      <h2 className="text-2xl font-bold mb-10">1K+ Brands Trust Us</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-gray-200 h-16 rounded"></div>
        ))}
      </div>
    </section>
  );
}
