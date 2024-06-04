/* eslint-disable */

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Modal,
  DialogContent,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

const Products = () => {
  // Getting data from the backend
  const [productItems, setProductItems] = useState([
    {
      id: "9090",
      name: "Pencil",
      description: "A pencil",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pencils_hb.jpg/220px-Pencils_hb.jpg",
    },
  ]);
  const [errorState, setErrorState] = useState(false);
  const [successState, setSuccessState] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data = await fetchproductItems();
  //       setproductItems(data.data);
  //       setMessage("Fetching staff data is successful");
  //       setSuccessState(true);
  //       setShowMessage(true);
  //     } catch (error) {
  //       setMessage(error.message);
  //       setErrorState(true);
  //       setShowMessage(true);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // const handleClose = () => {
  //   setShowMessage(false);
  // };

  // State for managing news data
  const [productID, setProductID] = useState("");
  const [description, setDescription] = useState("");
  const [image, setimage] = useState("");
  const [productName, setProductName] = useState("");
  const [newsFeed, setNewsFeed] = useState([]);

  // State for managing edit form data
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState(0); // Index of the news item being edited
  const [editproductID, setEditproductID] = useState("");
  const [editproductName, setEditProductName] = useState("");
  const [editdescription, setEditdescription] = useState("");
  const [editimage, setEditimage] = useState("");

  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDeleteConfirmationOpen = (id, name) => {
    setDeleteConfirmationOpen(true);
    setDeleteTarget({ id, name });
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteConfirmationOpen(false);
    setDeleteTarget(null);
  };
  const handleClose = () => {
    setShowMessage(false);
  };

  // Function to handle deleting a news item
  // Function to handle deleting a news item
  const handleDelete = (index) => {
    const selectedNewsItem = productItems[index];
    handleDeleteConfirmationOpen(selectedNewsItem._id, selectedNewsItem.title);
  };

  // Function to confirm and delete the news item

  const handleEdit = (index) => {
    const selectedNewsItem = productItems[index];
    console.log(selectedNewsItem);
    // Set the form fields with the data of the selected news item
    setEditproductID(selectedNewsItem.id);
    setEditProductName(selectedNewsItem.name);
    setEditdescription(selectedNewsItem.description);
    setEditimage(selectedNewsItem.image); // Ensure default value is provided if image is null
    setEditIndex(index); // Keep track of the index being edited
    setOpenEditModal(true); // Open the edit modal
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newProduct = {
        id: productID,
        name: productName,
        description: description,
        image: image,
      };
      setProductItems([...productItems, newProduct]);

      // Clear the form fields
      setProductName("");
      setDescription("");
      setimage("");
      setMessage(`Successfully created news ${productName}`);
      setSuccessState(true);
      setShowMessage(true);
    } catch (error) {
      setMessage(error.message);
      setErrorState(true);
      setShowMessage(true);
    }
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const updatedProduct = {
        id: editproductID,
        name: editproductName,
        description: editdescription,
        image: editimage,
      };
      const updatedProducts = [...productItems];
      updatedProducts[editIndex] = updatedProduct;
      setProductItems(updatedProducts);
      setEditproductID("");
      setEditdescription("");
      setEditimage("");
      setOpenEditModal(false);
      setMessage(`Successfully updated product ${updatedProduct.name}`);
      setSuccessState(true);
      setShowMessage(true);
    } catch (error) {
      setMessage(error.message);
      setErrorState(true);
      setShowMessage(true);
    }
  };

  // Function to confirm and delete the news item
  const handleConfirmDelete = async () => {
    try {
      await deleteNewsItem(deleteTarget.id);
      // Close the confirmation dialog after deletion
      handleDeleteConfirmationClose();
      setMessage(
        `Successfully deleted staff with ${deleteTarget.id}, Kindly refresh to update data`
      );
      setSuccessState(true);
      setShowMessage(true);
    } catch (error) {
      setMessage(error.message);
      setErrorState(true);
      setShowMessage(true);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      padding="1rem"
    >
      <Modal open={showMessage} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <DialogContent>
            <Typography variant="body1">
              {errorState ? `${message}` : ""}
              {successState ? `${message}` : ""}
            </Typography>
          </DialogContent>
        </Box>
      </Modal>
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Edit Products
          </Typography>
          <form onSubmit={handleUpdate}>
            <TextField
              label="Product ID"
              fullWidth
              value={editproductID}
              onChange={(e) => setEditproductID(e.target.value)}
              required
            />
            <TextField
              label="Product name"
              fullWidth
              value={editproductName}
              onChange={(e) => setEditProductName(e.target.value)}
              required
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={editdescription}
              onChange={(e) => setEditdescription(e.target.value)}
              required
            />
            <TextField
              label="image"
              fullWidth
              value={editimage}
              onChange={(e) => setEditimage(e.target.value)}
              required
            />
            {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditimage(e.target.value)}
              required
            /> */}
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
              Update Product
            </Button>
          </form>
        </Box>
      </Modal>
      {/* // Delete confirmation dialog */}
      <Modal
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Confirm Delete
          </Typography>
          <Typography gutterBottom>
            Are you sure you want to delete the news item "
            {deleteTarget ? deleteTarget.name : ""}"?
          </Typography>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
            <Button
              // onClick={}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Preview section for displaying news feed */}
      <Box width="50%">
        <Typography variant="h4" gutterBottom>
          All products
        </Typography>
        <Box>
          {/* Display all news feed */}
          {productItems.map((newsItem, index) => (
            <Paper
              key={index * Math.random()}
              elevation={3}
              sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
            >
              {newsItem.image && (
                <Box sx={{ mr: 2 }} key={"box"}>
                  <img
                    src={newsItem.image}
                    key={"img"}
                    alt="News"
                    style={{ maxWidth: 100, maxHeight: 100 }}
                  />
                </Box>
              )}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom key={"id"}>
                  {newsItem.id}
                </Typography>
                <Typography variant="h6" gutterBottom key={"title"}>
                  {newsItem.name}
                </Typography>
                <Typography key={"content"}> {newsItem.description}</Typography>
              </Box>
              {/* Edit and delete buttons */}
              <Box>
                <IconButton
                  color="primary"
                  onClick={() => handleDelete(index)}
                  sx={{ mr: 1, color: "white" }}
                >
                  <Delete />
                </IconButton>
                {/* You can add edit functionality similar to delete */}
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(index)}
                  sx={{ mr: 1, color: "white" }}
                >
                  <Edit />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>
      {/* Form for creating news */}
      <Box width="40%">
        <Typography variant="h4" gutterBottom>
          Create Product
        </Typography>
        <Paper key={"create news"} elevation={3} sx={{ padding: 2 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              key={"usermame"}
              label="Product ID"
              fullWidth
              value={productID}
              onChange={(e) => setProductID(e.target.value)}
              required
            />
            <TextField
              key={"title"}
              label="Product ID"
              fullWidth
              value={productName}
              // onChange={(e) => setProductName(e.target.value)}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
            <TextField
              key={"description"}
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <TextField
              key={"image"}
              label="Image"
              fullWidth
              value={image}
              onChange={(e) => setimage(e.target.value)}
              required
            />
            {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => setimage(e.target.files[0])}
              required
            /> */}

            <Button
              key={"create"}
              type="submit"
              variant="contained"
              sx={{ mt: 2 }}
            >
              Create Product
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Products;
