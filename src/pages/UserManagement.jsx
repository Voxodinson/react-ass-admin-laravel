import React from 'react';
import TableComponent from '../components/Table';
import SeleMenu from '../components/SelectMenu'
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
    const [selectedAge, setSelectedAge] = React.useState('');

    const handleAgeChange = (newValue) => {
        setSelectedAge(newValue);
    };

    const ageOptions = [
        { value: 10, label: 'Ten' },
        { value: 20, label: 'Twenty' },
        { value: 30, label: 'Thirty' },
    ];
    return (
        <div 
            className='w-full h-fit'>
            <div 
                className="w-full h-fit p-2 bg-white rounded-md flex gap-2 mt-3 border-gray-200 border-[1px]">
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
            <div className="w-full mt-3 ">
                <TableComponent 
                    columns={columns} 
                    data={data} 
                    per_page={2} />
            </div>
        </div>
    );
}
