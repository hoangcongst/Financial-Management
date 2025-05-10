
import "@/styles/default.css";
import { JSX } from "react";
interface DefaultLayoutProps {
  children: JSX.Element;
}
const DefaultLayout = (props: DefaultLayoutProps) => {
  const { children } = props;
  return (
    <>
      <div>{children}</div>
    </>
  );
};
export default DefaultLayout;
