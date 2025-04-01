import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import NoImage from '../assets/images/no_image.jpg';
import { Button, Collapse, IconButton } from '@mui/material';
import { FilePenLine, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

const TableComponent = ({ columns, data, per_page, onEdit, onDelete, expandable }) => {
    const [page, setPage] = React.useState(1);
    const [expandedRows, setExpandedRows] = React.useState({});

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const toggleExpand = (rowId) => {
        setExpandedRows((prev) => ({
            ...prev,
            [rowId]: !prev[rowId],
        }));
    };
    
    const paginatedRows = data.slice((page - 1) * per_page, page * per_page);

    return (
        <div className="border-[1px] border-gray-200 p-2 rounded-md overflow-hidden bg-[#E4EFE7]">
            <Table sx={{ minWidth: 650 }} size="small" className='border-[1px] border-black bg-white rounded-md overflow-hidden shadow-none'>
                <TableHead className='bg-[#5F99AE]'>
                    <TableRow className='font-semibold text-[.8rem] uppercase'>
                        {expandable && <TableCell></TableCell>}
                        {columns.map((column) => (
                            <TableCell key={column.id} align={column.align}>
                                <span className='text-white'>{column.label}</span>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedRows.map((row, index) => (
                        <React.Fragment key={index}>
                            <TableRow>
                                {expandable && (
                                    <TableCell>
                                        <IconButton size="small" onClick={() => toggleExpand(row.id)}>
                                            {expandedRows[row.id] ? <ChevronUp /> : <ChevronDown />}
                                        </IconButton>
                                    </TableCell>
                                )}
                                {columns.map((column) => (
                                    <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth || 100 }}>
                                        {column.id === 'image' ? (
                                            <div className="w-[60px] h-[60px] rounded-full border-gray-200 border-[1px] overflow-hidden">
                                                <img src={row[column.id] || NoImage} alt="row image" className='w-full h-full object-cover'/>
                                            </div>
                                        ) : column.id === 'action' ? (
                                            <div className="flex justify-start">
                                                <Button color="primary" size="small" onClick={() => onEdit(row.id)} sx={{ mr: 1 }}>
                                                    <FilePenLine />
                                                </Button>
                                                <Button color="error" size="small" onClick={() => onDelete(row.id)}>
                                                    <Trash2 />
                                                </Button>
                                            </div>
                                        ) : (
                                            row[column.id] || '---'
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                            {expandable && (
                                <TableRow>
                                    <TableCell colSpan={columns.length + 1} style={{ padding: 0 }}>
                                        <Collapse in={expandedRows[row.id]} timeout="auto" unmountOnExit>
                                            <div className="p-4 bg-gray-100">{expandable(row)}</div>
                                        </Collapse>
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
            <Pagination
                count={Math.ceil(data.length / per_page)}
                page={page}
                onChange={handlePageChange}
                color="secondary"
                sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
        </div>
    );
};

export default TableComponent;
