import React, { useState } from 'react';
import TableComponent from '../components/Table';
import SeleMenu from '../components/SelectMenu';
import { Plus, CircleX, PackagePlus, Trash2 } from 'lucide-react';
import apiHandle from '../services/apiHandle';
import { Message } from '../context/AlertProvider';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { Button, TextareaAutosize } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ChooseMultiplePhoto from '../components/ChooseMultiplePhoto';

// Table Columns
const columns = [
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'image', label: 'Image', align: 'left' },
];

export default function ProductList() {
    const [selectType, setSelectedType] = useState('men');
    const [openModal, setOpenModal] = useState(false);
    const [sizes, setSizes] = useState([""]);
    const [images, setImages] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        color: "",
        brand: "",
        category: "",
        rating: "",
        stock: "",
        description: "",
    });

    const productType = [
        { value: 'men', label: 'Men' },
        { value: 'women', label: 'Women' },
        { value: 'kids', label: 'Kids' }
    ];

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle size inputs
    const handleInputChangeSize = (index, event) => {
        const newSizes = [...sizes];
        newSizes[index] = event.target.value;
        setSizes(newSizes);
    };

    const addSizeField = () => {
        setSizes([...sizes, ""]);
    };

    const removeSizeField = (index) => {
        const newSizes = sizes.filter((_, i) => i !== index);
        setSizes(newSizes);
    };

    // Handle file selection
    const handleFileChange = (files) => {
        setImages(files);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('stock', formData.stock);
        formDataToSend.append('color', formData.color);
        formDataToSend.append('brand', formData.brand);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('rating', formData.rating);
        formDataToSend.append('product_type', selectType);

        // Append sizes
        sizes.forEach(size => {
            formDataToSend.append('sizes[]', size);
        });

        // Append images
        images.forEach((image) => {
            formDataToSend.append('images[]', image);
        });

        try {
            const response = await apiHandle.post('products', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            console.log('Product created:', response);
            Message('Product created successfully!', 'success');
            handleCloseModal();
        } catch (error) {
            console.error('Error creating product:', error.response?.data);
            Message('Error creating product.', 'error');
        }
    };

    return (
        <div className='w-full h-[81.5vh]'>
            <div className="w-full p-2 bg-white rounded-md flex items-center justify-between gap-2 mt-3 border-gray-200 border-[1px]">
                <div className="w-fit flex gap-3">
                    <TextField
                        label="Search Product"
                        id="outlined-size-small"
                        size="small"
                        className='w-[calc(98%/2)]'
                    />
                    <div className="w-[300px]">
                        <SeleMenu
                            label="Product Type"
                            data={productType}
                            value={selectType}
                            onChange={setSelectedType}
                        />
                    </div>
                </div>
                <Button onClick={handleOpenModal} variant='contained' size='small'>
                    <Plus />
                </Button>
            </div>
            <div className="w-full mt-3 h-full overflow-auto">
                <TableComponent columns={columns} data={[]} per_page={10} />
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
                className='w-full flex items-center justify-center'
            >
                <Fade in={openModal}>
                    <Box className="w-[1000px] bg-white z-50 overflow-hidden rounded-md shadow-md border-gray-200 border-[1px]">
                        <div className="w-full px-4 py-1 bg-[#6592a3] text-white flex justify-between items-center">
                            <Typography id="transition-modal-title" variant="h6">Create Product</Typography>
                            <CircleX className='cursor-pointer' onClick={handleCloseModal} />
                        </div>
                        <div className="w-full h-fit pt-6 pb-3 px-3 max-h-[80vh] overflow-auto">
                            <form onSubmit={handleSubmit} className='w-full flex flex-wrap gap-3'>
                                <div className="w-[200px]">
                                    <ChooseMultiplePhoto onFileChange={handleFileChange} name="photos" />
                                </div>
                                <div className="w-[calc(97%-200px)] flex flex-wrap gap-2">
                                    {["name", "price", "color", "brand", "category", "rating", "stock", "product_type"].map(field => (
                                        <TextField
                                            key={field}
                                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                                            size="small"
                                            name={field}
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            className='w-[calc(98.5%/2)]'
                                        />
                                    ))}
                                    <div className="w-full border-b-[1px] border-gray-200">
                                        <p>Sizes</p>
                                    </div>
                                    {sizes.map((size, index) => (
                                        <div key={index} className="w-[calc(98.5%/2)] flex gap-2">
                                            <TextField
                                                label={`Size ${index + 1}`}
                                                value={size}
                                                onChange={(e) => handleInputChangeSize(index, e)}
                                                size="small"
                                                className="w-full"
                                            />
                                            <Button variant="outlined" color="error" onClick={() => removeSizeField(index)}>
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button variant="contained" onClick={addSizeField} className='w-full'>Add Size</Button>
                                    <TextareaAutosize placeholder="Enter product description..." className='w-full p-2 rounded-md border-[1px] border-gray-300' />
                                </div>
                                <div className="w-full flex justify-end gap-3 px-3 border-t-[1px] pt-3 border-gray-200">
                                    <Button onClick={handleCloseModal} variant='contained' size='small' color="error">
                                        <CircleX /> Cancel
                                    </Button>
                                    <Button type='submit' variant='contained' size='small'>
                                        <PackagePlus /> Create
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
