import { Button } from "@ext-stack/ui/components/button";
import { useCanGoBack, useRouter } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";
import type * as React from "react";

interface BackButtonProps {
  className?: string;
  fallback?: React.ReactNode;
}

export const BackButton = ({ className, fallback = null }: BackButtonProps) => {
  const router = useRouter();
  const canGoBack = useCanGoBack();

  if (!canGoBack) {
    return fallback;
  }

  return (
    <Button
      className={className}
      onClick={() => router.history.back()}
      size="icon"
      type="button"
      variant="ghost"
    >
      <ChevronLeftIcon />
      <span className="sr-only">Back</span>
    </Button>
  );
};
