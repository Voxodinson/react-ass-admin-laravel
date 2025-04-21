import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    Modal,
    Fade,
    Backdrop,
    CircularProgress,
} from '@mui/material';
import {
    CircleX,
    PackagePlus,
    Trash2
} from 'lucide-react';
import apiHandle from '../services/apiHandle';
import NoImage from '../assets/images/no_image.jpg';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,
};

const CompanyProfileFormModal = ({ open, onClose, onSubmit, initialValues, isEdit }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: [''],
        address: '',
        website: '',
        description: '',
        photo: null,
        store_locations: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        if (initialValues) {
            setFormData({
                name: initialValues.name || '',
                email: initialValues.email || '',
                phone: Array.isArray(initialValues.phone) ? initialValues.phone : [''],
                address: initialValues.address || '',
                website: initialValues.website || '',
                description: initialValues.description || '',
                photo: null,
                store_locations: initialValues.store_locations || '',
            });
            setPhotoPreview(initialValues.photo_url || null);
        } else {
            setFormData({
                name: '',
                email: '',
                phone: [''],
                address: '',
                website: '',
                description: '',
                photo: null,
                store_locations: '',
            });
            setPhotoPreview(null);
        }
        setError(null);
    }, [initialValues, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePhoneChange = (index, event) => {
        const { value } = event.target;
        const newPhoneNumbers = [...formData.phone];
        newPhoneNumbers[index] = value;
        setFormData(prevData => ({
            ...prevData,
            phone: newPhoneNumbers,
        }));
    };

    const handleAddPhone = () => {
        setFormData(prevData => ({
            ...prevData,
            phone: [...prevData.phone, ''],
        }));
    };

    const handleRemovePhone = (index) => {
        const newPhoneNumbers = formData.phone.filter((_, i) => i !== index);
        setFormData(prevData => ({
            ...prevData,
            phone: newPhoneNumbers,
        }));
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setFormData(prevData => ({
            ...prevData,
            photo: file,
        }));

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(initialValues?.photo_url || null);
        }
    };

    const handleRemoveImage = () => {
        setPhotoPreview(null);
        setFormData(prevData => ({
            ...prevData,
            photo: null,
        }));
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('address', formData.address);
            formDataToSend.append('website', formData.website);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('store_locations', formData.store_locations); // Send as string
            formData.phone.forEach(phone => formDataToSend.append('phone[]', phone));

            if (formData.photo) {
                formDataToSend.append('photo', formData.photo);
            }

            let response;
            if (isEdit && initialValues?.id) {
                formDataToSend.append('_method', 'PUT');
                response = await apiHandle.post(`companies/${initialValues.id}`, formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                onSubmit(response.data);
            } else {
                response = await apiHandle.post('companies', formDataToSend, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                onSubmit(response.data);
            }

            onClose();
        } catch (err) {
            console.error('Error creating/updating company profile:', err);
            setError(err.response?.data?.message || 'Failed to save company profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            className='flex items-center justify-center'>
            <Fade in={open}>
                <Box 
                    sx={style} 
                    className="rounded-md max-h-[90vh] overflow-y-auto  shadow-md p-3">
                    <Typography
                        variant="h6"
                        gutterBottom>
                        {isEdit ? 'Edit Company Profile' : 'Create Company Profile'}
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className='flex flex-wrap w-full gap-3'>
                        <div 
                            className="w-full flex-col flex items-center justify-center">
                            <Box 
                                className="w-[150px] relative h-[150px] rounded-full border-[1px] border-gray-200">
                                <img
                                    src={photoPreview || NoImage}
                                    alt="Profile Preview"
                                    className='w-full h-full object-cover rounded-full'/>
                                {
                                    photoPreview && (
                                        <CircleX 
                                            onClick={() => handleRemoveImage()}
                                            size={24} 
                                            className=' absolute bottom-4.5 cursor-pointer right-1 z-20 bg-white text-red-500 rounded-full'/>
                                    )
                                }
                            </Box>
                            <FormControl 
                                fullWidth 
                                margin="normal">
                                <OutlinedInput
                                    id="profile"
                                    name="profile"
                                    type="file"
                                    size='small'
                                    onChange={handlePhotoChange}
                                    inputProps={{ accept: 'image/*' }}/>
                                <FormHelperText>
                                Upload a company logo or image.
                                </FormHelperText>
                            </FormControl>
                        </div>
                        <TextField
                            required
                            label="Company Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-[calc(50%-8px)]"/>
                        <TextField
                            label="Email Address"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-[calc(50%-8px)]"/>
                        <div
                            className='flex gap-3 flex-wrap'>
                            <InputLabel
                                htmlFor="phone">
                                Phone Numbers
                            </InputLabel>
                            <div
                                className="w-full flex gap-3 flex-wrap">
                                {formData.phone.map((number, index) => (
                                    <Box
                                        key={index}
                                        className="flex w-full sm:w-[calc(50%-8px)] gap-3">
                                        <OutlinedInput
                                            label={`Phone Number ${index + 1}`}
                                            value={number}
                                            onChange={(e) => handlePhoneChange(index, e)}
                                            aria-describedby={`phone-helper-text-${index}`}
                                            className='w-[calc(100%-40px)]'/>
                                        {formData.phone.length > 1 && (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                onClick={() => handleRemovePhone(index)}>
                                                <Trash2 size={18} />
                                            </Button>
                                        )}
                                    </Box>
                                ))}
                                <Button
                                    onClick={handleAddPhone}
                                    size="small">
                                    Add Phone Number
                                </Button>
                            </div>
                            <FormHelperText
                                id={`phone-helper-text`}>
                                Enter company phone numbers.
                            </FormHelperText>
                        </div>
                        <TextField
                            label="Website URL"
                            name="website"
                            type="url"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full"/>
                        <TextField
                            label="Address"
                            name="address"
                            multiline
                            rows={2}
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full"/>
                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full"
                        />
                        <TextField
                            label="Store Locations"
                            name="store_locations"
                            multiline
                            rows={2}
                            value={formData.store_locations}
                            onChange={handleChange}
                            className="w-full"
                        />
                        {error && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}

                        <div className="w-full flex justify-end gap-3 border-t-[1px] pt-3 border-gray-200">
                            <Button
                                onClick={onClose}
                                variant="contained"
                                size="small"
                                color="error">
                                <CircleX />&ensp; Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                size="small">
                                <PackagePlus />&ensp; {isEdit ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
};

// Component to display company information
const CompanyProfileDisplay = ({ data }) => {
    if (!data) {
        return <Typography variant="body1">No company profile available.</Typography>;
    }

    const phoneNumbers = Array.isArray(data.phone) ? data.phone.join(', ') : data.phone || 'N/A';

    return (
        <div
            className="w-full flex flex-col items-center justify-center gap-3 bg-white p-3 rounded-md">
            <div
                className="w-[200px] h-[200px] rounded-md overflow-hidden border-gray-200 border-[1px] bg-white">
                <img
                    src={data.photo_url}
                    alt="Company Logo"
                    className='w-full h-full object-cover' />
            </div>
            <div
                className=" w-[calc(100%-200px)]">
                <h3 className='text-[1.5rem] w-full text-center font-semibold'>
                    {data.name}
                </h3>

                <div className="flex justify-between border-b-[1px] border-gray-200 py-1 gap-3 mt-6">
                    <strong>
                        Email:
                    </strong>
                    <p>
                        {data.email}
                    </p>
                </div>
                <div className="flex gap-3 justify-between border-b-[1px] border-gray-200 py-1 ">
                    <strong>
                        Phone:
                    </strong>
                    <p>
                        {phoneNumbers}
                    </p>
                </div>
                <div className="flex gap-3 justify-between border-b-[1px] border-gray-200 py-1 ">
                    <strong>
                        Website Url:
                    </strong>
                    <a
                        href={data.website}
                        target='__blank'
                        className='hover:underline hover:text-blue-400'>
                        {data.website}
                    </a>
                </div>
                <div className="flex gap-3 justify-between border-b-[1px] border-gray-200 py-1 ">
                    <strong>
                        Address:
                    </strong>
                    <p>
                        {data.address}
                    </p>
                </div>
                <div className="flex gap-3 justify-between border-b-[1px] border-gray-200 py-1 ">
                    <strong>
                        Description:
                    </strong>
                    <p>
                        {data.description}
                    </p>
                </div>
                {data.store_locations && (
                    <div className="flex gap-3 justify-between border-b-[1px] border-gray-200 py-1 ">
                        <strong>
                            Store Locations:
                        </strong>
                        <p>
                            {data.store_locations}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const CompanyProfilePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [companyData, setCompanyData] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCompanyData = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiHandle.get('companies/1');
            setCompanyData(result);
        } catch (error) {
            console.error("Error fetching company:", error);
            setError("Failed to load company profile.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanyData();
    }, []);

    const handleOpenCreateModal = () => {
        setIsEditMode(false);
        setCompanyData(null); // Reset initialValues for create
        setIsModalOpen(true);
    };

    const handleOpenEditModal = () => {
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveProfile = (newData) => {
        setCompanyData(newData);
        fetchCompanyData(); // Refresh data after save
    };

    return (
        <div className='w-full flex flex-col'>
            <div
                className="w-full p-2 mb-3 bg-white rounded-md flex items-center justify-end gap-2 mt-3 border-gray-200 border-[1px]">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenEditModal}>
                    Edit Company Profile
                </Button>
            </div>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <CompanyProfileDisplay
                    data={companyData} />
            )}
            <CompanyProfileFormModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSaveProfile}
                initialValues={companyData}
                isEdit={isEditMode && companyData !== null}/>
        </div>
    );
};

export default CompanyProfilePage;