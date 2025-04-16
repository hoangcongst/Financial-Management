import "@/styles/slidebar.css";
import {
  AccountBalanceWallet,
  BusinessCenter,
  Home,
  SignalCellularAlt,
} from "@mui/icons-material";
import logo from "@/assets/images/logo/logo_tide.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const URL = [
  {id: 1, path: "/", menu: "home"},
  {id: 2, path: "/investment/assets/total", menu: "investment"},
  {id: 3, path: "/investment/assets/accumulate", menu: "investment"},
  {id: 4, path: "/investment/assets/fundcertificate", menu: "investment"},
  {id: 5, path: "/investment/assets/gold", menu: "investment"},
]

const Slidebar = () => {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string>("home");

  const handleChangeMenuHome = (menu: string, path: string) => {
    navigate(path);
  }

  useEffect(() => {
    const path = location.pathname;
    const menu = URL.find((item) => item.path.includes(path));
    if (menu) {
      setActiveMenu(menu.menu);
    }
  }, [location.pathname]);
  return (
    <>
      <div className="slidebar">
        <div className="p_20">
          <div>
            <img className="logo_title" src={logo} alt="logo"/>
          </div>
        </div>
        <div>
          <div style={{ cursor: "pointer" }}  className={`d_f a_i slidebar_menu_item ${activeMenu === "home" ? "active" : ""}`} onClick={() => handleChangeMenuHome("home", "/")}>
            <div className="menu_item_icon">
              <Home style={{ fontSize: "35px" }} />
            </div>
            <div>Trang chủ</div>
          </div>
          <div style={{ cursor: "pointer" }} className={`d_f a_i slidebar_menu_item ${activeMenu === "investment" ? "active" : ""}`} onClick={() => handleChangeMenuHome("investment", "/investment/assets/total")}>
            <div className="menu_item_icon">
              <BusinessCenter style={{ fontSize: "35px" }} />
            </div>
            <div>Đầu tư</div>
          </div>
          <div style={{ cursor: "pointer" }} className={`d_f a_i slidebar_menu_item ${activeMenu === "market" ? "active" : ""}`} onClick={() => handleChangeMenuHome("market", "/market")}>
            <div className="menu_item_icon">
              <SignalCellularAlt style={{ fontSize: "35px" }} />
            </div>
            <div>Thị trường</div>
          </div>
          <div style={{ cursor: "pointer" }} className= "d_f a_i slidebar_menu_item" onClick={() => handleChangeMenuHome("market", "/market")}>
            <div className="menu_item_icon">
              <AccountBalanceWallet style={{ fontSize: "35px" }} />
            </div>
            <div>Ngân sách</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Slidebar;
