import React, { useState } from 'react';
import { CircleX, Image } from 'lucide-react';

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
        <div className="flex flex-col w-full items-start space-y-4">
            <label className="flex items-center bg-blue-500 w-full text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600">
                <p className='text-center flex items-center gap-3 w-full'>
                    <Image />Choose Photo
                </p>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"/>
            </label>
            {filePreview && (
                <div className="relative flex overflow-hidden border-[1px] rounded-md border-gray-200 w-full h-full">
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
