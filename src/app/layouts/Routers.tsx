/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import InvestLayout from "@/app/layouts/InvestLayout";
import { DEFAULT_LAYOUT,INVEST_LAYOUT, NONE_LAYOUT } from "@/constants/layout";
import URL from "@/constants/url";
import NoneLayout from "@/app/layouts/NoneLayout";
import PrivateRoute from "@/app/layouts/PrivateRoute";
const Home = lazy(() => import("@/app/pages/home"));
const Spend = lazy(() => import("@/app/pages/home/Spend"));
const Total = lazy(() => import("@/app/pages/investment/Total"));
const Accumulate = lazy(() => import("@/app/pages/investment/Accumulate"));
const FundCertificate = lazy(() => import("@/app/pages/investment/FundCertificate"));
const Gold = lazy(() => import("@/app/pages/investment/Gold"));
const Crypto = lazy(() => import("@/app/pages/investment/Crypto"));
const Income = lazy(() => import("@/app/pages/home/Income"));
const Lend = lazy(() => import("@/app/pages/home/Lend"));
const Bank = lazy(() => import("@/app/pages/home/Banktransaction"));
const Log = lazy(() => import("@/app/pages/home/Transactionlog"));
const Notification = lazy(() => import("@/app/pages/notifications"));
const Market = lazy(() => import("@/app/pages/market"));
const Login = lazy(() => import("@/app/pages/login"));
const Register = lazy(() => import("@/app/pages/register"));
const NotFound = lazy(() => import("@/app/pages/results/NotFound"));


const menuShared  = [
  {
    key: URL.Login,
    components: <Login/>,
    layout: NONE_LAYOUT,
    private: false,
  },
  {
    key: URL.Register,
    components: <Register/>,
    layout: NONE_LAYOUT,
    private: false,
  },
  {
    key: "*",
    components: <NotFound/>,
    layout: NONE_LAYOUT,
    private: false,
  }
]

const menuInvest = [
  {
    key: URL.Total,
    components: <Total/>,
    layout: INVEST_LAYOUT,
    private: true,
  },
  {
    key: URL.Accumulate,
    components: <Accumulate/>,
    layout: INVEST_LAYOUT,
    private: true,
  },
  {
    key: URL.FundCertificate,
    components: <FundCertificate/>,
    layout: INVEST_LAYOUT,
    private: true,
  },
  {
    key: URL.Gold,
    components: <Gold/>,
    layout: INVEST_LAYOUT,
    private: true,
  },
  {
    key: URL.Crypto,
    components: <Crypto/>,
    layout: INVEST_LAYOUT,
    private: true,
  }
];
const menuDefault = [
  {
    key: URL.Market,
    components: <Market/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Home,
    components: <Home/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Spend,
    components: <Spend/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Income,
    components: <Income/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Lend,
    components: <Lend/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Bank,
    components: <Bank/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Log,
    components: <Log/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
  {
    key: URL.Notification,
    components: <Notification/>,
    layout: DEFAULT_LAYOUT,
    private: true,
  },
];
const menus = [...menuShared, ...menuInvest, ...menuDefault];
const Routers = () => {
  return (
    <Routes>
      {menus.map((item: any) => {
        let element = item.components;
        element = <Suspense fallback={null}>{element}</Suspense>

        if (item.private) {
          element = <PrivateRoute>{element}</PrivateRoute>
        }
        if (item.layout === DEFAULT_LAYOUT){
          element = <DefaultLayout>{element}</DefaultLayout>
        }
        if (item.layout === INVEST_LAYOUT){
          element = <InvestLayout>{element}</InvestLayout>
        }
        if (item.layout === NONE_LAYOUT) {
          element = <NoneLayout>{element}</NoneLayout>
        }
        return (
          <Route key={item.key} path={item.key} element={element} />
        )
      })}
    </Routes>
  )
}
export default Routers