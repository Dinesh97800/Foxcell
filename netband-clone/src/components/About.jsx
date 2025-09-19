export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">About Foxcell</h2>
          <p className="text-gray-600 mb-4">
            Foxcell provides reliable broadband solutions with unmatched speed
            and security. Our mission is to keep you connected at all times.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Learn More
          </button>
        </div>
        <div className="bg-blue-100 h-64 rounded-xl"></div>
      </div>
    </section>
  );
}
