import { forwardRef } from "react";
import clsx from "clsx";

interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  {
    type = "text",
    placeholder = "Placeholder",
    className,
    label = "Title",
    errorText,
    ...rest
  },
  ref
) => {
  return (
    <div className="w-80 h-16 flex-col justify-start items-start gap-2 inline-flex">
      <div className="text-white text-sm font-normal font-['Inter'] leading-none">
        {label}
      </div>
      <div className="w-80 pl-4 pr-3 py-3 bg-white justify-start items-center inline-flex">
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "flex-grow placeholder-slate-300 text-gray-700 text-sm font-normal font-['Inter'] leading-none border-none outline-none",
            className
          )}
          {...rest}
        />
        {errorText && (
          <img alt="Incorrect Input" src="/assets/images/error.svg" />
        )}
      </div>
      {errorText && (
        <div className="text-red-600 text-sm font-normal font-['Inter'] leading-none">
          {errorText}
        </div>
      )}
    </div>
  );
};

export default forwardRef<HTMLInputElement, IInputProps>(Input);
