import { validateSync } from "class-validator";
import { FieldsErrors } from "./validator-fields-interface";

export abstract class ClassValidatorFields<EntityRules> {
  errors: FieldsErrors = {};

  validate(data: any): boolean {
    const errors = validateSync(data);

    if (errors.length) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
    }

    return errors.length <= 0;
  }
}
