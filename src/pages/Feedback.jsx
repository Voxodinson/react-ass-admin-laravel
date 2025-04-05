import React, { useState, useEffect } from 'react';
import TableComponent from '../components/Table';
import SeleMenu from '../components/SelectMenu';
import apiHandle from '../services/apiHandle';
import TextField from '@mui/material/TextField';
import NoImage from '../assets/images/no_image.jpg'
const columns = [
    { id: 'image', label: 'Image', align: 'left' },
    { id: 'user_name', label: 'Name', align: 'left' },
    { id: 'title', label: 'Email', align: 'left' },
    { id: 'description', label: 'Total', align: 'left' },
];

export default function Feedback() {
    const [data, setData] = useState([]);


    // Fetch data
    const fetchData = async () => {
        try {
            const result = await apiHandle.get('feedbacks');
            setData(result.data);
            console.log(result)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

 
    return (
        <div className="w-full h-[81.5vh]">
            <div className="w-full mt-3 h-full overflow-auto">
                <TableComponent
                    columns={columns}
                    data={data}
                    per_page={10}
                    onEdit={()=> {}}
                    onDelete={()=> {}}
                />
            </div>
        </div>
    );
}
