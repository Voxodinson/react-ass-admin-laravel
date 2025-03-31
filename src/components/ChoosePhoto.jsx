import React, { useState } from 'react';
import { CircleX } from 'lucide-react';

export default function ChoosePhoto({ onFileChange, name, onSubmit }) {
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result);
            setSelectedFile(file);
            if (onFileChange) {
                onFileChange(file, name);
            }
        };
        reader.readAsDataURL(file);
    }
  };

  const resetFileInput = () => {
    setFilePreview(null);
    setSelectedFile(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
        <label className="flex items-center w-[200px] bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600">
            <p className=' w-full text-center'>
                Choose Photo
            </p>
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"/>
        </label>
        {filePreview && (
            <div className="relative w-[200px] h-[200px] overflow-hidden border-[1px] rounded-md border-gray-200">
            <img
                src={filePreview}
                alt="Preview"
                className="w-full h-full object-cover"
            />
            <CircleX
                onClick={resetFileInput}
                size={20}
                className="absolute top-1 right-1 bg-white rounded-full hover:scale-110 transition cursor-pointer"
            />
            </div>
        )}
    </div>
  );
}
