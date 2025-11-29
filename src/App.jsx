import React, { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [method, setMethod] = useState("beam");

  const API_URL = "https://salehmangrio-image-captioning-api.hf.space/caption";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setCaption("");
    }
  };

  const generateCaption = async () => {
    if (!image) return;

    setLoading(true);
    setCaption("");

    const formData = new FormData();
    formData.append("file", image);

    try {
      const res = await fetch(`${API_URL}?method=${method}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(`Server error: ${res.status} - ${error}`);
      }

      const data = await res.json();
      setCaption(data.caption || "No caption generated.");
    } catch (err) {
      console.error("Error:", err);
      setCaption("Failed to connect. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            AI Image Caption Generator
          </h1>
          <p className="text-xl text-gray-600">
            Upload any photo and let AI describe it in natural English
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Upload Area */}
            <div className="border-4 border-dashed border-indigo-300 rounded-2xl p-12 text-center hover:border-indigo-500 transition-all cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="block">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto max-h-96 rounded-xl shadow-lg object-contain"
                  />
                ) : (
                  <div>
                    <div className="text-6xl mb-4">Upload Image</div>
                    <p className="text-gray-500 text-lg">
                      Click here or drag & drop
                    </p>
                  </div>
                )}
              </label>
            </div>

            {/* Method Selector */}
            {preview && (
              <div className="mt-8 flex justify-center gap-8">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="beam"
                    checked={method === "beam"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-5 h-5 text-indigo-600"
                  />
                  <span className="text-lg font-medium">Beam Search (Best)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="method"
                    value="greedy"
                    checked={method === "greedy"}
                    onChange={(e) => setMethod(e.target.value)}
                    className="w-5 h-5 text-indigo-600"
                  />
                  <span className="text-lg font-medium">Greedy (Faster)</span>
                </label>
              </div>
            )}

            {/* Generate Button */}
            {preview && (
              <div className="mt-10 text-center">
                <button
                  onClick={generateCaption}
                  disabled={loading}
                  className={`px-16 py-6 rounded-full text-2xl font-bold transition-all transform hover:scale-105 shadow-xl ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center gap-3">
                      <svg className="animate-spin h-8 w-8" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                        <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" className="opacity-75" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    "Generate Caption"
                  )}
                </button>
              </div>
            )}

            {/* Result */}
            {caption && (
              <div className="mt-12 p-10 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl border-2 border-indigo-200">
                <h3 className="text-3xl font-bold text-center mb-6 text-indigo-900">
                  Generated Caption
                </h3>
                <p className="text-4xl font-medium text-center leading-relaxed italic text-gray-800">
                  "{caption}"
                </p>
                <p className="text-center mt-6 text-lg text-indigo-700 font-medium">
                  Method: {method === "beam" ? "Beam Search" : "Greedy"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p className="text-lg">
            Built with ❤️ by{" "}
            <a href="https://huggingface.co/Salehmangrio" className="font-bold text-indigo-600 hover:underline">
              Saleh Mangrio
            </a>{" "}
            &{" "}
            <span className="font-bold text-purple-600">Kelash Kumar</span>
            <br />
            Powered by ResNet50 + LSTM •{" "}
            <a href="https://salehmangrio-image-captioning-api.hf.space" className="text-indigo-600 hover:underline">
              Live API
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}