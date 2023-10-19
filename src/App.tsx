import { useCallback, useContext, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import InitialInfoForm, {
  InitialFormInputType,
} from "./components/InitialInfoForm";
import StepLabelList from "./components/StepLabelList";
import PasswordScreenForm, {
  PasswordScreenFormInputType,
} from "./components/PasswordScreenForm";
import ReviewForm from "./components/ReviewForm";
import { AppContext } from "./providers/AppProvider";
import "./App.css";

const stepLabels = ["Initial Info", "Password screen", "Review"];

function App() {
  const { updateUserInfo } = useContext(AppContext);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const handleInitialInfoFormSubmit: SubmitHandler<InitialFormInputType> =
    useCallback(
      (data) => {
        updateUserInfo(data);
        setCurrentStepIndex((prev) => prev + 1);
      },
      [updateUserInfo]
    );

  const handlePasswordScreenFormSubmit: SubmitHandler<PasswordScreenFormInputType> =
    useCallback(
      ({ password }) => {
        updateUserInfo({ password });
        setCurrentStepIndex((prev) => prev + 1);
      },
      [updateUserInfo]
    );

  const handleStepLabelFormSubmit = useCallback(() => {
    setCurrentStepIndex(0);
  }, []);

  return (
    <div className="flex flex-col items-center bg-simple-test-form-bg h-[100vh]">
      <div className="flex-col justify-start items-center gap-4 inline-flex mt-20 mb-10">
        <div className="text-gray-700 text-4xl font-medium font-['Inter']">
          Super test form
        </div>
        <div className="text-slate-500 text-xl font-normal font-['Inter']">
          {[stepLabels[currentStepIndex]]}
        </div>
      </div>
      <div className="relative w-full">
        <div className="absolute left-20">
          <StepLabelList labels={stepLabels} value={currentStepIndex} />
        </div>
        <div className="flex w-full justify-center mt-5">
          {currentStepIndex === 0 && (
            <InitialInfoForm onSubmit={handleInitialInfoFormSubmit} />
          )}
          {currentStepIndex === 1 && (
            <PasswordScreenForm onSubmit={handlePasswordScreenFormSubmit} />
          )}
          {currentStepIndex === 2 && (
            <ReviewForm onSubmit={handleStepLabelFormSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
