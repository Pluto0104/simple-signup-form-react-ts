import { memo } from "react";
import clsx from "clsx";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      disabled={disabled}
      className={clsx(
        "w-full py-4 rounded justify-center items-center inline-flex",
        {
          "bg-white": !disabled,
          "bg-slate-300 cursor-not-allowed": disabled,
        }
      )}
      {...rest}
    >
      <span
        className={clsx("text-2xl font-medium font-['Inter']", {
          "text-gray-700": !disabled,
          "text-slate-400": disabled,
        })}
      >
        {children}
      </span>
    </button>
  );
};

export default memo(Button);
