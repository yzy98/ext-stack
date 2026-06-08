import { AuthStatus } from "@/components/auth-status";
import { ModeToggle } from "@/components/mode-toggle";
import { ServerHealth } from "@/components/server-health";

function App() {
  return (
    <main className="flex min-h-[480px] w-[360px] flex-col gap-4 bg-background p-4 text-foreground">
      <div>
        <h1 className="font-semibold text-lg">ExtStack</h1>
        <p className="text-muted-foreground text-sm">
          Browser extension dashboard
        </p>
      </div>

      <ServerHealth />
      <AuthStatus />
      <ModeToggle />
    </main>
  );
}

export default App;
