import Header from "@/app/components/header";
import Slidebar from "@/app/components/slidebar";
import "@/styles/default.css"
import { JSX } from "react";
interface DefaultLayoutProps {
  children: JSX.Element;
}
const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;
  return (
    <>
      <div className="container">
        <Slidebar />
        <div className="content">
          <Header />
          <div className="content_main">{children}</div>
        </div>
      </div>
    </>
  );
};
export default DefaultLayout;
