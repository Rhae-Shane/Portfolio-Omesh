import { Outlet } from "react-router-dom";
import FloatingNav from "../ui/FloatingNav";
import DigitalClock from "../ui/DigitalClock"
import SmoothScroll from "../SmoothScroll"

const Layout = () => {
  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <SmoothScroll />
      <DigitalClock />
      <main>
        <Outlet />
      </main>
      <FloatingNav aboutPicture="/assets/dp.jpeg" />
    </div>
  );
};

export default Layout;
