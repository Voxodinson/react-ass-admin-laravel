import React, { useState, useEffect } from 'react';
import TableComponent from '../components/Table';
import SeleMenu from '../components/SelectMenu';
import apiHandle from '../services/apiHandle';
import TextField from '@mui/material/TextField';
import NoImage from '../assets/images/no_image.jpg'
const columns = [
    { id: 'user_name', label: 'Name', align: 'left' },
    { id: 'user_email', label: 'Email', align: 'left' },
    { id: 'total_amount', label: 'Total', align: 'left' },
    { id: 'payment_method', label: 'Method', align: 'left' },
    { id: 'payment_status', label: 'Status', align: 'left' },
];

export default function Feedback() {
    const [selectType, setSelectedType] = useState('men');
    const [data, setData] = useState([]);
  

    const productType = [
        { value: 'men', label: 'Men' },
        { value: 'women', label: 'Women' },
        { value: 'kids', label: 'Kids' }
    ];

    // Fetch data
    const fetchData = async () => {
        try {
            const result = await apiHandle.get('orders');
            setData(result.data);
            console.log(result)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

   

    const expandableContent = (row) => (
        <div>
            <div 
                className="w-full flex flex-col gap-2">
                <p>
                    <strong>Address:</strong> 
                    &ensp; {row.shipping_address}, {row.shipping_city}, {row.shipping_zip}, {row.shipping_country}
                </p>
            </div>
            <div 
                className="w-full flex gap-3 py-3 border-[1px] border-dashed rounded-md border-[#5F99AE] mt-3 p-3">
                {row.order_items.map((item, idx) => (
                    <div 
                        key={idx}
                        className="w-[200px] shadow-sm flex items-start justify-start flex-col gap-1 p-2 rounded-md h-fit border-gray-200 border-[1px] bg-white">
                        <div 
                            className="w-full h-[100px] border-[1px] border-gray-200 rounded-md overflow-hidden">
                            <img 
                                src={item.image || NoImage} 
                                alt="" 
                                className='w-full h-full object-cover'/>
                        </div>
                        <h3 className=' capitalize'>
                            <strong>Name:</strong>
                            &ensp;
                            {item.product_name}
                        </h3>
                        <p>
                            <strong>Qty:</strong>
                            &ensp;{item.quantity}
                        </p>
                        <p>
                            <strong>Color:</strong>
                            &ensp;{item.color}</p>
                        <p>
                            <strong>Size:</strong>
                            &ensp;{item.size}
                        </p>
                    </div>
                ))}
                
            </div>
            <div className="flex gap-6 mt-3">
                <p>
                    <strong>Order At: </strong>{row.created_at}
                </p>
                <p>
                    <strong>Update At: </strong> {row.updated_at}
                </p>
            </div>
        </div>
    );

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
                    expandable={expandableContent}
                />
            </div>
        </div>
    );
}
