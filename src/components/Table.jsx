import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';

const TableComponent = ({ columns, data, per_page }) => {
    const [page, setPage] = React.useState(1);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const paginatedRows = data.slice((page - 1) * per_page, page * per_page);

    return (
        <div className="border-[1px] border-gray-200 p-2 rounded-md overflow-hidden bg-purple-100">
            <Table 
                sx={{ minWidth: 650 }} 
                size="small" 
                aria-label="a dense table"
                className='border-[1px] border-black bg-white rounded-md overflow-hidden shadow-none'>
                <TableHead
                    className='bg-purple-400'>
                    <TableRow
                        className=' font-semibold text-[.8rem uppercase'>
                        {columns.map((column) => (
                            <TableCell 
                                key={column.id} 
                                align={column.align}>
                                <span
                                    className='text-white !important'>
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
                                <TableCell key={column.id} align={column.align}>
                                    {column.id === 'image' ? (
                                        <img 
                                            src={row[column.id]} 
                                            alt="row image" 
                                            className='w-[60px] h-[60px] object-cover rounded-md'/>
                                    ) : (
                                        row[column.id]
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
