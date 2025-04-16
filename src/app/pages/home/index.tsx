/* eslint-disable @typescript-eslint/no-explicit-any */
import "@/styles/home.css";
import logo_tichluy from "@/assets/images/logo/logo_tichluy.png";
import logo_chungchiquy from "@/assets/images/logo/logo_chungchiquy.png";
import logo_coin from "@/assets/images/logo/logo_coin.png";
import logo_vang from "@/assets/images/logo/logo_vang.png";
import { Button } from "@mui/material";
import { TrendingFlat } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import request from "@/util/request";

interface TransactionType {
  spend: any[];
  income: any[];
  lend: any[];
}
const Home = () => {
  const navigate = useNavigate();

  const [transactionTypes, setTransactionTypes] = useState<TransactionType>({
    spend: [],
    income: [],
    lend: [],
  });

  const [transactionLog, setTransactionLog] = useState<any[]>([]);
  console.log(transactionLog);

  const fetchTransactionType = async (type: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await request({
        method: "GET",
        url: `transaction_type/category/${type}/current_month`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setTransactionTypes((prev) => ({ ...prev, [type]: data }));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTransactionLog = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await request({
        method: "GET",
        url: "transaction_type/current_month",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setTransactionLog(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTransactionType("spend");
    fetchTransactionType("income");
    fetchTransactionType("lend");
    fetchTransactionLog();
  }, []);

  return (
    <>
      <div className="home_content">
        <div className="hone_content_item">
          <div className="first_item">
            <div className="first_item_element b_r15">
              <div className="p_10">
                <div>
                  <div className="f_s20">Tổng tài sản</div>
                  <div className="d_f p_t8">
                    <div className="f_s20">250.000đ</div>
                    &nbsp;
                    <div className="c_y">10.000đ</div>
                  </div>
                </div>
                <div className="p_t20 d_fc">
                  <div className="d_f p_b20">
                    <div className="d_f w_50">
                      <img className="s_40" src={logo_tichluy} />
                      <div className="p_l10">
                        <div>Tích luỹ</div>
                        <div className="d_f">
                          <div className="p_r10 ">0đ</div>
                          <div className="c_y">0đ (0%)</div>
                        </div>
                      </div>
                    </div>
                    <div className="d_f">
                      <img className="s_40" src={logo_chungchiquy} />
                      <div className="p_l10">
                        <div>Chứng chỉ quỹ</div>
                        <div className="d_f">
                          <div className="p_r10">0đ</div>
                          <div className="c_y">0đ (0%)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d_f">
                    <div className="d_f w_50">
                      <img className="s_40" src={logo_vang} />
                      <div className="p_l10">
                        <div>Vàng</div>
                        <div className="d_f">
                          <div className="p_r10 ">0đ</div>
                          <div className="c_y">0đ (0%)</div>
                        </div>
                      </div>
                    </div>
                    <div className="d_f">
                      <img className="s_40" src={logo_coin} />
                      <div className="p_l10">
                        <div>Coin</div>
                        <div className="d_f">
                          <div className="p_r10">0đ</div>
                          <div className="c_y">0đ (0%)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="first_item_element b_r15">
              <div className="p_10">
                <div className="f_s20">Tổng số dư tài khoản</div>
                <div className="d_f p_t8">
                  <div className="f_s20">250.000đ</div>
                  &nbsp;
                  <div className="c_y">10.000đ</div>
                </div>
                <div className="p_t20 t_a">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => navigate("/home/bank_transaction")}
                  >
                    Cập nhật giao dịch
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="second_item">
            <div className="second_item_element b_r15">
              <div className="p_10">
                <div
                  className=" t_a"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/home/spend")}
                >
                  Khoản Chi
                </div>
                <div className="p_t8">
                  <div className="scroll_home">
                    {transactionTypes.spend.map((item) => (
                      <div
                        key={item.id}
                        className="b_gx b_r15 p_10 m_t5 d_f a_i j_cs"
                      >
                        <div className="d_f a_i">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="s_35"
                          />
                          <div className="p_l10">{item.name}</div>
                        </div>
                        <div className="">
                          {Number(item.amount).toLocaleString("vi-VN")}đ
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="second_item_element b_r15">
              <div className="p_10">
                <div
                  className="t_a"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/home/income")}
                >
                  Khoản Thu
                </div>
                <div className="p_t8">
                  <div className="scroll_home">
                    {transactionTypes.income.map((item) => (
                      <div
                        key={item.id}
                        className="b_gx b_r15 p_10 m_t5 d_f a_i j_cs"
                      >
                        <div className="d_f a_i">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="s_35"
                          />
                          <div className="p_l10">{item.name}</div>
                        </div>
                        <div className="">
                          {Number(item.amount).toLocaleString("vi-VN")}đ
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="second_item_element b_r15">
              <div className="p_10">
                <div
                  className="t_a"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/home/lend")}
                >
                  Vay/Nợ
                </div>
                <div className="p_t8">
                  <div className="scroll_home">
                    {transactionTypes.lend.map((item) => (
                      <div
                        key={item.id}
                        className="b_gx b_r15 p_10 m_t5 d_f a_i j_cs"
                      >
                        <div className="d_f a_i">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="s_35"
                          />
                          <div className="p_l10">{item.name}</div>
                        </div>
                        <div className="">
                          {Number(item.amount).toLocaleString("vi-VN")}đ
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="third_item">
            <div className="third_item_element b_r15">
              <div className="p_20 w_100">
                <div className="d_f a_i">
                  <div className="f_s20 p_r10">Đầu tư cùng TideSquare</div>
                  <div className="d_f g_10 p_l10">
                    <div>
                      <Button variant="outlined" size="small">
                        Tích luỹ
                      </Button>
                    </div>
                    <div>
                      <Button variant="contained" size="small">
                        Chứng chỉ quỹ
                      </Button>
                    </div>
                    <div>
                      <Button variant="outlined" size="small">
                        Vàng
                      </Button>
                    </div>
                    <div>
                      <Button variant="outlined" size="small">
                        Coin
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="d_f p_t8">
                  <div className="w_100 b_gx b_r15 ">
                    <div className="h_130p m_tb20 b_gw ">
                      <div className="p_10 d_f g_20 ">
                        <div className="b_g"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fourth_item">
            <div className="fourth_item_element b_r15">
              <div className="p_20 d_fc w_100">
                <div className="d_f w_100">
                  <div className="w_50 t_a b_s">Tổng chi</div>
                  <div className="w_50 t_a">Tổng thu</div>
                </div>
                <div className="h_100 p_t8">
                  <div className="h_100 b_r15">
                    <div className="p_10"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fourth_item_element b_r15">
              <div className="p_10 w_100">
                <div className="d_f a_i j_cs">
                  <div>Sổ giao dịch</div>
                  <div
                    style={{ cursor: "pointer" }}
                    className="c_y d_f a_i"
                    onClick={() => navigate("/home/transaction_log")}
                  >
                    <div className="p_r10"> Xem chi tiết</div>
                    <TrendingFlat />
                  </div>
                </div>

                <div className=" p_t8">
                  <div className="scroll_log">
                    {transactionLog.map((item) => (
                      <div className="w_100 b_gx b_r15 m_t5">
                        <div className="p_10">
                          <div className="d_f j_cs a_i">
                            <div className="d_f a_i">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="s_35"
                              />
                              <div className="p_l10">{item.name}</div>
                            </div>
                            <div>
                              {Number(item.amount).toLocaleString("vi-VN")} đ
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
