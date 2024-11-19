import { JSONSchemaType } from 'ajv';


export interface FormFieldOption {
    value: string;
    label: string;
}

export interface FormField {
    id: string;
    type: "text" | "email" | "select" | "radio" | "textarea";
    label: string;
    required: boolean;
    placeholder?: string; // Optional, as not all fields have a placeholder
    pattern?: string; // Optional, only for fields like email
    validation?: {
        message: string;
    };
    options?: FormFieldOption[]; // Optional, only for select and radio types
}

export interface ProjectRequirementsSurvey {
    formTitle: string;
    formDescription: string;
    fields: FormField[];
}

// Define the JSON schema
export const schema: JSONSchemaType<ProjectRequirementsSurvey> = {
    $schema: "http://json-schema.org/draft-07/schema#",
    type: "object",
    properties: {
      formTitle: { type: "string" },
      formDescription: { type: "string" },
      fields: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            type: {
              type: "string",
              enum: ["text", "email", "select", "radio", "textarea"]
            },
            label: { type: "string" },
            required: { type: "boolean" },
            placeholder: { type: "string", nullable: true },
            pattern: { type: "string", nullable: true },
            validation: {
              type: "object",
              properties: {
                message: { type: "string" }
              },
              required: ["message"],
              nullable: true
            },
            options: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  value: { type: "string" },
                  label: { type: "string" }
                },
                required: ["value", "label"]
              },
              nullable: true
            }
          },
          required: ["id", "type", "label", "required"]
        }
      }
    },
    required: ["formTitle", "formDescription", "fields"]
  };


export const givenSchema = 
`{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
      {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
      },
      {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "pattern": "^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$",
      "placeholder": "you@example.com",
      "validation": {
          "message": "Please enter a valid email address"
      }
      },
      {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
          {
          "value": "1-50",
          "label": "1-50 employees"
          },
          {
          "value": "51-200",
          "label": "51-200 employees"
          },
          {
          "value": "201-1000",
          "label": "201-1000 employees"
          },
          {
          "value": "1000+",
          "label": "1000+ employees"
          }
      ]
      },
      {
      "id": "industry",
      "type": "radio",
      "label": "Industry",
      "required": true,
      "options": [
          {
          "value": "tech",
          "label": "Technology"
          },
          {
          "value": "healthcare",
          "label": "Healthcare"
          },
          {
          "value": "finance",
          "label": "Finance"
          },
          {
          "value": "retail",
          "label": "Retail"
          },
          {
          "value": "other",
          "label": "Other"
          }
      ]
      },
      {
      "id": "timeline",
      "type": "select",
      "label": "Project Timeline",
      "required": true,
      "options": [
          {
          "value": "immediate",
          "label": "Immediate (within 1 month)"
          },
          {
          "value": "short",
          "label": "Short-term (1-3 months)"
          },
          {
          "value": "medium",
          "label": "Medium-term (3-6 months)"
          },
          {
          "value": "long",
          "label": "Long-term (6+ months)"
          }
      ]
      },
      {
      "id": "comments",
      "type": "textarea",
      "label": "Additional Comments",
      "required": false,
      "placeholder": "Any other details you'd like to share..."
      }
  ]
}`