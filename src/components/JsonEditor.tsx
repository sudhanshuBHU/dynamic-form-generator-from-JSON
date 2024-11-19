import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import { handleSuccess, handleError } from "../utils/alerts";
import * as monaco from "monaco-editor";

interface props {
  jsonString: string;
  setJsonString: (arg0: string) => void;
  err: string;
  dark: boolean;
  setDark: (arg0: boolean) => void;
}

const StringToJsonConverter: React.FC<props> = ({
  jsonString,
  setJsonString,
  err,
  dark,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
  ) {
    editorRef.current = editor;
  }
  // function showValue() {
  //   if (editorRef.current) {
  //     // alert(editorRef.current.getValue());
  //     console.log(editorRef.current.getValue());
  //   } else {
  //     alert("Editor is not mounted yet!");
  //   }
  // }

  // const handleConvert = () => {
  //   try {
  //     const parsedObject = JSON.parse(jsonString);
  //     setJsonObject(parsedObject);
  //     const res = Validate(parsedObject);
  //     // console.log(res.errors[0].message);
  //     if (res.valid) {
  //       setErr("");
  //       setValidError("");
  //     } else {
  //       setValidError(res.errors[0].message);
  //     }
  //     // console.log(parsedObject);
  //   } catch (err) {
  //     if (err instanceof SyntaxError) {
  //       // console.log("here");
  //       setValidError(`Invalid JSON string: ${err.message}`)
  //       setErr(`Invalid JSON string: ${err.message}`);
  //     } else {
  //       setErr("An unexpected error occurred");
  //       setValidError("An unexpected error occurred");
  //     }
  //   }
  // };

  async function copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(jsonString);
      // console.log("JSON copied to clipboard:", jsonString);
      handleSuccess("successfully copied", "Copied!");
    } catch (err) {
      // console.error("Failed to copy JSON: ", err);
      handleError("Failed to copy JSON", "Failed!");
    }
  }
  return (
    <div className="max-w-3xl mx-auto p-5 bg-white rounded-lg shadow-md dark:bg-neutral-700">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-2 dark:text-white">JSON Object</h2>
        <button
          className="mb-2 px-2 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300 mr-2"
          onClick={copyToClipboard}
        >
          Copy JSON
        </button>
      </div>
      <Editor
        height="70vh"
        defaultLanguage="json" // Set the default language to JSON
        defaultValue={jsonString}
        onChange={() => {
          if (editorRef.current) setJsonString(editorRef.current.getValue());
        }}
        onMount={handleEditorDidMount}
        // theme='vs-dark' // Use the Abyss theme
        theme={dark ? "vs-dark" : "abyss"} // Use the Abyss theme
        options={{
          selectOnLineNumbers: true,
          automaticLayout: true,
          minimap: {
            enabled: true,
          },
        }}
      />
      {/* <button
        onClick={handleConvert}
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Create
      </button> */}
      {err && <p className="text-red-500 mt-2">{err}</p>}
    </div>
  );
};

export default StringToJsonConverter;

// <textarea
// rows={22}
// cols={30}
// value={jsonString}
// onChange={(e) => setJsonString(e.target.value)}
// placeholder={jsonString}
// className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
// />
