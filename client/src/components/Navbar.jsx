import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function ResponsiveAppBar(props) {
  const { idFarmer, fname, lname } = props;
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const navigate = useNavigate();

  const handleCloseNavMenu = (text, id) => {
    setAnchorElNav(null);
    navigate(`/${text}/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  return (
    <AppBar position="static"  className="bg-gradient-to-r from-green-600 to-lime-600">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccountCircleIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {fname} {lname}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => handleCloseNavMenu("ricecrop", idFarmer)}
              >
                <Typography textAlign="center">รอบการปลูกข้าว</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleCloseNavMenu("variety", idFarmer)}>
                <Typography textAlign="center">พันธ์ุข้าว</Typography>
              </MenuItem>
              <MenuItem onClick={() => handleCloseNavMenu("disease", idFarmer)}>
                <Typography textAlign="center">
                  โรคข้าวและการป้องกันกำจัด
                </Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {fname} {lname}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => handleCloseNavMenu("ricecrop", idFarmer)}
              sx={{
                my: 2,
                color: "white",
                display: "block",
              }}
            >
              รอบการปลูกข้าว
            </Button>

            <Button
              onClick={() => handleCloseNavMenu("variety", idFarmer)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              พันธ์ุข้าว
            </Button>

            <Button
              onClick={() => handleCloseNavMenu("disease", idFarmer)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              โรคข้าวและการป้องกันกำจัด
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Button
              variant="text"
              onClick={handleLogout}
              sx={{
                my: 2,
                color: "white",
              }}
            >
              <div className="mr-1">LOGOUT</div>

              <LogoutIcon />
            </Button>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
