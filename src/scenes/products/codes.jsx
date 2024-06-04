// {newsFeed.map((newsItem, index) => (
//     <Paper
//       key={index}
//       elevation={3}
//       sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
//     >
//       {newsItem.image && (
//         <Box sx={{ mr: 2 }}>
//           <img
//             src={URL.createObjectURL(newsItem.image)}
//             alt="News"
//             style={{ maxWidth: 100, maxHeight: 100 }}
//           />
//         </Box>
//       )}
//       <Box sx={{ flex: 1 }}>
//         <Typography variant="h6" gutterBottom>
//           {newsItem.title}
//         </Typography>
//         <Typography>{newsItem.description}</Typography>
//       </Box>
//       {/* Edit and delete buttons */}
//       <Box>
//         <IconButton
//           color="primary"
//           onClick={() => handleDelete(index)}
//           sx={{ mr: 1, color: "white" }}
//         >
//           <Delete />
//         </IconButton>
//         {/* You can add edit functionality similar to delete */}
//         <IconButton
//           color="primary"
//           onClick={() => handleEdit(index)}
//           sx={{ mr: 1, color: "white" }}
//         >
//           <Edit />
//         </IconButton>
//       </Box>
//     </Paper>
//   ))}


{newsItems.map((newsItem, index) => (
    <Paper
      key={index}
      elevation={3}
      sx={{ p: 2, mb: 2, display: "flex", alignItems: "center" }}
    >
      {newsItem.image && (
        <Box sx={{ mr: 2 }}>
          <img
            src={URL.createObjectURL(newsItem.image)}
            alt="News"
            style={{ maxWidth: 100, maxHeight: 100 }}
          />
        </Box>
      )}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>
          {newsItem.title}
        </Typography>
        <Typography>{newsItem.description}</Typography>
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



  const handleEditSubmit = (event) => {
    event.preventDefault();
    // Update the selected news item with the edited data
    const updatedNewsFeed = [...newsFeed];
    updatedNewsFeed[editIndex] = {
      title: editNewsTitle,
      description: editNewsDescription,
      image: editNewsImage,
      // Add any other relevant fields
    };
    setNewsFeed(updatedNewsFeed);
    // Reset edit form fields and close the edit modal
    setEditNewsTitle("");
    setEditNewsDescription("");
    setEditNewsImage("");
    setOpenEditModal(false);
  };




  

  const handleConfirmDelete = () => {
    // Add your logic to delete the news item using deleteTarget.id
    const updatedNewsFeed = newsFeed.filter(
      (item) => item.id !== deleteTarget.id
    );
    setNewsFeed(updatedNewsFeed);
    // Close the confirmation dialog after deletion
    handleDeleteConfirmationClose();
  };
