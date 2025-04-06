import React, {
  useState,
  useEffect
} from 'react';
import TableComponent from '../components/Table';
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
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

const columns = [
  { id: 'image', label: 'Photo', align: 'left', format: (value) => <Avatar src={value} /> },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'link_url', label: 'Link URL', align: 'left', format: (value) => <a href={value} target="_blank" rel="noopener noreferrer">{value}</a> },
    { id: 'action', label: 'Action', align: 'left' }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SocialMediaList() {
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
      id: "",
      name: "",
      link_url: "",
      photo: null,
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
      setOpenModal(false);
      setFormData({ id: "", name: "", link_url: "", photo: null });
      setPhoto(null);
      setPhotoPreview(null);
  };

  const handleFileChange = (event) => {
      const files = event.target.files;
      if (files.length > 0) {
          const selectedFile = files[0];

          if (!selectedFile.type.startsWith("image/")) {
              Message("Please select a valid image file.", "error");
              return;
          }

          setPhoto(selectedFile);
          setFormData((prevData) => ({
              ...prevData,
              photo: selectedFile,
          }));

          const reader = new FileReader();
          reader.onloadend = () => {
              setPhotoPreview(reader.result);
          };
          reader.readAsDataURL(selectedFile);
      } else {
          setPhoto(null);
          setFormData((prevData) => ({
              ...prevData,
              photo: null,
          }));
          setPhotoPreview(null);
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
          const result = await apiHandle.get('social');
          setData(result.data.data);
      } catch (error) {
          console.error("Error fetching social media:", error);
          Message("Error fetching social media platforms.", "error");
      }
  };

  useEffect(() => {
      fetchData();
  }, []);

  const handleEdit = async (id) => {
      setOpenModal(true);
      try {
          const response = await apiHandle.get(`social/${id}`);
          const socialMediaData = response.data;

          setFormData({
              id: socialMediaData.id || null,
              name: socialMediaData.name || "",
              link_url: socialMediaData.link_url || "",
              photo: null,
          });

          setPhoto(null);
          setPhotoPreview(socialMediaData.photo_url || null);
      } catch (error) {
          console.error('Error fetching social media for edit:', error);
          Message('Error fetching social media details for editing.', 'error');
      }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const formDataToSend = new FormData();
          formDataToSend.append("name", formData.name);
          formDataToSend.append("link_url", formData.link_url);

          if (photo instanceof File) {
              formDataToSend.append("photo", photo);
          }

          let response;
          if (formData.id) {
              formDataToSend.append("_method", "PUT"); // For Laravel PUT via FormData
              response = await apiHandle.post(`social/${formData.id}`, formDataToSend, {
                  headers: { "Content-Type": "multipart/form-data" },
              });
              Message("Social Media platform updated successfully!", "success");
          } else {
              response = await apiHandle.post("social", formDataToSend, {
                  headers: { "Content-Type": "multipart/form-data" },
              });
              Message("Social Media platform created successfully!", "success");
          }

          fetchData();
          handleCloseModal();
      } catch (error) {
          console.error("Error processing social media:", error.response?.data);
          Message("Error processing social media platform.", "error");
      }
  };

  const handleDelete = async (id) => {
      try {
          await apiHandle.delete(`social/${id}`);
          Message('Social Media platform deleted successfully!', 'success');
          fetchData();
      } catch (error) {
          console.error('Error deleting social media:', error);
          Message('Error deleting social media platform.', 'error');
      }
  };

  return (
      <div className="w-full h-fit p-3">
          <Typography variant="h4" gutterBottom>
              Social Media Platforms
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
              <Button onClick={handleOpenModal} variant="contained" startIcon={<Plus />} size="small">
                  Add New
              </Button>
          </Box>
          <div className="w-full mt-3 h-full overflow-auto">
              <TableComponent
                  columns={columns}
                  data={data}
                  per_page={10} // Adjust as needed
                  onEdit={handleEdit}
                  onDelete={handleDelete}
              />
          </div>

          <Modal
              open={openModal}
              onClose={handleCloseModal}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{ backdrop: { timeout: 500 } }}
              className="w-full flex items-center justify-center"
          >
              <Fade in={openModal}>
                  <Box sx={style}>
                      <Typography variant="h6" component="h2" gutterBottom>
                          {formData.id ? "Edit Social Media" : "Add New Social Media"}
                      </Typography>
                      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-3">
                          <Box sx={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', mb: 2 }}>
                              <img
                                  src={photoPreview}
                                  alt="Social Media Photo Preview"
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                          </Box>
                          <FormControl fullWidth margin="normal">
                              <OutlinedInput
                                  id="photo"
                                  name="photo"
                                  type="file"
                                  onChange={handleFileChange}
                                  inputProps={{ accept: 'image/*' }}
                              />
                              <FormHelperText>Upload a photo for the social media platform.</FormHelperText>
                          </FormControl>
                          <TextField label="Name" name="name" value={formData.name} onChange={handleInputChange} size="small" required />
                          <TextField label="Link URL" name="link_url" value={formData.link_url} onChange={handleInputChange} size="small" required type="url" />
                          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                              <Button onClick={handleCloseModal} variant="contained" size="small" color="error" startIcon={<CircleX />}>
                                  Cancel
                              </Button>
                              <Button type="submit" variant="contained" size="small" startIcon={<PackagePlus />}>
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