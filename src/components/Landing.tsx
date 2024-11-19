import React, { useEffect, useState } from "react";
import JsonEditor from "./JsonEditor";
import FormPreview from "./FormPreview";
import Navbar from "./Navbar";
import { ProjectRequirementsSurvey } from "../utils/schema";
import { givenSchema } from "../utils/schema";
import { Validate } from "../utils/validator";

interface props {
  dark: boolean;
  setDark: (arg0: boolean) => void;
}
const LeftRightDivs: React.FC<props> = ({ dark, setDark }) => {
  const [jsonString, setJsonString] = useState(givenSchema);

  const [jsonObject, setJsonObject] =
    useState<ProjectRequirementsSurvey | null>(null);
  const [err, setErr] = useState<string>("");
  const [validError, setValidError] = useState<any>();
  useEffect(() => {
    try {
      const data = JSON.parse(jsonString);
      setJsonObject(data);
      const res = Validate(data);
      if (res.valid) {
        // true
        setValidError("");
      } else {
        // false
        setValidError(res.errors[0]);
      }
      setErr("");
    } catch (err) {
      //   console.error(error);
      setJsonObject(null);
      if (err instanceof SyntaxError) {
        setValidError(`Invalid JSON string: ${err.message}`);
        setErr(`Invalid JSON string: ${err.message}`);
      } else {
        setErr("An unexpected error occurred");
        setValidError("An unexpected error occurred");
      }
    }
  }, [jsonString]);
  return (
    <>
      <Navbar setDark={setDark} dark={dark} />
      <div className="flex flex-col md:flex-row justify-between p-4 dark:bg-neutral-700">
        <div className="w-full md:w-1/2 bg-blue-200 p-2 rounded-md shadow-md mb-4 md:mb-0 md:mr-2">
          <JsonEditor
            jsonString={jsonString}
            setJsonString={setJsonString}
            err={err}
            dark={dark}
            setDark={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
        <div className="w-full max-h-[90vh] md:w-1/2 bg-green-200 p-2 rounded-md shadow-md">
          <div className="overflow-y-scroll max-h-[100%]">
            <FormPreview jsonObject={jsonObject} validError={validError} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftRightDivs;
