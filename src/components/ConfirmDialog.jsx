import React from 'react';
import { 
    CircleAlert 
} from 'lucide-react';
const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div 
        className="fixed inset-0 flex justify-center items-center z-50">
        <div 
            className="bg-white rounded-lg shadow-lg p-3 w-[600px]">
            <div className="w-full flex flex-col items-center justify-center">
                <CircleAlert 
                    size={100}
                    strokeWidth={1}
                    color="#FDD835"/>
                <h3 
                    className="text-lg font-thin text-gray-700 mb-4">
                    {message}
                </h3>
            </div>
            <div 
                className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="bg-gray-300 w-1/2  px-4 py-2 rounded-md focus:outline-none hover:bg-gray-200">
                    Cancel
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-purple-400 w-1/2 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-purple-300">
                    Confirm
                </button>
            </div>
        </div>
    </div>
  );
};

export default ConfirmDialog;
