import { toast } from "@/utils/util";
export function useValidateForm(
  obj: any,
  rules: any,
  autoShowErrorMessage: boolean = true
): Promise<any> {
  return new Promise((resolve, reject) => {
    const errors: any = {};

    for (const fieldName in rules) {
      const fieldRules = rules[fieldName];
      const fieldValue = obj[fieldName];

      for (const rule of fieldRules) {
        if (rule.required && (fieldValue === undefined || fieldValue === "")) {
          errors[fieldName] = rule.message;
          break;
        }

        if (rule.pattern && !rule.pattern.test(fieldValue)) {
          errors[fieldName] = rule.message;
          break;
        }
      }
    }

    const allError = Object.values(errors);
    if (allError.length > 0) {
      autoShowErrorMessage && toast.fail(allError.join("、"));
      reject(errors);
    } else {
      resolve("ok");
    }
  });
}
