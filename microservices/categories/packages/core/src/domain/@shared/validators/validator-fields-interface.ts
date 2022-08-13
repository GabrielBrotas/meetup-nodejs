export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidatorFieldsInterface {
  errors: FieldsErrors;
  validate(data: any): boolean;
}