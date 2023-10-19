import { memo, useContext, useMemo } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Dropdown from "./Dropdown";
import Input from "./Input";
import { AppContext } from "../providers/AppProvider";

export interface InitialFormInputType {
  username: string;
  email: string;
  country: string;
}

interface IInitialFormProps {
  onSubmit: SubmitHandler<InitialFormInputType>;
}

const InitialInfoForm: React.FC<IInitialFormProps> = ({ onSubmit }) => {
  const { countries } = useContext(AppContext);
  const countryOptions = useMemo(() => {
    return countries.map(({ name, cca2 }) => ({
      label: name.common,
      value: cca2,
    }));
  }, [countries]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      country: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 py-10 bg-slate-500 rounded-[20px] flex-col justify-start items-end gap-10 inline-flex"
    >
      <Controller
        name="username"
        control={control}
        rules={{
          minLength: {
            value: 4,
            message: "Username must be at least 4 characters.",
          },
          maxLength: {
            value: 12,
            message: "Username must be at most 12 characters.",
          },
          required: "Username is required.",
        }}
        render={({ field }) => (
          <Input
            label="Username"
            placeholder="Input username"
            errorText={errors.username?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Please enter a valid email address.",
          },
        }}
        render={({ field }) => (
          <Input
            label="Email"
            placeholder="Input email"
            errorText={errors.email?.message}
            {...field}
          />
        )}
      />
      <Controller
        name="country"
        control={control}
        rules={{ required: "Please select a country." }}
        render={({ field: { value, onChange } }) => (
          <Dropdown
            label="Country"
            placeholder="Select country"
            options={countryOptions}
            value={value}
            onChange={onChange}
            errorText={errors.country?.message}
          />
        )}
      />

      <Button type="submit" disabled={Object.keys(errors).length > 0}>
        Continue
      </Button>
    </form>
  );
};

export default memo(InitialInfoForm);
