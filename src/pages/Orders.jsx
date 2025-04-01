import React, { useState, useEffect } from 'react';
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

const columns = [
    { id: 'transaction_id', label: 'ID', align: 'left' },
    { id: 'user_name', label: 'Name', align: 'left' },
    { id: 'user_email', label: 'Email', align: 'left' },
    { id: 'total_amount', label: 'Total', align: 'left' },
    { id: 'payment_method', label: 'Method', align: 'left' },
    { id: 'payment_status', label: 'Status', align: 'left' },
    { id: 'shipping_address', label: 'Shipping Address', align: 'left' }
];

export default function ProductList() {
    const [selectType, setSelectedType] = useState('men');
    const [openModal, setOpenModal] = useState(false);
    const [sizes, setSizes] = useState([""]);
    const [images, setImages] = useState([]);
    const [data, setData] = useState([]);
  

    const productType = [
        { value: 'men', label: 'Men' },
        { value: 'women', label: 'Women' },
        { value: 'kids', label: 'Kids' }
    ];

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);


 

    // Fetch data
    const fetchData = async () => {
        try {
            const result = await apiHandle.get('orders');
            setData(result.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

   

    return (
        <div className="w-full h-[81.5vh]">
            <div className="w-full p-2 bg-white rounded-md flex items-center justify-between gap-2 mt-3 border-gray-200 border-[1px]">
                <div className="w-fit flex gap-3">
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
                            onChange={setSelectedType}
                        />
                    </div>
                </div>
            </div>
            <div className="w-full mt-3 h-full overflow-auto">
                <TableComponent
                    columns={columns}
                    data={data}
                    per_page={10}
                    onEdit={()=> {}}
                    onDelete={()=> {}}
                />
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
                className="w-full flex items-center justify-center"
            >
                <Fade in={openModal}>
                    <Box className="w-[1000px] bg-white z-50 overflow-hidden rounded-md shadow-md border-gray-200 border-[1px]">
                        <div className="w-full px-4 py-1 bg-[#6592a3] text-white flex justify-between items-center">
                            <Typography id="transition-modal-title" variant="h6">
                                Order Detail
                            </Typography>
                            <CircleX className="cursor-pointer" onClick={handleCloseModal} />
                        </div>
                        <div className="w-full h-fit pt-6 pb-3 px-3 max-h-[80vh] overflow-auto">
                            
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
