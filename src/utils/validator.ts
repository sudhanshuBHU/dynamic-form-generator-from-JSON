import Ajv from 'ajv';
import { schema } from './schema';
import { ProjectRequirementsSurvey } from './schema';


// Create an instance of AJV
const ajv = new Ajv({ allErrors: true });

// Compile the schema
const validate = ajv.compile(schema);

// Sample data to validate
// const data: ProjectRequirementsSurvey = {
//   formTitle: "Project Needs Survey",
//   formDescription: "Please fill out the requirements for your project.",
//   fields: [
//     {
//       id: "name",
//       type: "text",
//       label: "Your Name",
//       required: true,
//       placeholder: "Enter your name"
//     },
//     {
//       id: "email",
//       type: "email",
//       label: "Your Email",
//       required: true,
//       pattern: "^\\S+@\\S+\\.\\S+$",
//       validation: {
//         message: "Please enter a valid email address."
//       }
//     },
//     {
//       id: "projectType",
//       type: "select",
//       label: "Project Type",
//       required: true,
//       options: [
//         { value: "web", label: "Web Development" },
//         { value: "mobile", label: "Mobile App" }
//       ]
//     }
//   ]
// };


export function Validate(JsonData : ProjectRequirementsSurvey) {
  const valid = validate(JsonData);
  if (!valid) {
    // console.log("Validation Errors:", validate.errors);
    return {
      valid: false,
      errors: validate.errors
    };
  } else {
    // console.log("Validation passed!");
    return {
      valid: true,
      errors: ''
    };
  }
}