import { TextField, Button, Container, Box, Input } from "@mui/material";
import axios from "axios";
import React, { FC, useState } from "react";


const Form: FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    agentLicence: "",
    file: null,
    address: "",
    practiceAreas: "",
    aboutMe: "",
  });

  const clearFields = () => {
    setFormData({
      firstName: "",
      lastName: "",
      agentLicence: "",
      address: "",
      practiceAreas: "",
      aboutMe: "",
    });
    const fileId = document.getElementById("fileUpload");
    fileId.value = "";
  };

  const handleChange = (e) => {
    if (e.target.name === "file") {
      const file = e.target.files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        file,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const agentData = new FormData();
    agentData.append("firstName", formData.firstName);
    agentData.append("lastName", formData.lastName);
    agentData.append("agentLicence", formData.agentLicence);
    agentData.append("address", formData.address);
    agentData.append("practiceAreas", formData.practiceAreas);
    agentData.append("file", formData.file);
    agentData.append("aboutMe", formData.aboutMe);

    try {
      await axios.post("/newagent", agentData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      clearFields();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={3}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
            required
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
            required
          />
          <TextField
            name="agentLicence"
            label="Agent Licence"
            value={formData.agentLicence}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
            required
          />
          <TextField
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
            required
          />
          <TextField
            name="practiceAreas"
            label="Practice Areas"
            value={formData.practiceAreas}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="text"
            required
          />
          <Input
            id="fileUpload"
            type="file"
            name="file"
            onChange={handleChange}
            accept="image/*"
            required
          />

          <TextField
            name="aboutMe"
            label="About Me"
            value={formData.aboutMe}
            onChange={handleChange}
            multiline
            fullWidth
            rows={4}
            margin="normal"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Form;
