import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { userContext } from "../context/MyContext";
const Navbar = () => {
  const { user } = useContext(userContext);
  console.log("user data", user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          flexGrow: 1,
          backgroundColor: "hsl(240,27%,22%)",
          padding: "0px",
        }}
      >
        <Toolbar>
          <Typography component="div" sx={{ flexGrow: 1 }}>
            <Link
              style={{
                textDecoration: "none",
                color: "white",
              }}
              to={"/"}
            >
              {" "}
              DASHBOARD
            </Link>
          </Typography>
          <Link
            to={"/profile"}
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "white",
            }}
          >
            <Avatar sx={{ bgcolor: "orange" }}>
              {user?.name?.split(" ")[0][0]}
              {user?.name?.split(" ")[1][0]}
            </Avatar>
            <Typography sx={{ ml: "10px" }}>{user.name}</Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
