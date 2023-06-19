import { FC, useEffect, useState } from "react";
import "./Agent.css";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  CardMedia,
} from "@mui/material";
import Header from "../../components/Header/header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IAgent } from "../../types/Agent";
import { IReviews } from "../../types/Reviews";

const Agent: FC = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState<IAgent>({});
  const [agentReviews, setAgentReviews] = useState<IReviews[]>([]);
  const [review, setReview] = useState("");

  useEffect(() => {
    async function fetchAgentData() {
      const response = await axios.get(`/agent?id=${id}`);
      setAgent(response.data);
      const reviews = await axios.get(`/getAgentreviews?id=${id}`);
      const agentReviews = reviews.data.agentReviews;
      setAgentReviews(agentReviews);
    }
    fetchAgentData();
  }, []);

  const handleReview = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    axios.post(`/newreview?agentId=${id}`, {
      review,
    });
    setReview("");
  };

  const {
    firstName,
    lastName,
    photoUrl,
    agentLicence,
    address,
    practiceAreas,
    aboutMe,
  } = agent;

  return (
    <>
  <Header />
  <Box margin={2}>
    <Grid container spacing={2}>
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 250,
            width: "100%",
            borderRadius: "20px",
          }}
          alt={firstName}
          image={photoUrl}
        />
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginTop: "auto",
              width: "100%",
              fontSize: "20px",
            }}
          >
            {firstName}, {lastName}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
              marginTop: "auto",
              width: "100%",
              fontSize: "1rem",
            }}
          >
            {agentLicence}
          </Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        lg={8}
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
          <Typography sx={{ fontSize: "1.2rem" }}>{address}</Typography>
          <Typography sx={{ fontSize: "1.2rem" }}>{practiceAreas}</Typography>
        </Box>
        <Box sx={{ marginTop: "2rem" }}>
          <Typography sx={{ textAlign: "justify" }}>{aboutMe}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Container>
          <Box mt={4}>
            <form
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={handleReview}
            >
              <TextField
                name="review"
                label={`How do you feel about ${firstName}?`}
                value={review}
                onChange={(e: { target: { value: any } }) =>
                  setReview(e.target.value)
                }
                multiline
                fullWidth
                rows={3}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ width: "10%", marginLeft: "auto" }}
              >
                Review
              </Button>
            </form>
          </Box>
        </Container>
        <Container sx={{ marginTop: "2rem" }}>
          <Typography sx={{ fontSize: "20px" }}>
            What people say about {firstName}.
          </Typography>

          {agentReviews.map((agentReview: { review: any }, i: any) => (
            <List component="ol" key={i}>
              <ListItem>
                <ListItemText>
                  <Typography>{agentReview && agentReview.review}</Typography>
                </ListItemText>
              </ListItem>
            </List>
          ))}
        </Container>
      </Grid>
    </Grid>
  </Box>
</>

  );
};

export default Agent;
