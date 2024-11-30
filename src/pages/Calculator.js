import React, { useState } from "react";

function Calculator() {
  // State untuk input, hasil berat volume, harga, dan estimasi biaya
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [pricePerGram, setPricePerGram] = useState(""); // Menghapus harga default
  const [result, setResult] = useState(null);
  const [estimatedCost, setEstimatedCost] = useState(null);

  // Fungsi untuk menghitung berat volume dan estimasi biaya
  const calculateVolumeWeight = () => {
    const lengthVal = parseFloat(length);
    const widthVal = parseFloat(width);
    const heightVal = parseFloat(height);
    const priceVal = parseFloat(pricePerGram);

    // Validasi input: pastikan semua nilai adalah angka
    if (isNaN(lengthVal) || isNaN(widthVal) || isNaN(heightVal)) {
      alert("Please enter valid numeric values for all dimensions.");
      return;
    }

    if (isNaN(priceVal) || priceVal <= 0) {
      alert("Please enter a valid price per gram.");
      return;
    }

    const volumeWeight = (lengthVal * widthVal * heightVal) / 5; // Berat volume
    const cost = volumeWeight * priceVal; // Estimasi biaya
    setResult(volumeWeight.toFixed(2)); // Hasil berat volume dengan 2 desimal
    setEstimatedCost(cost.toFixed(2)); // Biaya estimasi dengan 2 desimal
  };

  // Fungsi untuk mereset input, hasil berat, dan estimasi biaya
  const resetCalculator = () => {
    setLength("");
    setWidth("");
    setHeight("");
    setPricePerGram(""); // Reset harga juga
    setResult(null);
    setEstimatedCost(null);
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 p-6">
      {/* Kalkulator */}
      <div className="p-6 bg-white rounded shadow-md w-1/3 mr-6">
        <h1 className="text-xl font-bold text-gray-700 mb-4">Rate Calculator(Volume/5)</h1>

        {/* Input untuk dimensi */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Length (cm)</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-purple-300 focus:outline-none"
            placeholder="Enter length"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Width (cm)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-purple-300 focus:outline-none"
            placeholder="Enter width"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-purple-300 focus:outline-none"
            placeholder="Enter height"
          />
        </div>

        {/* Tombol Hitung dan Reset */}
        <button
          onClick={calculateVolumeWeight}
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition"
        >
          Calculate
        </button>
        <button
          onClick={resetCalculator}
          className="w-full bg-gray-300 text-gray-700 py-2 mt-2 rounded-md hover:bg-gray-400 transition"
        >
          Reset
        </button>

        {/* Hasil Berat Volume */}
        {result !== null && (
          <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
            <p className="text-sm">The volume weight is:</p>
            <p className="text-lg font-bold">{result} grams</p>
          </div>
        )}

        {/* Estimasi Biaya */}
        {estimatedCost !== null && (
          <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded">
            <p className="text-sm">Estimated Rate:</p>
            <p className="text-lg font-bold">Rp {estimatedCost}</p>
          </div>
        )}
      </div>

      {/* Bagian Admin */}
      <div className="p-6 bg-gray-50 rounded shadow-md w-1/3">
        <h2 className="text-lg font-bold text-gray-700 mb-4">Admin Only</h2>
        <div>
          <label className="block text-sm font-medium text-gray-600">Set Rate</label>
          <input
            type="number"
            value={pricePerGram}
            onChange={(e) => setPricePerGram(e.target.value)}
            className="block w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            placeholder="Enter price per gram"
          />
        </div>

        <div className="mt-4 p-4 bg-yellow-100 text-yellow-700 rounded">
          <p className="text-sm">Current Price Per Gram:</p>
          <p className="text-lg font-bold">Rp {pricePerGram || "Not Set"}</p>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
