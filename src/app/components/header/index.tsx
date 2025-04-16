import "@/styles/header.css";
import {
  AccountCircle,
  KeyboardArrowDown,
  Menu as MenuIcon,
  Notifications,
  Logout,
  Settings,
  Person,
} from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClickAccount = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (confirm("Bạn có muốn đăng xuất không?")) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }
  return (
    <div className="header b_b">
      <div className="header-item">
        <div className="header-item-left">
          <MenuIcon style={{ fontSize: "30px" }} />
        </div>
        <div className="header-item-right">
          <div className="header-notification">
            <Notifications style={{ fontSize: "30px" }} />
          </div>
          <div
            className="header-account"
            onClick={handleClickAccount}
            style={{ cursor: "pointer" }}
          >
            <AccountCircle
              style={{ fontSize: "30px", color: "rgba(255, 175, 0, 1)" }}
            />
            <KeyboardArrowDown
              style={{ fontSize: "15px", marginLeft: "10px" }}
            />
          </div>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseAccount}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <Person style={{ marginRight: "10px" }} />
          Profile
        </MenuItem>
        <MenuItem>
          <Settings style={{ marginRight: "10px" }} />
          Settings
        </MenuItem>
        <MenuItem style={{ color: "red" }} onClick={handleLogout}>
          <Logout style={{ marginRight: "10px", color: "red" }} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Header;
