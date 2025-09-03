import Sidebar from "@/components/layout/Sidebar";
import AppView from "@/components/layout/AppView";

export default function RestaurantLayout({ children }) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-[60%]">{children}</div>
      <AppView />
    </div>
  );
}
