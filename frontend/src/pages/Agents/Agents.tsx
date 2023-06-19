import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IAgent } from "../../types/Agent";
import axios from "axios";
import "./Agents.css";
import Header from "../../components/Header/header";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  CardActions,
  Grid,
  TextField,
} from "@mui/material";
import { IReviews } from "../../types/Reviews";


const Agents: FC = () => {
  const [agents, setAgents] = useState<IAgent[]>([]);
  const [reviews, setReviews] = useState<IReviews[]>([]);
  const [showSearchedAgents, setShowSearchedAgents] = useState(false);
  const [search, setSearch] = useState("");
  const [searchAgents, setSearchAgents] = useState<IAgent[]>([]);

  useEffect(() => {
    async function fetchInitialData() {
      const response = await axios.get("/agents");
      setAgents(response.data);
      const totalReviews = await axios.get("/getreviews");
      const agentReviews = totalReviews.data.reviews;
      setReviews(agentReviews);
    }
    fetchInitialData();
  }, []);

  useEffect(() => {
    const searchedAgents = axios.get(`/search?practiceAreas=${search}`);
    searchedAgents.then((agent) => {
      if (search.length) {
        setSearchAgents(agent.data.agentsSearched);
        setShowSearchedAgents(true);
      }else{
       axios.get("/agents").then((res)=>{
        setSearchAgents(res.data)        
       })
      }
    });
  }, [search]);

  return (
    <>
  <Header />
  <Grid container spacing={2}>
    {showSearchedAgents ? (
      <>
        <Grid item xs={12} margin={3}>
          <TextField
            name="search"
            label="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            margin="normal"
            type="text"
            sx={{ width: "100%", maxWidth: "20rem" }}
          />
        </Grid>
        {searchAgents.map((agent) => (
          <Grid item xs={12} sm={6} md={4} key={agent.id}>
            <Link to={`/agent/${agent.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ maxWidth: 345, margin: 3 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={agent.photoUrl}
                    alt={agent.firstName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {agent.firstName}, {agent.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {agent.aboutMe.substring(0, 100) + "..."}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography component="p" sx={{ p: 1, color: "grey" }}>
                    reviews (
                    {reviews &&
                      reviews.filter((review) => review.agentId === agent.id)
                        .length}
                    )
                  </Typography>
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))}
      </>
    ) : (
      <>
        <Grid item xs={12} sx={{ width: "100%" }}>
          <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
            <TextField
              name="search"
              label="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              margin="normal"
              type="text"
              sx={{ width: "100%", maxWidth: "20rem", margin: "2rem" }}
            />
          </Box>
        </Grid>

        {agents.map((agent, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Link to={`/agent/${agent.id}`} style={{ textDecoration: "none" }}>
              <Card sx={{ maxWidth: 345, margin: 3 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={agent.photoUrl}
                    alt={agent.firstName}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {agent.firstName}, {agent.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {agent.aboutMe.substring(0, 100) + "..."}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Typography component="p" sx={{ p: 1, color: "grey" }}>
                    reviews (
                    {reviews &&
                      reviews.filter((review) => review.agentId === agent.id)
                        .length}
                    )
                  </Typography>
                </CardActions>
              </Card>
            </Link>
          </Grid>
        ))}
      </>
    )}
  </Grid>
</>

  );
};

export default Agents;
