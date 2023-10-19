import clsx from "clsx";
import { useState, useEffect, memo } from "react";

type OptionItemType = {
  label?: string;
  value: string;
};

interface IDropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  options?: OptionItemType[];
  label?: string;
  placeholder?: string;
  errorText?: string;
}

const Dropdown: React.FC<IDropdownProps> = ({
  label = "Title",
  placeholder = "Placeholder",
  value,
  onChange,
  options = [],
  errorText,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | undefined>();

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleToggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleChange = (option: string) => {
    onChange && onChange(option);
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`w-80 flex-col justify-start items-start gap-2 inline-flex cursor-pointer`}
        onClick={handleToggleDropdown}
      >
        <span className="text-white text-sm font-normal font-['Inter'] leading-none">
          {label}
        </span>
        <div className="w-full pl-4 pr-3 py-2 bg-white justify-between items-center inline-flex">
          <span
            className={clsx("text-sm font-normal font-['Inter'] leading-none", {
              "text-slate-300": !selectedOption,
              "text-gray-700": selectedOption,
            })}
          >
            {selectedOption
              ? options.find((option) => selectedOption === option.value)
                  ?.label || selectedOption
              : placeholder}
          </span>
          <div className="w-6 h-6 justify-center items-center inline-flex">
            <img
              alt="Dropdown Icon"
              src={`/assets/images/${
                isOpen ? "arrow_up.svg" : "arrow_down.svg"
              }`}
            />
          </div>
        </div>
        {errorText && (
          <div className="text-red-600 text-sm font-normal font-['Inter'] leading-none">
            {errorText}
          </div>
        )}
      </div>
      {isOpen && (
        <div className="relative">
          <ul className="w-80 max-h-[200px] absolute bg-white z-10 scrollbar-thin scrollbar-thumb-violet-200 scrollbar-track-transparent overflow-y-scroll">
            {options.map((option, index) => (
              <li
                key={`dropdown-item-${index}`}
                onClick={() => handleChange(option.value)}
                className="h-10 px-4 py-3 odd:bg-white even:bg-violet-50 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={clsx(
                      "text-gray-700 text-sm font-['Inter'] leading-none",
                      {
                        "font-semibold": selectedOption === option.value,
                        "font-normal": selectedOption !== option.value,
                      }
                    )}
                  >
                    {option.label || option.value}
                  </span>
                  {selectedOption === option.value && (
                    <img
                      alt="Dropdown Checked Icon"
                      src="/assets/images/check.svg"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default memo(Dropdown);
