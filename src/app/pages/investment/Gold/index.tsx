import logo_coin from "@/assets/images/logo/logo_coin.png";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { More } from "@mui/icons-material";
import { useState } from "react";
import AddGold from "@/app/components/modal/gold/AddGold";
import ModifileGold from "@/app/components/modal/gold/ModifileGold";
import SellGold from "@/app/components/modal/gold/SellGold";
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
const Gold = () => {
  const [openAddGold, setOpenAddGold] = useState(false);
  const [openModifileGold, setOpenModifileGold] = useState(false);
  const [openSellGold, setOpenSellGold] = useState(false);
  const [search, setSearch] = useState("");
  const filteredData = GOLD_DATA.filter((item) => {
    const matchesSearch = item.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());
    return matchesSearch;
  })
  return (
    <>
      <div className="p_20">
        <div className="b_gw p_t20 b_r20 d_fc">
          <div className="d_fc a_i ">
            <div className="b_1 p_10 b_r15 d_f m_h500p w_100">
              <input className="search w_100" placeholder="Tìm kiếm " value={search} onChange={(e) => setSearch(e.target.value)} />
              <SearchIcon />
            </div>
          </div>
          <div className="p_20">
            <div className="d_f j_cs a_i p_l10 p_r10">
              <div className="f_s20">Danh sách sản phẩm Vàng</div>
              <div>
                <Button variant="contained" size="small" onClick={() => setOpenAddGold(true)}>
                  Thêm
                </Button>
                &nbsp;
                <Button variant="contained" size="small">
                  Xoá
                </Button>
              </div>
            </div>
          </div>
          <div className="p_20">
            <div className=" p_r10">
              {filteredData.map((item) => (
                <div key={item.id} className="b_1 b_r15 m_t5">
                  <div className="p_10 d_f j_cs">
                    <div className="d_fc">
                      <div className="d_f">
                        <div>
                          <img className="s_35" src={logo_coin} />
                        </div>
                        <div className="p_l10">
                          <div>{item.name}</div>
                          <div>{item.asset}</div>
                        </div>
                      </div>
                      <div className="d_f">
                        <div>Số lượng: {item.quantity}</div>
                        &nbsp;
                        <div className="c_y">Lợinhuận: {item.profit}</div>
                      </div>
                    </div>
                    <div>
                      <div>{item.type}</div>
                    </div>
                    <div>
                      <div>9.170.000đ</div>
                      <div>7.1%</div>
                    </div>
                    <div className="d_f a_i">
                      <Button variant="contained" size="small" onClick={() => setOpenSellGold(true)}>Bán</Button>
                      <More className="p_l10" onClick={() => setOpenModifileGold(true)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddGold
        open={openAddGold}
        setOpen={setOpenAddGold}
      />
      <ModifileGold
        open={openModifileGold}
        setOpen={setOpenModifileGold}
      />
      <SellGold
        open={openSellGold}
        setOpen={setOpenSellGold}
      />
    </>
  );
};
export default Gold;
