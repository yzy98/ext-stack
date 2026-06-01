import { Button } from "@ext-stack/ui/components/button";
import { ModeToggle } from "@/components/mode-toggle";
import { ServerHealth } from "@/components/server-health";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-6">
      <div className="flex items-center gap-2">
        <Button>test</Button>
        <ModeToggle />
      </div>
      <ServerHealth />
    </div>
  );
}

export default App;
