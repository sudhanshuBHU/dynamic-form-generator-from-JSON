import React, { useEffect, useState } from "react";
import { ProjectRequirementsSurvey } from "../utils/schema";
import { handleSuccess } from "../utils/alerts";

interface FormData {
  name: string;
  email: string;
  companySize: string;
  industry: string;
  timeline: string;
  comments?: string;
}

interface props {
  jsonObject: ProjectRequirementsSurvey | null;
  validError: string;
}

const FormPreview: React.FC<props> = ({ jsonObject, validError }) => {
  // console.log(jsonObject);
  useEffect(() => {
    // console.log(jsonObject);
    if (!jsonObject) return;
  }, [jsonObject]);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    companySize: "",
    industry: "",
    timeline: "",
    comments: "",
  });

  const handleDownload = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(formData, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "JsonFormData.json";
    link.click();
    console.log("Form Data Submitted:", formData);
    handleSuccess("Downloading...", "Done!");
    reset();
  };

  const reset = () => {
    setFormData({
      name: "",
      email: "",
      companySize: "",
      industry: "",
      timeline: "",
      comments: "",
    });
  };

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >
  // ) => {
  //   const { id, value } = e.target;

  //   console.log(id, value);

  //   setFormData((prev) => ({ ...prev, [id]: value }));
  // };

  function handleChange(id: string, value: string): void {
    // console.log(id,value);
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    handleSuccess("Submitted", "Done!");
    reset();
  };

  return (
    <>
      {!validError && (
        <div className="max-w-3xl mx-auto p-5 bg-white shadow-md rounded-md dark:bg-neutral-700 dark:text-white">
          <h1 className="text-2xl font-bold mb-4">
            {jsonObject && jsonObject.formTitle}
          </h1>
          <p className="text-gray-600 mb-6 dark:text-white">
            {jsonObject && jsonObject.formDescription}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {jsonObject &&
              jsonObject.fields.map((val, ind) => {
                return (
                  <div key={ind}>
                    <label
                      htmlFor={val.id}
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      {val.label}
                    </label>
                    {val.type === "text" && (
                      <input
                        type={val.type}
                        id={val.id}
                        value={formData[val.id] || ""} // Use the specific field value
                        onChange={(e) => handleChange(val.id, e.target.value)}
                        placeholder={val.placeholder}
                        required={val.required} // Set required as a boolean
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-neutral-900"
                      />
                    )}
                    {val.type === "email" && (
                      <input
                        type={val.type}
                        id={val.id}
                        value={formData[val.id] || ""}
                        onChange={(e) => handleChange(val.id, e.target.value)}
                        placeholder={val.placeholder}
                        required={val.required}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-neutral-900"
                      />
                    )}
                    {val.type === "select" && (
                      <select
                        id={val.id}
                        value={formData[val.id] || ""}
                        onChange={(e) => handleChange(val.id, e.target.value)}
                        required={val.required}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm bg-white text-black dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">select</option>
                        {val.options.map((option, optionIndex) => (
                          <option key={optionIndex} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    )}
                    {val.type === "radio" && (
                      <div className="mt-1">
                        {val.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="inline-flex items-center mr-4"
                          >
                            <input
                              type="radio"
                              id={option.label}
                              name={val.id}
                              value={option.value}
                              onChange={(e) =>
                                handleChange(val.id, e.target.value)
                              }
                              required={val.required}
                              className="form-radio text-blue-600"
                            />
                            <span className="ml-2">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {val.type === "textarea" && (
                      <textarea
                        id={val.id}
                        value={formData[val.id] || ""}
                        onChange={(e) => handleChange(val.id, e.target.value)}
                        placeholder={val.placeholder}
                        required={val.required}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-neutral-900"
                      />
                    )}
                  </div>
                );
              })}
            <button
              type="submit"
              className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 mr-2"
              onClick={handleDownload}
            >
              Download Form JSON
            </button>
            <button
              type="button"
              className="mt-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              onClick={reset}
            >
              Reset
            </button>
          </form>
        </div>
      )}
      {validError && (
        <div className="text-red-500 text-xl max-w-3xl mx-auto p-5 bg-white shadow-md rounded-md">
          {validError}
        </div>
      )}
    </>
  );
};

export default FormPreview;
