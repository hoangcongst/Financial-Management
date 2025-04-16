import { handleAlertValidation } from "@/util/common";
import request from "@/util/request";
import { Link } from "@mui/material";
import { Input } from "@mui/material";
import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{
    email: string;
    username: string;
    password: string;
  }>({ email: "", username: "", password: "" });
  const handleRegister = async () => {
    const isValid = handleAlertValidation(formRef);
    if (!isValid) return;
    try {
      const response = await request({
        method: "POST",
        url: "/auth/signup",
        data: { email: userData.email, username: userData.username, password: userData.password },
      });
      const data = response.data;
      if (response.status === 201) {
        alert("Đăng ký thành công! Hãy đăng nhập.");
        navigate("/login");
      } else {
        alert(data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.log("Lỗi khi gửi request:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  return (
    <div className="d_fc">
      <div className="d_f j_c a_i h_100vh">
        <div className="b_gw w_500p b_r20 b_sx">
          <div className="p_20">
            <div className="d_fc p_20">
              <div className="text_red f_s80 f_wb t_a">TIDE SQUARE</div>
            </div>
            <form className="p_lr20" ref={formRef}>
              <div className="d_fc ">
                <Input
                  className="p_10"
                  type="text"
                  required
                  data-email
                  placeholder="Email"
                  value={userData?.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              <div className="d_fc m_t5">
                <Input
                  className="p_10"
                  type="text"
                  required
                  data-username
                  placeholder="Username"
                  value={userData?.username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </div>
              <div className="d_fc m_t5">
                <Input
                  className="p_10 "
                  type="password"
                  data-password
                  placeholder="Password"
                  value={userData?.password}
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
                onClick={() => handleRegister()}
              >
                Register
              </Button>
            </div>
            <div className="d_fc m_t20">
              <div className=" f_s20 t_a">
                Already have an account?{" "}
                <Link href="/login" component="a">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
