import logo_coin from "@/assets/images/logo/logo_coin.png";
import "@/styles/accumulate.css";
import { Button } from "@mui/material";
import { More } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import AddAccumulate from "@/app/components/modal/accumulate/AddAccumulate";
import ModifileAccumulate from "@/app/components/modal/accumulate/ModifileAccumulate";
import CashOutAccumulate from "@/app/components/modal/accumulate/CashOutAccumulate";

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

const Accumulate = () => {
  const [search, setSearch] = useState("");
  const [openAddAccumulate, setOpenAddAccumulate] = useState(false);
  const [openCashOutAccumulate, setOpenCashOutAccumulate] = useState(false);
  const [openModifileAccumulate, setOpenModifileAccumulate] = useState(false);
  const filteredData = ACCUMULATE_DATA.filter((item) => {
    const matchesSearch = item.type.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());
    return matchesSearch;
  })
  return (
    <>
      <div className="p_20">
        <div className="b_gw p_20 b_r20 d_fc">
          <div className="d_fc a_i w_100">
            <div className="b_1 p_10 b_r15 m_h500p w_100 d_f">
              <input
                className="search w_100"
                placeholder="Tìm kiếm sản phẩm tích luỹ"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchIcon />
            </div>
          </div>
          <div className="p_t20">
            <div className="d_f j_cs a_i p_l10 p_r10">
              <div className="f_s20">Danh sách sản phẩm tích luỹ</div>
              <div>
                <Button variant="contained" size="small" onClick={() => setOpenAddAccumulate(true)}>
                  Thêm
                </Button>
                &nbsp;
                <Button variant="contained" size="small">
                  Xoá
                </Button>
              </div>
            </div>
          </div>
          <div className="p_t20">
            <div className="p_r10">
              {filteredData.map((item) => (
                <div className="b_1 b_r15 m_t5">
                  <div className="p_10 d_f j_cs a_i">
                    <div className="d_f">
                      <div>
                        <img className="s_35" src={item.image} />
                      </div>
                      <div className="p_l10">
                        <div>Tích luỹ</div>
                        <div>{item.type}</div>
                      </div>
                    </div>
                    <div className="b_g p_10 p_lr20 b_r15">
                      <div>{item.center}</div>
                    </div>
                    <div className="d_f a_i">
                      <Button variant="contained" size="small" onClick={() => setOpenCashOutAccumulate(true)}>
                        Rút
                      </Button>
                      <More className="p_l10" onClick={() => setOpenModifileAccumulate(true)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddAccumulate
        open={openAddAccumulate}
        setOpen={setOpenAddAccumulate}
      />
      <ModifileAccumulate
        open={openModifileAccumulate}
        setOpen={setOpenModifileAccumulate}
      />
      <CashOutAccumulate
        open={openCashOutAccumulate}
        setOpen={setOpenCashOutAccumulate}
      />
    </>
  );
};
export default Accumulate;
