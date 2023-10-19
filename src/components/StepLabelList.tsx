import { memo } from "react";
import clsx from "clsx";

interface IStepLabelListProps {
  labels: string[];
  value?: number;
  className?: string;
}

const StepLabelList: React.FC<IStepLabelListProps> = ({
  labels,
  value = 0,
  className,
}) => {
  return (
    <ul
      className={clsx(
        "flex-col justify-start items-start gap-5 inline-flex",
        className
      )}
    >
      {labels.map((stepper, index) => (
        <li
          key={`stepper-item-${index}`}
          className="justify-start items-center gap-3 inline-flex"
        >
          <div className="w-4 h-4 relative">
            <div
              className={clsx("w-4 h-4 left-0 top-0 absolute rounded-sm", {
                "bg-zinc-400": value > index,
                "bg-indigo-600": value === index,
                "bg-slate-300": value < index,
              })}
            ></div>
          </div>
          <div className="text-slate-500 text-sm font-normal font-['Inter'] leading-none">
            {stepper}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default memo(StepLabelList);
