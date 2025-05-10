import { DatePickerV2 as DatePicker } from "@/app/components/common/DatePickerV2";
import dayjs from "dayjs";
import { useState } from "react";
import { Button } from "@mui/material";
import logo_coin from "@/assets/images/logo/logo_coin.png";
import { useNavigate } from "react-router-dom";

const ACCUMULATE_DATA = [
  { id: 1, image: logo_coin, type: "Tích luỹ không kỳ hạn ", center: "5%/năm" },
  { id: 2, image: logo_coin, type: "Tích luỹ kỳ hạn 1 tuần", center: "5%/năm" },
  { id: 3, image: logo_coin, type: "Tích luỹ kỳ hạn 2 tuần", center: "5%/năm" },
  {
    id: 4,
    image: logo_coin,
    type: "Tích luỹ kỳ hạn 1 tháng",
    center: "5.5%/năm",
  },
  {
    id: 5,
    image: logo_coin,
    type: "Tích luỹ kỳ hạn 2 tháng",
    center: "5.5%/năm",
  },
  {
    id: 6,
    image: logo_coin,
    type: "Tích luỹ kỳ hạn 3 tháng",
    center: "6%/năm",
  },
];

const FUND_CERTIFICATE_DATA = [
  {
    id: 1,
    image: logo_coin,
    code: "VNS",
    name: "ACB",
    asset: "100.000.000đ",
    quantity: 1524,
    profit: "9.000.000đ",
  },
  {
    id: 2,
    image: logo_coin,
    code: "SNS",
    name: "VIETIN",
    asset: "100.000.000đ",
    quantity: 1524,
    profit: "9.000.000đ",
  },
  {
    id: 3,
    image: logo_coin,
    code: "ANS",
    name: "FPT",
    asset: "100.000.000đ",
    quantity: 1524,
    profit: "9.000.000đ",
  },
  {
    id: 4,
    image: logo_coin,
    code: "TNS",
    name: "MOMO",
    asset: "100.000.000đ",
    quantity: 1524,
    profit: "9.000.000đ",
  },
  {
    id: 5,
    image: logo_coin,
    code: "CNS",
    name: "BIDV",
    asset: "100.000.000đ",
    quantity: 1524,
    profit: "9.000.000đ",
  },
  {
    id: 6,
    image: logo_coin,
    code: "VNS",
    name: "VINASHIN",
    asset: "100.000.000đ",
    quantity: 1524,
    profit: "9.000.000đ",
  },
];

const GOLD_DATA = [
  {
    id: 1,
    image: logo_coin,
    name: "Hưng Thịnh Vượng",
    asset: "100.000.000đ",
    quantity: 10,
    profit: "8.000.000đ",
    type: "DOJI",
  },
  {
    id: 2,
    image: logo_coin,
    name: "Hưng Thịnh Vượng",
    asset: "100.000.000đ",
    quantity: 10,
    profit: "8.000.000đ",
    type: "DOJI",
  },
  {
    id: 3,
    image: logo_coin,
    name: "Hưng Thịnh Vượng",
    asset: "100.000.000đ",
    quantity: 10,
    profit: "8.000.000đ",
    type: "DOJI",
  },
  {
    id: 4,
    image: logo_coin,
    name: "Hưng Thịnh Vượng",
    asset: "100.000.000đ",
    quantity: 10,
    profit: "8.000.000đ",
    type: "DOJI",
  },
  {
    id: 5,
    image: logo_coin,
    name: "Hưng Thịnh Vượng",
    asset: "100.000.000đ",
    quantity: 10,
    profit: "8.000.000đ",
    type: "DOJI",
  },
  {
    id: 6,
    image: logo_coin,
    name: "Hưng Thịnh Vượng",
    asset: "100.000.000đ",
    quantity: 10,
    profit: "8.000.000đ",
    type: "DOJI",
  },
];

