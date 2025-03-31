import React from 'react';
import TableComponent from '../components/Table';
import SeleMenu from '../components/SelectMenu'
import { useState, useEffect } from 'react';
import { 
    Plus, 
    CircleX,
    PackagePlus
} from 'lucide-react';

//MUI import
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import  { Button,TextareaAutosize } from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ChooseMultiplePhoto from '../components/ChooseMultiplePhoto';

const columns = [
    { 
        id: 'name', 
        label: 'Name', 
        align: 'left' 
    },
    { 
        id: 'image', 
        label: 'Image', 
        align: 'left' 
    },
];

const data = [
    { 
        image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg', 
        name: 'Item 3' 
    },
    { 
        image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg', 
        name: 'Item 3' 
    },
    { 
        image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg', 
        name: 'Item 3' 
    },
    { 
        image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg', 
        name: 'Item 3' 
    }
];

//style
export default function ProductList() {
    const [selectType, setSelectedType] = React.useState('');
    
    const [openModal, setOpenModal] = React.useState(false);
    const productType = [
        { value: 'men', label: 'Men' },
        { value: 'women', label: 'Women' }
    ];
    
    /**
     * begin::some logical in this page
     */
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    //input handle change
    const handleSubmit = () => {
        console.log(formData)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value, // Update the specific field based on its name
        }));
    };

    //selct handle change
    const handleSelectType = (newValue) => {
        setSelectedType(newValue);
    };

    //file handle channge
    const [images, setImages] = useState([]);

    const handleFileChange = (files) => {
        console.log('Selected files:', files);
        setImages(files);
    };
    /**
     * End::some logical in this page
     */

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        address: '',
        profilePhoto: useEffect(() => {}, [images])
        
    });
return (
    <div 
        className='w-full h-[81.5vh]'>
        <div 
            className="w-full p-2 bg-white rounded-md flex items-center justify-between gap-2 mt-3 border-gray-200 border-[1px]">
            <div className="w-fit flex gap-3">
                <TextField
                    label="Search Product"
                    id="outlined-size-small"
                    value={formData.name}
                    onChange={handleInputChange}
                    size="small"
                    className='w-[calc(98%/2)]'/>
                <div className="w-[300px]">
                    <SeleMenu
                        label="Product Type"
                        data={productType}
                        value={selectType}
                        onChange={handleSelectType}/>
                </div>
            </div>
            <Button
                onClick={handleOpenModal}
                variant='contained'
                size='small'>
                <Plus />
            </Button>
        </div>
        <div className="w-full mt-3 h-full overflow-auto ">
            <TableComponent 
                columns={columns} 
                data={data} 
                per_page={10} />
        </div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }} 
            className='w-full flex items-center justify-center'>
            <Fade 
                in={openModal}>
            <Box 
                className="w-[1000px] bg-white z-50 overflow-hidden rounded-md shadow-md border-gray-200 border-[1px]">
                <div 
                    className="w-full px-4 py-1  bg-purple-400 text-white flex justify-between items-center">
                    <Typography 
                        id="transition-modal-title" 
                        variant="h6"
                        component="h6">
                        Create Product Modal
                    </Typography>
                    <CircleX
                        className=' cursor-pointer' 
                        onClick={handleCloseModal}/>
                </div>
                <div 
                    className="w-full h-fit pt-6 pb-3 px-3 max-h-[80vh] overflow-auto">
                    <form 
                        onSubmit={handleSubmit}
                        className='w-full flex flex-wrap items-start justify-start gap-3'>
                        <div className="w-[200px]">
                            <ChooseMultiplePhoto 
                                onFileChange={handleFileChange} 
                                name="photos"/>
                        </div>
                        <div className="w-[calc(97%-200px)] flex items-start justify-start gap-2 flex-wrap">
                            <TextField
                                label="Product Name"
                                id="outlined-size-small"
                                size="small"
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                                className='w-[calc(99%/2)]'/>
                            <TextField
                                label="Size"
                                id="outlined-size-small"
                                value={formData.size}
                                onChange={handleInputChange}
                                size="small"
                                className='w-[calc(98%/2)]'/>
                            <TextField
                                label="Size"
                                id="outlined-size-small"
                                defaultValue="Small"
                                size="small"
                                className='w-[calc(99%/2)]'
                                />
                            <TextField
                                label="Size"
                                id="outlined-size-small"
                                defaultValue="Small"
                                size="small"
                                className='w-[calc(98%/2)]'/>
                        </div>
                       
                        <TextareaAutosize
                            maxRows={4}
                            aria-label="maximum height"
                            placeholder="Enter product description here..."
                            className='w-full p-2 rounded-md border-[1px] border-gray-300'/>
                        <div 
                            className="w-full flex justify-end gap-3 border-t-[1px] pt-3 border-gray-200">
                            <Button
                                onClick={handleCloseModal}
                                variant='contained'
                                size='small'
                                color="error">
                                <CircleX />&ensp; Cancel
                            </Button>
                            <Button
                                type='submit'
                                variant='contained'
                                size='small'>
                                <PackagePlus />&ensp; Create
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
