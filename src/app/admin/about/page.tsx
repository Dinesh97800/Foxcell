import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AboutForm = () => {
  const [data, setData] = useState({
    heading: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    axios.get("/api/about").then((res) => {
      if (res.data) setData(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/about/update", data);
      toast.success("Updated successfully!");
    } catch {
      toast.error("Something went wrong!");
    }
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await axios.post("/api/about/upload-image", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setData({ ...data, image: res.data.image });
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit About Us</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Heading */}
        <div>
          <label className="block font-semibold mb-1">Heading</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            rows={6}
            className="w-full p-2 border rounded"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1">Image</label>
          <input type="file" onChange={handleImageUpload} />
          {data.image && (
            <img
              src={data.image}
              className="w-40 mt-2 rounded shadow"
              alt="About"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AboutForm;
