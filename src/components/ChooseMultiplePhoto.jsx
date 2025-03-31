import React, { useState } from 'react';
import { 
    CircleX,
    Image
} from 'lucide-react';

export default function ChoosePhoto({ onFileChange, name }) {
    const [filePreviews, setFilePreviews] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).filter(file => file instanceof Blob);
        if (files.length) {
            const newPreviews = files.map((file) => {
                const reader = new FileReader();
                return new Promise((resolve) => {
                reader.onloadend = () => resolve({ preview: reader.result, file });
                reader.readAsDataURL(file);
                });
            });
            
            Promise.all(newPreviews).then((results) => {
                const newFiles = results.map((r) => r.file);
                setFilePreviews((prev) => [...prev, ...results.map((r) => r.preview)]);
                setSelectedFiles((prev) => [...prev, ...newFiles]);
                if (onFileChange) {
                onFileChange([...selectedFiles, ...newFiles], name);
                }
            });
        }
    };

    const removeImage = (index) => {
        const updatedPreviews = filePreviews.filter((_, i) => i !== index);
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);
        setFilePreviews(updatedPreviews);
        setSelectedFiles(updatedFiles);

        if (onFileChange) {
            onFileChange(updatedFiles, name);
        }
    };


    return (
        <div 
            className="flex flex-col items-center space-y-4">
            <label 
                className="flex items-center w-[200px] bg-blue-500 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-600">
                <p className='text-center flex items-center gap-3 w-full'>
                    <Image />Choose Photo
                </p>
                <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"/>
            </label>

            <div 
                className="flex gap-2 flex-wrap">
                {filePreviews.map((preview, index) => (
                    <div 
                        key={index} 
                        className="relative w-[calc(95%/2)] h-[100px] overflow-hidden border-[1px] rounded-md border-gray-200">
                        <img 
                            src={preview} 
                            alt="Preview" 
                            className="w-full h-full object-cover" />
                        <CircleX
                            onClick={() => removeImage(index)}
                            size={20}
                            className="absolute top-1 right-1 bg-white rounded-full hover:scale-110 transition cursor-pointer"/>
                    </div>
                ))}
            </div>
        </div>
    );
}