import React from 'react';
import TableComponent from '../components/Table';
import SeleMenu from '../components/SelectMenu'
import { useState } from 'react';
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
import ChoosePhoto from '../components/ChoosePhoto';

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
    }
];

//style
export default function ProductList() {
    const [selectedAge, setSelectedAge] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const ageOptions = [
        { value: 10, label: 'Ten' },
        { value: 20, label: 'Twenty' },
        { value: 30, label: 'Thirty' },
    ];
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        address: '',
        profilePhoto: null,
    });
    /**
     * begin::some logical in this page
     */
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    //input handle change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value, // Update the specific field based on its name
        }));
    };

    //selct handle change
    const handleAgeChange = (newValue) => {
        setSelectedAge(newValue);
        console.log(newValue)
    };

    //file handle channge
    const handleFileChange = (file) => {
        setFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setFilePreview(reader.result);
        };
        if (file) reader.readAsDataURL(file); 
    };

    //submit handle 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data:', formData);
        // Submit the form data to the server or handle the logic here
    };
    /**
     * End::some logical in this page
     */
return (
    <div 
        className='w-full h-full'>
        <div 
            className="w-full p-2 bg-white rounded-md flex items-center justify-between gap-2 mt-3 border-gray-200 border-[1px]">
            <div className="w-fit flex gap-3">
                <div className="w-[300px]">
                    <SeleMenu
                        label="Age"
                        data={ageOptions}
                        value={selectedAge}
                        onChange={handleAgeChange}/>
                </div>
                <div className="w-[300px]">
                    <SeleMenu
                        label="Age"
                        data={ageOptions}
                        value={selectedAge}
                        onChange={handleAgeChange}/>
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
                    className="w-full h-fit pt-6 pb-3 px-3">
                    <form 
                        onSubmit={handleSubmit}
                        className='w-full flex flex-wrap gap-3'>
                        <ChoosePhoto 
                            name="coverPhoto"
                            onFileChange={handleFileChange} />
                        <TextField
                            label="Product Name"
                            id="outlined-size-small"
                            size="small"
                            name='name'
                            value={formData.name}
                            onChange={handleInputChange}
                            className='w-[calc(99%/2)]'
                            />
                        <TextField
                            label="Size"
                            id="outlined-size-small"
                            value={formData.name}
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
