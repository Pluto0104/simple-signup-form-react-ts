import { memo, useContext } from "react";
import Button from "./Button";
import { AppContext } from "../providers/AppProvider";

interface IReviewFormProps {
  onSubmit: VoidFunction;
}

const ReviewForm: React.FC<IReviewFormProps> = ({ onSubmit }) => {
  const {
    userInfo: { username, email, country },
    getCountryName,
  } = useContext(AppContext);

  return (
    <div className="px-5 py-10 bg-slate-500 rounded-[20px] flex-col justify-start items-end gap-10 inline-flex">
      <div className="w-[360px] h-24 flex-col justify-start items-start gap-6 inline-flex">
        <div className="w-full justify-between items-start inline-flex">
          <div className="text-slate-300 text-sm font-normal font-['Inter'] leading-none">
            Username
          </div>
          <div className="text-white text-sm font-medium font-['Inter'] leading-none">
            {username}
          </div>
        </div>
        <div className="w-full justify-between items-start inline-flex">
          <div className="text-slate-300 text-sm font-normal font-['Inter'] leading-none">
            Email
          </div>
          <div className="text-white text-sm font-medium font-['Inter'] leading-none">
            {email}
          </div>
        </div>
        <div className="w-full justify-between items-start inline-flex">
          <div className="text-slate-300 text-sm font-normal font-['Inter'] leading-none">
            Country
          </div>
          <div className="text-white text-sm font-medium font-['Inter'] leading-none">
            {getCountryName(country)}
          </div>
        </div>
      </div>
      <Button onClick={onSubmit}>Complete</Button>
    </div>
  );
};

export default memo(ReviewForm);
