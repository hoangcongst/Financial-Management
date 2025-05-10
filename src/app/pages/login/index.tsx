/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/styles/index.css";
import { handleAlertValidation } from "@/util/common";
import { Button, Input, Link } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import request from "@/util/request";
const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" });
  const handleLogin = async() => {
    const isValid = handleAlertValidation(formRef);
    if(!isValid) return;
    try {
      const response = await request({
        method: "POST",
        url: "/auth/login",
        data: { username: userData.username, password: userData.password },
      });
      if (response.status === 201) {
        alert("Đăng nhập thành công!");
      }
      const data = response.data;
      localStorage.setItem("token", data.access_token);
      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  }
  return (
    <div className="d_fc">
      <div className="d_f j_c a_i h_100vh">
        <div className="b_gw w_500p b_r20 b_sx">
          <div className="p_20">
            <div className="d_fc p_20">
              <div className="text_red f_s80 f_wb t_a">TIDE SQUARE</div>
            </div>
            <form className="p_lr20" ref={formRef}>
              <div className="d_fc">
                <Input
                  className="b_r15 p_10"
                  type="text"
                  data-username
                  required
                  placeholder="Username"
                  value={userData.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </div>
              <div className="d_fc m_t5">
                <Input
                  className="b_r15 p_10 "
                  type="password"
                  data-password
                  required
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </div>
            </form>
            <div className="d_fc m_t40">
                <Button
                  className="b_r15 p_10"
                  variant="contained"
                  type="submit"
                  onClick={() => handleLogin()}
                >
                  Login
                </Button>
              </div>
            <div className="d_fc m_t20">
              <div className=" f_s20 t_a">
                Don't have an account?{" "}
                <Link href="/register" component="a">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
