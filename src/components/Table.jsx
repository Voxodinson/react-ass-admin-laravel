import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import NoImage from '../assets/images/no_image.jpg'
import { Button } from '@mui/material';
import { 
    FilePenLine, 
    Trash2 
} from 'lucide-react';
const TableComponent = ({ columns, data, per_page, onEdit, onDelete }) => {
    const [page, setPage] = React.useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedRows = data.slice((page - 1) * per_page, page * per_page);

    return (
        <div className="border-[1px] border-gray-200 p-2 rounded-md overflow-hidden bg-[#E4EFE7]">
            <Table 
                sx={{ minWidth: 650 }} 
                size="small" 
                aria-label="a dense table"
                className='border-[1px] border-black bg-white rounded-md overflow-hidden shadow-none'>
                <TableHead
                    className='bg-[#5F99AE]'>
                    <TableRow className='font-semibold text-[.8rem] uppercase'>
                        {columns.map((column) => (
                            <TableCell 
                                key={column.id} 
                                align={column.align}>
                                <span className='text-white'>
                                    {column.label}
                                </span>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedRows.map((row, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            {columns.map((column) => (
                                <TableCell 
                                    key={column.id} 
                                    align={column.align}
                                    sx={{ minWidth: column.minWidth || 100 }}>
                                    {column.id === 'image' ? (
                                        <div className="w-[60px] h-[60px] rounded-full border-gray-200 border-[1px] overflow-hidden">
                                            <img 
                                                src={row[column.id] || NoImage} 
                                                alt="row image" 
                                                className='w-full h-full object-cover'/>
                                        </div>
                                    ) : column.id === 'action' ? (
                                        <div className="flex justify-start">
                                            <Button 
                                                color="primary" 
                                                size="small"
                                                onClick={() => onEdit(row.id)}
                                                sx={{ mr: 1 }}>
                                                <FilePenLine />
                                            </Button>
                                            <Button 
                                                color="error" 
                                                size="small"
                                                onClick={() => onDelete(row.id)}>
                                                <Trash2 />
                                            </Button>
                                        </div>
                                    ) : (
                                        row[column.id] || '---'
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination
                count={Math.ceil(data.length / per_page)}
                page={page}
                onChange={handlePageChange}
                color="secondary"
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}/>
        </div>
    );
};

export default TableComponent;
