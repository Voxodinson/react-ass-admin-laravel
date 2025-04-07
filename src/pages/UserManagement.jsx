import React, {
    useState,
    useEffect
} from 'react';
import TableComponent from '../components/Table';
import UserImage from '../assets/images/user_image.jpg';
import {
    Plus,
    CircleX,
    PackagePlus,
    Edit,
    Trash2
} from 'lucide-react';
import apiHandle from '../services/apiHandle';
import { Message } from '../context/AlertProvider';
import {
    Button,
    TextField,
    Modal,
    Box,
    Typography,
    Fade,
    Backdrop,
    Avatar,
    FormControl,
    OutlinedInput,
    FormHelperText,
} from '@mui/material';

const columns = [
    { id: 'profile', label: 'Profile', align: 'left', format: (value) => <Avatar src={value} /> },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'role', label: 'Role', align: 'left' },
    { id: 'address', label: 'Address', align: 'left' },
    { id: 'dob', label: 'Date of Birth', align: 'left' },
    {
        id: 'action',
        label: 'Action',
        align: 'right',
        format: (value, row, onEdit, onDelete) => (
            <>
                <IconButton onClick={() => onEdit(row.id)} aria-label="edit">
                    <Edit size={18} />
                </IconButton>
                <IconButton onClick={() => onDelete(row.id)} aria-label="delete" color="error">
                    <Trash2 size={18} />
                </IconButton>
            </>
        ),
    },
];

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
};

export default function UserList() {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([]);
    const [profileFile, setProfileFile] = useState(null);
    const [profilePreview, setProfilePreview] = useState("");
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        role: "",
        address: "",
        dob: "",
        password: "",
        profile: "", // This will hold the URL for editing
    });

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        setFormData({ id: "", name: "", email: "", role: "", address: "", dob: "", password: "", profile: "" });
        setProfileFile(null);
        setProfilePreview("");
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const selectedFile = files[0];

            if (!selectedFile.type.startsWith("image/")) {
                Message("Please select a valid image file.", "error");
                return;
            }

            setProfileFile(selectedFile);
            setFormData((prevData) => ({
                ...prevData,
                profile: selectedFile, // Store the File object
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setProfileFile(null);
            setFormData((prevData) => ({
                ...prevData,
                profile: "",
            }));
            setProfilePreview(formData.profile || ""); // Keep the existing URL if no new file
        }
    };

    const handleRemoveImage = () => {
        setProfileFile(null);
        setProfilePreview(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const fetchData = async () => {
        try {
            const result = await apiHandle.get('users');
            setData(result.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            Message("Error fetching users.", "error");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = async (id) => {
        setOpenModal(true);
        try {
            const response = await apiHandle.get(`users/${id}`);
            const userData = response;

            setFormData({
                id: userData.id || null,
                name: userData.name || "",
                email: userData.email || "",
                role: userData.role || "",
                address: userData.address || "",
                dob: userData.dob || "",
                password: "",
                profile: userData.profile || "", // Store existing URL
            });

            setProfileFile(null);
            setProfilePreview(userData.profile || "");
        } catch (error) {
            console.error('Error fetching user for edit:', error);
            Message('Error fetching user details for editing.', 'error');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("email", formData.email);
            formDataToSend.append("role", formData.role);
            formDataToSend.append("address", formData.address);
            formDataToSend.append("dob", formData.dob);
            formDataToSend.append("password", formData.password || "");

            // Append the new profile file if one is selected
            if (profileFile instanceof File) {
                formDataToSend.append("profile", profileFile);
            }

            let response;
            if (formData.id) {
                formDataToSend.append("_method", "PUT"); // For Laravel PUT via FormData
                response = await apiHandle.post(`update/${formData.id}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                Message("User updated successfully!", "success");
            } else {
                response = await apiHandle.post("register", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                Message("User created successfully!", "success");
            }

            fetchData();
            handleCloseModal();
        } catch (error) {
            console.error("Error processing user:", error.response?.data);
            Message("Error processing user.", "error");
        }
    };

    const handleDelete = async (id) => {
        try {
            await apiHandle.delete(`users/${id}`);
            Message('User deleted successfully!', 'success');
            fetchData();
        } catch (error) {
            console.error('Error deleting user:', error);
            Message('Error deleting user.', 'error');
        }
    };

    return (
        <div 
            className="w-full h-[81.5vh]">
            <div 
                className="w-full p-2 bg-white rounded-md flex items-center justify-end gap-2 mt-3 border-gray-200 border-[1px]">
                <Button 
                    onClick={handleOpenModal} 
                    variant="contained" 
                    size="small">
                    <Plus /> Add User
                </Button>
            </div>
            <div 
                className="w-full mt-3 h-full overflow-auto">
                <TableComponent
                    columns={columns}
                    data={data}
                    per_page={20}
                    onEdit={handleEdit}
                    onDelete={handleDelete}/>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{ backdrop: { timeout: 500 } }}
                className="w-full flex items-center justify-center">
                <Fade 
                    in={openModal}>
                    <Box 
                        sx={style}
                        className=" rounded-md border-gray-200 border-[1px]">
                        <Typography 
                            variant="h6" 
                            component="h2" 
                            gutterBottom
                            className='w-full text-center'>
                            {formData.id ? "Edit User" : "Create User"}
                        </Typography>
                        <form 
                            onSubmit={handleSubmit} 
                            className="flex flex-col gap-3 mt-3">
                            <div 
                                className="w-full flex-col flex items-center justify-center">
                                <Box 
                                    className="w-[150px] relative h-[150px] rounded-full border-[1px] border-gray-200">
                                    <img
                                        src={profilePreview || UserImage}
                                        alt="Profile Preview"
                                        className='w-full h-full object-cover rounded-full'/>
                                    {
                                        profileFile && (
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
                                        onChange={handleFileChange}
                                        inputProps={{ accept: 'image/*' }}/>
                                    <FormHelperText>
                                        Upload a new profile photo (optional).
                                    </FormHelperText>
                                </FormControl>
                            </div>
                            <TextField 
                                label="Name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                size="small" 
                                required />
                            <TextField 
                                label="Role" 
                                name="role" 
                                value={formData.role} 
                                onChange={handleInputChange} 
                                size="small" 
                                required />
                            <TextField 
                                label="Address" 
                                name="address" 
                                value={formData.address} 
                                onChange={handleInputChange} 
                                size="small" />
                            <TextField 
                                label="Date of Birth" 
                                name="dob" 
                                value={formData.dob} 
                                onChange={handleInputChange} 
                                size="small" 
                                type="date" 
                                InputLabelProps={{ shrink: true }} />
                            <TextField 
                                label="Email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                size="small" 
                                required 
                                type="email" />
                            {!formData.id && (
                                <TextField
                                    label="Password"
                                    size="small"
                                    name="password"
                                    type="password"
                                    value={formData.password || ""}
                                    onChange={handleInputChange}
                                    className="w-full"
                                    autoComplete="new-password"/>
                            )}
                            <Box 
                                className="w-full flex items-center justify-end gap-3">
                                <Button 
                                    onClick={handleCloseModal} 
                                    variant="contained" 
                                    size="small" 
                                    color="error" 
                                    startIcon={<CircleX />}>
                                    Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    size="small" 
                                    startIcon={
                                        <PackagePlus />
                                    }>
                                    {formData.id ? 'Update' : 'Create'}
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}