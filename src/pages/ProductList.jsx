import React, { useState, useEffect } from 'react';
import TableComponent from '../components/Table';
import SeleMenu from '../components/SelectMenu';
import { 
    Plus, 
    CircleX, 
    PackagePlus, 
    Trash2 
} from 'lucide-react';
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

const columns = [
    { id: 'image', label: 'Image', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'price', label: 'Price', align: 'left' },
    { id: 'description', label: 'Description', align: 'left' },
    { id: 'rating', label: 'Rating', align: 'left' },
    { id: 'color', label: 'Color', align: 'left' },
    { id: 'category', label: 'Category', align: 'left' },
    { id: 'product_type', label: 'Product Type', align: 'left' },
    { id: 'action', label: 'Action', align: 'left' }
];

export default function ProductList() {
    const [selectType, setSelectedType] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [sizes, setSizes] = useState([""]);
    const [images, setImages] = useState([]);
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
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
    const handleCloseModal = () => {
        setOpenModal(false); 
        setFormData({});
        setSizes([]);
        setImages([]);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

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

    const handleFileChange = (files) => {
        setImages(files);
    };

    // Fetch data
    const fetchData = async () => {
        try {
            const result = await apiHandle.get('products');
            setData(result.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

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
    
        sizes.forEach(size => {
            formDataToSend.append('sizes[]', size);
        });
    
        images.forEach((image) => {
            formDataToSend.append('images[]', image);
        });
    
        try {
            let response;
            if (formData.id) {
                response = await apiHandle.put(`products/${formData.id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                Message('Product updated successfully!', 'success');
            } else {
                response = await apiHandle.post('products', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                Message('Product created successfully!', 'success');
            }
    
            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error('Error processing product:', error.response?.data);
            Message('Error processing product.', 'error');
        }
    };

    // Edit Product
    const handleEdit = async (id) => {

        setOpenModal(true);
        try {
            const response = await apiHandle.get(`products/${id}`);
            const product = response;
    
            setFormData({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                color: product.color,
                brand: product.brand,
                category: product.category,
                rating: product.rating,
                product_type: product.product_type,
            });
            setSizes(product.sizes || []);
            setImages(product.image_urls || []);
            setSelectedType(product.product_type);
        } catch (error) {
            console.error('Error fetching product for edit:', error);
        }
    };

    // Delete Product
    const handleDelete = async (id) => {
        try {
            await apiHandle.delete(`products/${id}`);
            Message('Product deleted successfully!', 'success');
            fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
            Message('Error deleting product.', 'error');
        }
    };
    return (
        <div 
            className="w-full h-[81.5vh]">
            <div 
                className="w-full p-2 bg-white rounded-md flex items-center justify-between gap-2 mt-3 border-gray-200 border-[1px]">
                <div 
                    className="w-fit flex gap-3">
                    <TextField
                        label="Search Product"
                        id="outlined-size-small"
                        size="small"
                        className="w-[calc(98%/2)]"
                    />
                    <div className="w-[300px]">
                        <SeleMenu
                            label="Product Type"
                            data={productType}
                            value={selectType}
                            onChange={setSelectedType}/>
                    </div>
                </div>
                <Button 
                    onClick={handleOpenModal} 
                    variant="contained" 
                    size="small">
                    <Plus />
                </Button>
            </div>
            <div className="w-full mt-3 h-full overflow-auto">
                <TableComponent
                    columns={columns}
                    data={data}
                    per_page={10}
                    onEdit={handleEdit}
                    onDelete={handleDelete}/>
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
                className="w-full flex items-center justify-center">
                <Fade in={openModal}>
                    <Box 
                        className="w-[1000px] bg-white z-50 overflow-hidden rounded-md shadow-md border-gray-200 border-[1px]">
                        <div 
                            className="w-full px-4 py-1 bg-[#6592a3] text-white flex justify-between items-center">
                            <Typography 
                                id="transition-modal-title" 
                                variant="h6">
                                {formData.id ? "Edit Product" : "Create Product"}
                            </Typography>
                            <CircleX 
                                className="cursor-pointer" 
                                onClick={handleCloseModal} />
                        </div>
                        <div 
                            className="w-full h-fit pt-6 pb-3 px-3 max-h-[80vh] overflow-auto">
                            <form 
                                onSubmit={handleSubmit} 
                                className="w-full flex flex-wrap gap-3">
                                <div 
                                    className="w-[200px]">
                                    <ChooseMultiplePhoto 
                                        onFileChange={handleFileChange} 
                                        name="photos" />
                                </div>
                                <div className="w-[calc(97%-200px)] flex flex-wrap gap-2">
                                    <TextField
                                        label="Name"
                                        size="small"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"
                                    />
                                    <TextField
                                        label="Price"
                                        size="small"
                                        name="price"
                                        value={formData.price || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"
                                    />
                                    <TextField
                                        label="Color"
                                        size="small"
                                        name="color"
                                        value={formData.color || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"
                                    />
                                    <TextField
                                        label="Brand"
                                        size="small"
                                        name="brand"
                                        value={formData.brand || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"
                                    />
                                    <TextField
                                        label="Category"
                                        size="small"
                                        name="category"
                                        value={formData.category || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"
                                    />
                                    <TextField
                                        label="Rating"
                                        size="small"
                                        name="rating"
                                        value={formData.rating || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"
                                    />
                                    <TextField
                                        label="Stock"
                                        size="small"
                                        name="stock"
                                        value={formData.stock || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"
                                    />
                                    <SeleMenu
                                        label="Product Type"
                                        data={productType}
                                        value={selectType}
                                        onChange={setSelectedType}
                                        className="w-[calc(98.5%/2)]"/>
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
                                    <Button variant="contained" onClick={addSizeField} className="w-full">
                                        Add Size
                                    </Button>
                                    <TextareaAutosize
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter product description..."
                                        className="w-full p-2 rounded-md border-[1px] border-gray-300"
                                    />
                                </div>
                                <div className="w-full flex justify-end gap-3 px-3 border-t-[1px] pt-3 border-gray-200">
                                    <Button 
                                        onClick={handleCloseModal} 
                                        variant="contained" 
                                        size="small" 
                                        color="error">
                                        <CircleX />&ensp; Cancel
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        variant="contained" 
                                        size="small">
                                        <PackagePlus />&ensp; {formData.id ? 'Update' : 'Create'}
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
