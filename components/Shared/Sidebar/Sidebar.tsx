import Logo from "../Logo/Logo";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";

export default function Sidebar() {
  return (
    <>
      <div className="py-6">
        <Logo></Logo>
      </div>
      <SidebarRoutes></SidebarRoutes>
    </>
  );
}
