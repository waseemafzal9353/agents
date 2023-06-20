import {
  TextField,
  Button,
  Container,
  Box,
  Input,
} from "@mui/material";
import axios from "axios";
import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const Form: FC = () => {
  const navigate = useNavigate();

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
    if (fileId) {
      fileId.value = "";
    }
  };

  const validateInput = (input) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(input);
  };
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === "file") {
      const file = files[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        file,
      }));
    } else if (
      name !== "agentLicence" &&
      name !== "address" &&
      name !== "practiceAreas" &&
      name !== "aboutMe" &&
      type === "text"
    ) {
      if (!validateInput(value) && value !== "") {
        alert("only string characters are allowed!");
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else if (name === "agentLicence" && type === "text") {
      const validNumber = /^[0-9]*$/;
      if (!validNumber.test(value)) {
        alert("only numbers are allowed!");
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
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
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={3} mb={5}>
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
            step="1"
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
