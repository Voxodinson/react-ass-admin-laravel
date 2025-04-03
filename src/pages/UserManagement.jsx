import React, { 
    useState, 
    useEffect 
} from 'react';
import TableComponent from '../components/Table';
import { 
    Plus, 
    CircleX,
    PackagePlus
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
    Backdrop 
} from '@mui/material';
import ChoosePhoto from '../components/ChooseMultiplePhoto';
const columns = [
    { id: 'profile', label: 'Profile', align: 'left' },
    { id: 'name', label: 'Name', align: 'left' },
    { id: 'email', label: 'Email', align: 'left' },
    { id: 'role', label: 'Role', align: 'left' },
    { id: 'address', label: 'Address', align: 'left' },
    { id: 'dob', label: 'Date of Birth', align: 'left' },
    { id: 'action', label: 'Action', align: 'left' }
];

export default function UserList() {
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState("");
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        email: "",
        role: "",
        address: "",
        dob: "",
        password: "",
        profile: ""
    });

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        setFormData({ id: "", name: "", email: "", role: "", address: "", dob: "", profile: null });
    };

    const handleFileChange = (files) => {
        if (files.length > 0) {
            const selectedFile = files[0];
    
            if (!selectedFile.type.startsWith("image/")) {
                Message("Please select a valid image file.", "error");
                return;
            }
    
            setProfile(selectedFile);
            setFormData((prevData) => ({
                ...prevData,
                profile: selectedFile,
            }));
        }
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
                profile: null,
            });

            setProfile(userData.profile_url || ""); 
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
    
            // Append only one image file
            if (profile instanceof File) {
                formDataToSend.append("profile", profile);
            }
    
            let response;
            if (formData.id) {
                response = await apiHandle.put(`update/${formData.id}`, formData, {
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
            <div className="w-full mt-3 h-full overflow-auto">
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
                <Fade in={openModal}>
                    <Box 
                        className="w-[500px] z-50 bg-white rounded-md shadow-md p-5">
                        <Typography 
                            variant="h6">
                            {formData.id ? "Edit User" : "Create User"}
                        </Typography>
                        <form 
                            onSubmit={handleSubmit} 
                            className="flex flex-col gap-3 mt-3">
                            <div className="">
                                <ChoosePhoto
                                    onFileChange={handleFileChange}
                                    name={profile}/>
                            </div>
                            <TextField 
                                label="Name" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleInputChange} 
                                size="small" />
                            <TextField 
                                label="Email"
                                name="email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                size="small" />
                            <TextField 
                                label="Role" 
                                name="role" 
                                value={formData.role} 
                                onChange={handleInputChange} 
                                size="small" />
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
                                size="small" />
                            {formData.id === "" && (
                                <TextField
                                    label="Password"
                                    size="small"
                                    name="password"
                                    type="password"
                                    value={formData.password || ""}
                                    onChange={handleInputChange}
                                    className="w-full"
                                    autoComplete="new-password"
                                />
                            )}
                            <div 
                                className="flex justify-end gap-3 mt-3">
                                <Button 
                                    onClick={handleCloseModal} 
                                    variant="contained" 
                                    size="small" 
                                    color="error">
                                    <CircleX />&ensp; Cancel
                                </Button>
                                <Button 
                                    type="submit" 
                                    variant="contained" 
                                    size="small">
                                    <PackagePlus />&ensp; {formData.id ? 'Update' : 'Create'}
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
