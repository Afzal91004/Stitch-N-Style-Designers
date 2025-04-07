import React, { useState } from "react";
import { Camera, X, Upload } from "lucide-react";

const UploadDesign = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    startingBid: "",
    duration: "7",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(
      e.target.files || (e.dataTransfer && e.dataTransfer.files) || []
    );
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageChange(e);
  };

  const removeImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Currently, this function only logs the form data to the console.
    // You can implement the actual submission logic here.
    console.log(formData);
  };

  return (
    <div className="px-[100px] min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Showcase Your Design
          </h1>
          <p className="text-gray-600 mb-8">
            Create your design auction and let the bidding begin
          </p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Design Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter a captivating title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="ethnic">Ethnic Wear</option>
                    <option value="western">Western Wear</option>
                    <option value="fusion">Fusion Wear</option>
                    <option value="traditional">Traditional Wear</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Starting Bid (INR)
                  </label>
                  <input
                    type="number"
                    name="startingBid"
                    value={formData.startingBid}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Set your starting price"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Auction Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="3">3 Days</option>
                    <option value="7">7 Days</option>
                    <option value="14">14 Days</option>
                    <option value="30">30 Days</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg h-40 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Describe your design in detail..."
                    required
                  />
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    id="images"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <Camera className="w-12 h-12 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Drag & drop your images or click to browse
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {previewImages.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r bg-pink-500 text-white  py-4 rounded-lg hover:from-pink-500 hover:to-blue-900 transition-all transform hover:scale-[1.02] duration-200 font-semibold text-lg shadow-lg"
            >
              <div className="flex items-center justify-center space-x-2">
                <Upload className="w-5 h-5" />
                <span>Launch Design Auction</span>
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDesign;
