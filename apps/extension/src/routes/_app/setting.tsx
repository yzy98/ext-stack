import { createFileRoute } from "@tanstack/react-router";
import { UserSettingPanel } from "@/components/user-setting-panel";

export const Route = createFileRoute("/_app/setting")({
  component: SettingPage,
});

function SettingPage() {
  return (
    <div className="flex flex-1 flex-col gap-5">
      <UserSettingPanel />
    </div>
  );
}
