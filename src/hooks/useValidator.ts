import Ajv from "ajv";
// import ajvErrors from "ajv-errors";

export const useJSONValidator = () => {
    const ajv = new Ajv({ allErrors: true });
  
    return (json: string) => {
      try {
        const parsed = JSON.parse(json);
        const validate = ajv.compile(parsed);
        return { valid: true, parsed, validate, error: null };
      } catch (error) {
        return { valid: false, parsed: null, validate: null, error: (error as Error).message || "Unknown error" };
      }
    };
  };
  
