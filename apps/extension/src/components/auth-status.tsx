import { Button } from "@ext-stack/ui/components/button";
import { authClient } from "@/lib/auth-client";

export const AuthStatus = () => {
  const { useSession, signOut } = authClient;
  const { data: session, isPending } = useSession();

  if (isPending || !session) {
    return <div>No session</div>;
  }

  const handleLogOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          // [TODO] redirect and toast
        },
      },
    });
  };

  return (
    <div>
      {session.user.name} logged in!!!
      <Button onClick={handleLogOut} type="button">
        Log out
      </Button>
    </div>
  );
};
