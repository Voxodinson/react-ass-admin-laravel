import React, { useState, useEffect, useRef } from 'react';
import TableComponent from '../components/Table';
import SelectMenu from '../components/SelectMenu';
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    borderRadius: '8px',
};

export default function ProductList() {
    const [selectType, setSelectedType] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [sizes, setSizes] = useState([""]);
    const [newImages, setNewImages] = useState([]); // For newly selected images
    const [existingImages, setExistingImages] = useState([]); // Array of existing image URLs
    const [previewNewImages, setPreviewNewImages] = useState([]);
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
    const newImageInputRef = useRef(null);

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
        setNewImages([]);
        setExistingImages([]);
        setPreviewNewImages([]);
        setSelectedType('');
        if (newImageInputRef.current) {
            newImageInputRef.current.value = ""; // Reset file input
        }
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

    const handleNewImageChange = (e) => {
        const files = Array.from(e.target.files);
        setNewImages(files);
        const previews = [];
        for (let i = 0; i < files.length; i++) {
            const reader = new FileReader();
            reader.onloadend = () => {
                previews.push(reader.result);
                if (previews.length === files.length) {
                    setPreviewNewImages(previews);
                }
            };
            reader.readAsDataURL(files[i]);
        }
    };
    const handleRemoveNewImage = (index) => {
        const updatedImages = newImages.filter((_, i) => i !== index);
        const updatedPreviews = previewNewImages.filter((_, i) => i !== index);
    
        setNewImages(updatedImages);
        setPreviewNewImages(updatedPreviews);
    };
    

    const handleRemoveExistingImage = (index) => {
        const updatedImages = existingImages.filter((_, i) => i !== index);
        setExistingImages(updatedImages);
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

        // Send the URLs of the images we want to KEEP
        existingImages.forEach(imageUrl => {
            formDataToSend.append('old_images[]', imageUrl);
        });

        for (let i = 0; i < newImages.length; i++) {
            formDataToSend.append('images[]', newImages[i]); // Key for new images
        }

        try {
            let response;
            if (formData.id) {
                formDataToSend.append('_method', 'PUT');
                response = await apiHandle.post(`products/${formData.id}`, formDataToSend, {
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
            });
            setSelectedType(product.product_type);
            setSizes(product.sizes || []);
            setExistingImages(product.image_urls || []); // Populate existingImages with URLs
            setNewImages([]);
            setPreviewNewImages([]);
            if (newImageInputRef.current) {
                newImageInputRef.current.value = ""; // Reset file input
            }
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
                        className="w-[calc(98%/2)]"/>
                    <div className="w-[300px]">
                        <SelectMenu
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
                    <Plus /> Create New Product
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
                        sx={style} 
                        className="bg-white z-50 overflow-hidden rounded-md shadow-md border-gray-200 border-[1px]">
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
                            className="w-full h-fit pt-3 pb-3 px-3 max-h-[80vh] overflow-auto">
                            <form
                                onSubmit={handleSubmit}
                                className="w-full flex flex-wrap gap-3">
                                <div 
                                    className="w-full p-3 rounded-md border-[1px] border-gray-200 bg-[#E4EFE7]">
                                    <Typography 
                                        variant="subtitle1" 
                                        gutterBottom>
                                        {formData.id ? "Update Images" : "Upload Images"}
                                    </Typography>
                                    {formData.id && existingImages.length > 0 && (
                                        <Typography 
                                            variant="subtitle2" 
                                            gutterBottom>
                                            Existing Images
                                        </Typography>
                                    )}
                                    <div 
                                        className="mb-2 flex flex-wrap p-3 rounded-md bg-white border-[1px] border-gray-200">
                                        {formData.id && existingImages.map((url, index) => (
                                            <div 
                                                key={index} 
                                                className="relative w-24 h-24 bg-white rounded-md overflow-hidden mr-2 mb-2 inline-block">
                                                <img 
                                                    src={url} 
                                                    alt={`existing-${index}`} 
                                                    className="w-full h-full object-cover" />
                                                <CircleX 
                                                    onClick={() => handleRemoveExistingImage(index)}
                                                    size={20} 
                                                    className=' absolute top-0.5 cursor-pointer right-0.5 z-20 bg-white text-red-500 rounded-full'/>
                                            </div>
                                        ))}
                                    </div>
                                    <Typography 
                                        variant="subtitle2" 
                                        gutterBottom>
                                        Add New Images
                                    </Typography>
                                    <div 
                                        className="mb-2 flex flex-wrap w-full gap-2 p-3 rounded-md bg-white">
                                        {previewNewImages.map((preview, index) => (
                                            <div 
                                                key={index} 
                                                className="relative w-24 h-24 bg-white border-[1px] border-gray-200 rounded-md overflow-hidden inline-block">
                                                <img 
                                                    src={preview} 
                                                    alt={`new-preview-${index}`} 
                                                    className="w-full h-full object-cover" />
                                                <CircleX 
                                                    onClick={() => handleRemoveNewImage(index)}
                                                    size={20} 
                                                    className=' absolute top-0.5 cursor-pointer right-0.5 z-20 bg-white text-red-500 rounded-full'/>
                                            </div>
                                        ))}
                                    </div>
                                    <input
                                        ref={newImageInputRef}
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleNewImageChange}
                                        className="w-full mb-2 p-3 rounded-md border-[1px] border-gray-200 bg-white"
                                    />
                                    {formData.id && existingImages.length > 0 && (
                                        <Typography 
                                            variant="caption" 
                                            color="textSecondary">
                                            You can remove existing images and add new ones.
                                        </Typography>
                                    )}
                                </div>
                                <div className="w-[calc(100% - 260px)] flex flex-wrap gap-y-3 gap-2">
                                    <TextField
                                        label="Name"
                                        size="small"
                                        name="name"
                                        value={formData.name || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"/>
                                    <TextField
                                        label="Price"
                                        size="small"
                                        name="price"
                                        value={formData.price || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"/>
                                    <TextField
                                        label="Color"
                                        size="small"
                                        name="color"
                                        value={formData.color || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"/>
                                    <TextField
                                        label="Brand"
                                        size="small"
                                        name="brand"
                                        value={formData.brand || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]" />
                                    <TextField
                                        label="Category"
                                        size="small"
                                        name="category"
                                        value={formData.category || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"/>
                                    <TextField
                                        label="Rating"
                                        size="small"
                                        name="rating"
                                        value={formData.rating || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"/>
                                    <TextField
                                        label="Stock"
                                        size="small"
                                        name="stock"
                                        value={formData.stock || ""}
                                        onChange={handleInputChange}
                                        className="w-[calc(98.5%/2)]"/>
                                    <div 
                                        className="w-[calc(98.5%/2)]">
                                        <SelectMenu
                                            label="Product For"
                                            data={productType}
                                            value={selectType}
                                            onChange={setSelectedType}
                                            className=""/>
                                    </div>
                                    <div 
                                        className="w-full border-b-[1px] border-gray-200">
                                        <Typography 
                                            variant="subtitle2" 
                                            gutterBottom>Sizes</Typography>
                                    </div>
                                    {sizes.map((size, index) => (
                                        <div 
                                            key={index} 
                                            className="w-[calc(98.5%/2)] flex gap-2">
                                            <TextField
                                                label={`Size ${index + 1}`}
                                                value={size}
                                                onChange={(e) => handleInputChangeSize(index, e)}
                                                size="small"
                                                className="w-full" />
                                            <Button 
                                                variant="outlined" 
                                                color="error" 
                                                onClick={() => removeSizeField(index)}>
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    ))}
                                    <Button 
                                        variant="contained" 
                                        onClick={addSizeField} 
                                        className="w-full">
                                        Add Size
                                    </Button>
                                    <TextareaAutosize
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Enter product description..."
                                        className="w-full p-2 rounded-md border-[1px] border-gray-300"/>
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
