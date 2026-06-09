import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PopupTopBar } from "@/components/popup-top-bar";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <>
      <PopupTopBar />
      <Outlet />
    </>
  );
}
