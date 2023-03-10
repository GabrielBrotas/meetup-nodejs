import { 
  IsNotEmpty, 
  IsString, 
  MaxLength
} from "class-validator";
import { CategoryProperties } from "../entities";
import { ClassValidatorFields } from "domain/@shared/validators"

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor({
    name,
  }: CategoryProperties) {
    Object.assign(this, { 
      name,
    });
  }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules>  {
  validate(data: CategoryProperties): boolean {
    return super.validate(new CategoryRules(data ?? {} as any));
  }
}

export class CategoryValidatorFactory{
  static create(){
      return new CategoryValidator();
  }
}
