import { Button, buttonVariants } from "@ext-stack/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ext-stack/ui/components/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@ext-stack/ui/components/field";
import { Switch } from "@ext-stack/ui/components/switch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { RefreshCcwIcon } from "lucide-react";
import { apiClient } from "@/lib/api-client";

class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const userSettingQueryKey = ["user-setting"] as const;

async function getUserSetting() {
  const res = await apiClient.setting.$get();

  if (!res.ok) {
    throw new ApiError(`Server returned ${res.status}.`, res.status);
  }

  return res.json();
}

async function updateExtensionEnabled(extensionEnabled: boolean) {
  // Manually slow down 1s in dev environment
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  const res = await apiClient.setting.$patch({
    json: {
      extensionEnabled,
    },
  });

  if (!res.ok) {
    throw new ApiError(`Server returned ${res.status}.`, res.status);
  }

  return res.json();
}

export const UserSettingPanel = () => {
  const queryClient = useQueryClient();

  const {
    data: userSetting,
    error,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: userSettingQueryKey,
    queryFn: getUserSetting,
  });

  const updateSettingMutation = useMutation({
    mutationFn: updateExtensionEnabled,
    onSuccess: (data) => {
      queryClient.setQueryData(userSettingQueryKey, data);
    },
  });

  const isUnauthorized = error instanceof ApiError && error.status === 401;
  const isUpdating = updateSettingMutation.isPending;
  const isExtensionEnabled = userSetting?.extensionEnabled ?? false;

  if (isLoading) {
    return (
      <Card size="sm">
        <CardHeader>
          <CardTitle>Extension status</CardTitle>
          <CardDescription>Loading current setting...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (isUnauthorized) {
    return (
      <Card size="sm">
        <CardHeader>
          <CardTitle>Extension status</CardTitle>
          <CardDescription>
            Sign in to sync your extension setting.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            className={buttonVariants({
              className: "w-full",
            })}
            to="/sign-in"
          >
            Sign in
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (isError || !userSetting) {
    return (
      <Card size="sm">
        <CardHeader>
          <CardTitle>Extension status</CardTitle>
          <CardDescription>Could not load your setting.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            disabled={isFetching}
            onClick={() => refetch()}
            type="button"
            variant="outline"
          >
            <RefreshCcwIcon
              className={isFetching ? "animate-spin" : undefined}
            />
            {isFetching ? "Retrying..." : "Retry"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card size="sm">
      <CardHeader>
        <Field
          className="min-w-0"
          data-disabled={isUpdating}
          orientation="horizontal"
        >
          <FieldContent>
            <FieldLabel htmlFor="switch-extension-enabled">
              Extension status
            </FieldLabel>
            <FieldDescription>
              {isExtensionEnabled
                ? "Enabled for this account."
                : "Disabled for this account."}
            </FieldDescription>
          </FieldContent>
          <Switch
            checked={isExtensionEnabled}
            disabled={isUpdating}
            id="switch-extension-enabled"
            onCheckedChange={(checked) => updateSettingMutation.mutate(checked)}
          />
        </Field>
      </CardHeader>
      {updateSettingMutation.isError ? (
        <CardContent>
          <p className="text-destructive text-sm">
            Failed to update setting. Try again.
          </p>
        </CardContent>
      ) : null}
    </Card>
  );
};
