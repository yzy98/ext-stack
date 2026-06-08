import { Button } from "@ext-stack/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ext-stack/ui/components/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@ext-stack/ui/components/field";
import { Input } from "@ext-stack/ui/components/input";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

const DEFAULT_SIGN_IN_VALUE: SignInValues = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: DEFAULT_SIGN_IN_VALUE,
    validators: {
      onSubmit: signInSchema,
      onBlur: signInSchema,
    },
    onSubmit: async ({ value }) => {
      const { email, password } = value;

      await authClient.signIn.email(
        {
          email,
          password,
        },
        {
          onSuccess: () => {
            navigate({ to: "/dashboard" });
          },
        }
      );
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="sign-in-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="email"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="you@example.com"
                      required
                      type="email"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      aria-invalid={isInvalid}
                      autoComplete="current-password"
                      id={field.name}
                      name={field.name}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      required
                      type="password"
                      value={field.state.value}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button form="sign-in-form" type="submit">
            Login
          </Button>
          <FieldDescription className="px-6 text-center">
            Don&apos;t have an account? <Link to="/sign-up">Sign up</Link>
          </FieldDescription>
        </Field>
      </CardFooter>
    </Card>
  );
};
