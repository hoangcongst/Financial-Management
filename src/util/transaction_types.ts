


import fooddrink from "@/assets/images/spends/spend_fooddrink.png";
import spend135 from "@/assets/images/spends/spend_135.png";
import spend136 from "@/assets/images/spends/spend_136.png";
import spend124 from "@/assets/images/spends/spend_124.png";
import spend134 from "@/assets/images/spends/spend_134.png";
import spend125 from "@/assets/images/spends/spend_125.png";
import spend139 from "@/assets/images/spends/spend_139.png";
import spend4 from "@/assets/images/spends/spend_4.png";
import spend29 from "@/assets/images/spends/spend_29.png";
import spend41 from "@/assets/images/spends/spend_41.png";
import spend49 from "@/assets/images/spends/spend_49.png";
import spend53 from "@/assets/images/spends/spend_53.png";
import spend63 from "@/assets/images/spends/spend_63.png";
import spend70 from "@/assets/images/spends/spend_70.png";
import spend84 from "@/assets/images/spends/spend_84.png";
import spend94 from "@/assets/images/spends/spend_94.png";
import spend107 from "@/assets/images/spends/spend_107.png";
import spend126 from "@/assets/images/spends/spend_126.png";
import spend130 from "@/assets/images/spends/spend_130.png";
import spend137 from "@/assets/images/spends/spend_137.png";
import spend138 from "@/assets/images/spends/spend_138.png";
import spend142 from "@/assets/images/spends/spend_142.png";
import doctor from "@/assets/images/spends/spend_doctor.png";
import donations from "@/assets/images/spends/spend_donations.png";
import education from "@/assets/images/spends/spend_education.png";
import entertainment from "@/assets/images/spends/spend_entertainment.png";
import family from "@/assets/images/spends/spend_family.png";
import invest from "@/assets/images/spends/spend_invest.png";
import medical from "@/assets/images/spends/spend_medical.png";
import otherexpense from "@/assets/images/spends/spend_other_expense.png";
import shopping from "@/assets/images/spends/spend_shopping.png";
import transport from "@/assets/images/spends/spend_transport.png";
import income143 from "@/assets/images/income/income_143.png";
import incomeinterestmoney from "@/assets/images/income/income_interestmoney.png";
import incomeother from "@/assets/images/income/income_other.png";
import incomesalary from "@/assets/images/income/income_salary.png";
import lend140 from "@/assets/images/lend/lend_140.png";
import lend141 from "@/assets/images/lend/lend_141.png";
import lenddebt from "@/assets/images/lend/lend_debt.png";
import lendloan from "@/assets/images/lend/lend_loan.png";

export interface TransactionType {
  id: number;
  image: string;
  name: string;
  category: string;
}

export const TRANSACTION_TYPES: TransactionType[] = [
  { id: 1, image: fooddrink, name: "Ăn uống", category: "spend" },
  { id: 2, image: spend135, name: "Hoá đơn", category: "spend" },
  { id: 3, image: spend136, name: "Tiền nhà", category: "spend" },
  { id: 4, image: spend124, name: "Điện nước", category: "spend" },
  { id: 5, image: spend134, name: "Tiền điện thoại", category: "spend" },
  { id: 6, image: spend125, name: "Internet", category: "spend" },
  { id: 7, image: spend139, name: "Tiền gas", category: "spend" },
  { id: 9, image: spend4, name: "Trả lãi", category: "spend" },
  { id: 10, image: spend29, name: "Sửa & trang trí nhà", category: "spend" },
  { id: 11, image: spend41, name: "Đồ dùng cá nhân", category: "spend" },
  { id: 12, image: spend49, name: "Vui-chơi", category: "spend" },
  { id: 13, image: spend53, name: "Vật nuôi", category: "spend" },
  { id: 14, image: spend63, name: "Làm đẹp", category: "spend" },
  { id: 15, image: spend70, name: "Thể dục thể thao", category: "spend" },
  { id: 16, image: spend84, name: "Hoá đơn TV", category: "spend" },
  { id: 17, image: spend94, name: "Dịch vụ trực tuyến", category: "spend" },
  { id: 18, image: spend107, name: "Đồ gia dụng", category: "spend" },
  { id: 19, image: spend126, name: "Hoá đơn internet", category: "spend" },
  { id: 20, image: spend130, name: "Bảo dưỡng xe", category: "spend" },
  { id: 21, image: spend137, name: "Bảo hiểm", category: "spend" },
  { id: 22, image: spend138, name: "Hoá đơn tiện ích khác", category: "spend" },
  { id: 23, image: spend142, name: "Tiền chuyển đi", category: "spend" },
  { id: 24, image: doctor, name: "Khám sức khoẻ", category: "spend" },
  { id: 25, image: donations, name: "Quà tặng & Quyên góp", category: "spend" },
  { id: 26, image: education, name: "Giáo dục", category: "spend" },
  { id: 27, image: entertainment, name: "Giải trí", category: "spend" },
  { id: 28, image: family, name: "Dịch vụ gia đình", category: "spend" },
  { id: 29, image: invest, name: "Đầu tư", category: "spend" },
  { id: 30, image: medical, name: "Sức khoẻ", category: "spend" },
  { id: 31, image: otherexpense, name: "Các chi phi khác", category: "spend" },
  { id: 32, image: shopping, name: "Mua sắm", category: "spend" },
  { id: 33, image: transport, name: "Di chuyển", category: "spend" },
  { id: 34, image: income143, name: "Tiền chuyển đến", category: "income" },
  { id: 35, image: incomeinterestmoney, name: "Tiền lãi", category: "income" },
  { id: 36, image: incomeother, name: "Tiền khác", category: "income" },
  { id: 37, image: incomesalary, name: "Tiền lương", category: "income" },
  { id: 38, image: lend140, name: "Cho nợ", category: "lend" },
  { id: 39, image: lend141, name: "Vay nợ", category: "lend" },
  { id: 40, image: lenddebt, name: "Cho vay", category: "lend" },
  { id: 41, image: lendloan, name: "Đi vay", category: "lend" },
];