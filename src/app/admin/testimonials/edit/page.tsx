'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import api from 'src/api/apiClient';
import { useDropzone } from 'react-dropzone';

export default function CreateOrEditTestimonial() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');

  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const isEdit = Boolean(id);

  // Fetch testimonial details for edit
  async function fetchData() {
    if (!id) return;

    try {
      const res = await api.get(`/testimonials/${id}`);
      setName(res.data.name);
      setContent(res.data.content);

      if (res.data.image) {
        setPreview(res.data.image);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  // Dropzone file handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const img = acceptedFiles[0];
    if (!img) return;

    setFile(img);
    setPreview(URL.createObjectURL(img));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  // Submit form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('content', content);

      if (file) {
        formData.append('image', file);
      }

      if (isEdit) {
        await api.put(`/testimonials/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post(`/testimonials`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      router.push('/admin/testimonials');
    } catch (error) {
      console.error('Submit error:', error);
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 mt-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {isEdit ? 'Edit Testimonial' : 'Create Testimonial'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold mb-1">Content</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            required
          />
        </div>

        {/* Dropzone */}
        <div>
          <label className="block font-semibold mb-1">Image</label>

          <div
            {...getRootProps()}
            className={`relative border-2 border-dashed rounded p-6 text-center cursor-pointer transition h-48 flex items-center justify-center ${
              isDragActive ? 'border-green-600 bg-green-50' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />

            {preview ? (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full rounded"
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setPreview('');
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-opacity-80"
                >
                  ✕
                </button>
              </div>
            ) : (
              <p>
                Drag & drop an image here, or{' '}
                <span className="text-blue-500 underline">browse</span>
              </p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {isEdit ? 'Update' : 'Create'}
          </button>

          <button
            type="button"
            className="bg-gray-400 text-white px-4 py-2 rounded"
            onClick={() => router.push('/admin/testimonials')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
