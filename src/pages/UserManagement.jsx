import React from 'react';
import TableComponent from '../components/Table';

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
        name: 'Item 5' 
    },
];

export default function UserManagement() {
    return (
        <div className='w-full h-fit p-2'>
            <TableComponent columns={columns} data={data} per_page={2} />
        </div>
    );
}