const Total = () => {
  const navigate = useNavigate();
  const [selectedDateStart, setSelectedDateStart] = useState<string>("");
  const [selectedDateEnd, setSelectedDateEnd] = useState<string>("");
  return (
    <>
      <div className="p_20">
        <div className="b_gw d_f j_cs b_r15">
          <div className="p_10 ">
            <div className="f_s20">Tổng tài sản đầu tư</div>
            <div className="d_f p_t8">
              <div>250.000đ</div>
              &nbsp;
              <div className="c_y f_s15">0đ</div>
            </div>
          </div>
          <div className=" p_10 d_f">
            <DatePicker
              value={selectedDateStart ? dayjs(selectedDateStart) : null}
              onChange={(date: string) => {
                if (date) {
                  setSelectedDateStart(dayjs(date).format("YYYY-MM-DD"));
                }
              }}
            />
            &nbsp;
            <DatePicker
              value={selectedDateEnd ? dayjs(selectedDateEnd) : null}
              onChange={(date: string) => {
                if (date) {
                  setSelectedDateEnd(dayjs(date).format("YYYY-MM-DD"));
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="p_lr20 f_1 ">
        <div className="b_gw p_10 b_r15 d_f g_10">
          <div className="b_1 b_r15 f_1">
            <div className="p_10 b_by">
              <div className="">Tài sản tích luỹ</div>
              <div className="d_f p_t8">
                <div>250.000đ</div>
                &nbsp;
                <div className="c_y f_s15">0đ</div>
              </div>
            </div>
            <div className="p_10">
              <div className="scroll">
                {ACCUMULATE_DATA.map((item) => (
                  <div key={item.id} className="b_g p_10 b_r15 m_t5" >
                    <div className="d_f a_i">
                      <img className="s_40" src={item.image} alt="" />
                      <div className="p_l10">
                        <div>{item.type}</div>
                        <div>{item.center}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p_t8">
                <div className="b_r15 t_a d_f">
                  <Button className="w_100" variant="contained" size="small" onClick = {() => navigate("/investment/assets/accumulate")}>
                    Xem tất cả{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="b_1 b_r15 f_1">
            <div className="p_10 b_by">
              <div className="">Tài sản Chứng chỉ quỹ</div>
              <div className="d_f p_t8">
                <div>250.000đ</div>
                &nbsp;
                <div className="c_y f_s15">0đ</div>
              </div>
            </div>
            <div className="p_10">
              <div className="scroll">
                {FUND_CERTIFICATE_DATA.map((item) => (
                  <div key={item.id} className="b_g p_10 b_r15 m_t5">
                    <div className="d_f a_i">
                      <img className="s_40" src={item.image} alt="" />
                      <div className="p_l10">
                        <div>{item.code}</div>
                        <div>{item.name}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p_t8">
                <div className="b_r15 t_a d_f">
                  <Button className="w_100" variant="contained" size="small" onClick = {() => navigate("/investment/assets/fundcertificate")}>
                    Xem tất cả{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="b_1 b_r15 f_1">
            <div className="p_10 b_by">
              <div className=""> Tài sản Vàng</div>
              <div className="d_f p_t8">
                <div>250.000đ</div>
                &nbsp;
                <div className="c_y f_s15">0đ</div>
              </div>
            </div>
            <div className="p_10">
              <div className="scroll">
                {GOLD_DATA.map((item) => (
                  <div key={item.id} className="b_g p_10 b_r15 m_t5">
                    <div className="d_f a_i">
                      <img className="s_40" src={item.image} alt="" />
                      <div className="p_l10">
                        <div>{item.name}</div>
                        <div>{item.type}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p_t8">
                <div className="d_f b_r15 t_a">
                  <Button className="w_100" variant="contained" size="small" onClick = {() => navigate("/investment/assets/gold")}>
                    Xem tất cả{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="b_1 b_r15 f_1">
            <div className="p_10 b_by">
              <div className="">Tài sản Coin</div>
              <div className="d_f p_t8">
                <div>250.000đ</div>
                &nbsp;
                <div className="c_y f_s15">0đ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Total;
