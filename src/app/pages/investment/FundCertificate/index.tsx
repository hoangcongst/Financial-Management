import logo_coin from "@/assets/images/logo/logo_coin.png";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { More } from "@mui/icons-material";
import { useState } from "react";
import AddCertificate from "@/app/components/modal/fundcertificate/AddCertificate";
import ModifileCertificate from "@/app/components/modal/fundcertificate/ModifileCertificate";
import SellCertificate from "@/app/components/modal/fundcertificate/SellCertificate";

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

const FundCertificate = () => {
  const [openAddCertificate, setOpenAddCertificate] = useState(false);
  const [openModifileCertificate, setOpenModifileCertificate] = useState(false);
  const [openSellCertificate, setOpenSellCertificate] = useState(false);
  const [searchCode, setSearchCode] = useState("");
  const [searchName, setSearchName] = useState("");
  const filteredData = FUND_CERTIFICATE_DATA.filter((item) => {
    const matchesSearchCode = item.code.toLocaleLowerCase().includes(searchCode.trim().toLocaleLowerCase());
    const matchesSearchName = item.name.toLocaleLowerCase().includes(searchName.trim().toLocaleLowerCase());
    return matchesSearchCode && matchesSearchName;
  })
  return (
    <>
      <div className="p_20">
        <div className="b_gw b_r20">
          <div className="p_20 d_f">
            <div className="b_1 p_10 b_r15 d_f w_100">
              <input className="search w_100" placeholder="Tìm kiếm " value={searchCode} onChange={(e) => setSearchCode(e.target.value)} />
              <SearchIcon />
            </div>
            &nbsp;
            <div className="b_1 p_10 b_r15 d_f w_100">
              <input
                className="search w_100"
                placeholder="Tìm kiếm nhà phát hành"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <SearchIcon />
            </div>
            &nbsp;
            <div className="b_1 p_10 b_r15 d_f w_100">
              <input
                className="search w_100"
                placeholder="Tìm kiếm loại chứng chỉ quỹ"
              />
              <SearchIcon />
            </div>
          </div>
          <div className="p_lr20">
            <div className="d_f j_cs a_i p_l10 p_r10">
              <div className="f_s20">Danh sách sản phẩm Chứng chỉ quỹ</div>
              <div>
                <Button variant="contained" size="small" onClick={() => setOpenAddCertificate(true)}>
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
            <div className="p_r10">
              {filteredData.map((item) => (
                <div key={item.id} className="b_1 b_r15 m_t5">
                  <div className="p_10 d_f j_cs">
                    <div className="d_fc">
                      <div className="d_f">
                        <div>
                          <img className="s_35" src={logo_coin} />
                        </div>
                        <div className="p_l10">
                          <div>{item.code}</div>
                          <div>{item.name}</div>
                        </div>
                      </div>
                      <div className="d_f">
                        <div>Số lượng: {item.quantity}</div>
                        &nbsp;
                        <div className="c_y">Lợinhuận: {item.profit}</div>
                      </div>
                    </div>
                    <div>
                      <div>{item.name}</div>
                      <div>19.688,69 đ</div>
                      <div>2.09%</div>
                    </div>
                    <div className="d_f a_i">
                      <Button variant="contained" size="small" onClick={() => setOpenSellCertificate(true)}>Bán</Button>
                      <More className="p_l10" onClick={() => setOpenModifileCertificate(true)} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <AddCertificate
        open={openAddCertificate}
        setOpen={setOpenAddCertificate}
      />
      <ModifileCertificate
        open={openModifileCertificate}
        setOpen={setOpenModifileCertificate}
      />
      <SellCertificate
        open={openSellCertificate}
        setOpen={setOpenSellCertificate}
      />
    </>
  );
};
export default FundCertificate;
