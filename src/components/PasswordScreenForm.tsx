import { memo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";

export interface PasswordScreenFormInputType {
  password: string;
  repeatPassword: string;
}

interface IScreenFormProps {
  onSubmit: SubmitHandler<PasswordScreenFormInputType>;
}

const PasswordScreenForm: React.FC<IScreenFormProps> = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      repeatPassword: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 py-10 bg-slate-500 rounded-[20px] flex-col justify-start items-end gap-10 inline-flex"
    >
      <Controller
        name="password"
        control={control}
        rules={{
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters.",
          },
          maxLength: {
            value: 16,
            message: "Password must be at most 16 characters.",
          },
          required: "Password is required.",
        }}
        render={({ field }) => (
          <Input
            type="password"
            label="Password"
            placeholder="Input password"
            errorText={errors.password?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="repeatPassword"
        control={control}
        rules={{
          validate: (val: string) => {
            if (watch("password") != val) {
              return "Your passwords do no match";
            }
          },
        }}
        render={({ field }) => (
          <Input
            type="password"
            label="Repeat Password"
            placeholder="Input repeat password"
            errorText={errors.repeatPassword?.message}
            {...field}
          />
        )}
      />

      <Button type="submit" disabled={Object.keys(errors).length > 0}>
        Continue
      </Button>
    </form>
  );
};

export default memo(PasswordScreenForm);
