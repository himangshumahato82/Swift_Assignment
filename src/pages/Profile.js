import { Avatar, Box, IconButton, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context/MyContext";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Profile = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const { name, email, id, city, phone } = user || "";
  return (
    <div style={{ marginTop: "5rem" }}>
      <IconButton onClick={() => navigate("/")} sx={{ marginLeft: "120px" }}>
        <ArrowBackIcon />
        Welcome ,{name}
      </IconButton>
      <Box>
        <div
          style={{
            width: "82%",
            margin: "auto",
            height: "450px",
            padding: "40px",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <Box style={{ display: "flex" }}>
            {" "}
            <Avatar sx={{ bgcolor: "orange" }}>
              {user?.name?.split(" ")[0][0]}
              {user?.name?.split(" ")[1][0]}
            </Avatar>
            <div>
              <Typography sx={{ ml: "10px" }}>{user.name}</Typography>
              <p
                style={{
                  marginLeft: "10px",
                  fontWeight: 100,
                  fontSize: "15px",
                  opacity: 0.7,
                }}
              >
                {" "}
                {email}
              </p>
            </div>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 2fr",
              marginTop: "30px",
              padding: "20px",
              gap: "50px",
            }}
          >
            <TextField
              sx={{ backgroundColor: "hsl(240,10%,95%)" }}
              size="small"
              variant="outlined"
              label="User ID"
              value={id}
            />
            <TextField
              sx={{ backgroundColor: "hsl(240,10%,95%)" }}
              size="small"
              variant="outlined"
              label="Name"
              value={name}
            />
            <TextField
              sx={{ backgroundColor: "hsl(240,10%,95%)" }}
              size="small"
              variant="outlined"
              label="Email ID"
              value={email}
            />
            <TextField
              sx={{ backgroundColor: "hsl(240,10%,95%)" }}
              size="small"
              variant="outlined"
              label="Address"
              value={city}
            />
            <TextField
              sx={{ backgroundColor: "hsl(240,10%,95%)" }}
              size="small"
              variant="outlined"
              label="Phone Number"
              value={phone}
            />
          </Box>
        </div>
      </Box>
    </div>
  );
};

export default Profile;
