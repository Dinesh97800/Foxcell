'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import {
  getAbout,
  updateAbout,
  uploadAboutImage,
} from 'src/api/services/aboutService';

const AboutForm = () => {
  const [data, setData] = useState({
    heading: '',
    description: '',
    image: '',
  });

  const [loading, setLoading] = useState(true); // fetch loading
  const [saving, setSaving] = useState(false); // submit loading
  const [imgUploading, setImgUploading] = useState(false); // image upload loading

  const MAX_IMAGE_SIZE_MB = 2;
  const REQUIRED_WIDTH = 600;
  const REQUIRED_HEIGHT = 400;

  // Fetch About Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAbout();
        if (res) setData(res);
      } catch {
        toast.error('Failed to load about section.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Validate before submit
  const validateForm = () => {
    if (!data.heading.trim()) {
      toast.error('Heading is required');
      return false;
    }
    if (!data.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    return true;
  };

  // Submit Handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    try {
      await updateAbout(data);
      toast.success('About section updated successfully!');
    } catch {
      toast.error('Failed to update');
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 1000);
    }
  };

  // IMAGE VALIDATION + UPLOAD
  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    // Size check
    if (file.size / (1024 * 1024) > MAX_IMAGE_SIZE_MB) {
      toast.error(`Image size must be less than ${MAX_IMAGE_SIZE_MB} MB`);
      return;
    }

    // Dimension check
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      if (img.width < REQUIRED_WIDTH || img.height < REQUIRED_HEIGHT) {
        toast.error(
          `Image must be at least ${REQUIRED_WIDTH}x${REQUIRED_HEIGHT}px`
        );
        return;
      }

      // Upload
      const formData = new FormData();
      formData.append('image', file);

      setImgUploading(true);
      try {
        const res = await uploadAboutImage(formData);
        setData({ ...data, image: res.image });
        toast.success('Image uploaded successfully!');
      } catch {
        toast.error('Image upload failed');
      } finally {
        setTimeout(() => {
          setImgUploading(false);
        }, 1000);
      }
    };
  };

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg max-w-3xl mx-auto border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit About Us</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Heading */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Heading <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={data.heading}
            onChange={(e) => setData({ ...data, heading: e.target.value })}
            placeholder="Enter the About Us heading"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows={6}
            className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Write a detailed description..."
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-1 text-gray-700">
            Image (Min: {REQUIRED_WIDTH}×{REQUIRED_HEIGHT}px, Max:{' '}
            {MAX_IMAGE_SIZE_MB}MB)
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="block w-full"
          />

          {imgUploading && (
            <p className="text-blue-600 mt-2 animate-pulse">Uploading...</p>
          )}

          {data.image && (
            <img
              src={data.image}
              className="w-48 mt-4 rounded-lg shadow border border-gray-200"
              alt="About"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={saving}
          className={`bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2 ${
            saving ? 'opacity-60 cursor-not-allowed' : ''
          }`}
        >
          {saving && (
            <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span>
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AboutForm;
