import notify from "@/assets/images/notify-seen.svg";

const Notification = () => {
  return (
    <>
      <div className="p_40">
        <div className="p_40 b_gw b_r20">
          <div className="d_f j_cs">
            <div className="f_s20">Thông báo</div>
            <div>Đã đọc hết </div>
          </div>
          <div className="p_20">
            <div className="b_g p_10 b_r15 d_f a_i">
              <div>
                <img src={notify} />
              </div>
              <div className="p_l10">
                <div>15/02/2025・22:36:43</div>
                <div>Nhận thưởng TOPI</div>
                <div>
                  Bạn đã nhận được 10 TOPI nhờ Hoàn thành nhiệm vụ Tạo tài khoản
                  TOPI
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Notification;
