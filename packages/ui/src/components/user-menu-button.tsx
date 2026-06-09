import type { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface UserMenuButtonProps {
  items: Array<{
    id: string;
    label: string;
    icon?: LucideIcon;
    onSelect: () => void;
    variant?: Parameters<typeof DropdownMenuItem>[0]["variant"];
  }>;
  user: {
    name: string;
    email: string;
    image: string | null | undefined;
  };
}

export const UserMenuButton = ({ user, items }: UserMenuButtonProps) => {
  const { name, image, email } = user;
  const fallback = name.at(0)?.toUpperCase() ?? "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button className="rounded-full" size="icon" variant="ghost">
            <Avatar>
              {image ? <AvatarImage alt={name} src={image} /> : null}
              <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Open user menu</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-50 overflow-hidden p-0">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar>
            {image ? <AvatarImage alt={name} src={image} /> : null}
            <AvatarFallback>{fallback}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate font-medium text-sm">{name}</p>
            <p className="truncate text-muted-foreground text-sm">{email}</p>
          </div>
        </div>
        {items.length > 0 ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {items.map((item) => {
                const {
                  id,
                  label,
                  onSelect,
                  icon: Icon,
                  variant = "default",
                } = item;

                return (
                  <DropdownMenuItem
                    key={id}
                    onClick={onSelect}
                    variant={variant}
                  >
                    {Icon ? <Icon /> : null}
                    {label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
