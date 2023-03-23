import { Outlet } from "react-router-dom";
import { Footer } from "../Footer";
import { Header } from "../Header"; // ⚠️ verify it's the correct path

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
