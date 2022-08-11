import { 
  IsDate, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  MaxLength, 
  IsArray, 
  IsNumber
} from "class-validator";
import { MeetingProperties } from "../entities";
import { ClassValidatorFields } from "domain/@shared/validators"

export class MeetingRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  category_id: string;

  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  category_name: string;

  @IsArray()
  participants_username: string;

  @IsDate()
  @IsOptional()
  date: Date;

  @IsNumber()
  @IsOptional()
  duration_min: string;

  constructor({
    name,
    category_id,
    category_name,
    date,
    participants_username,
    duration_min
  }: MeetingProperties) {
    Object.assign(this, { 
      name,
      category_id,
      category_name,
      date,
      participants_username,
      duration_min
    });
  }
}

export class MeetingValidator extends ClassValidatorFields<MeetingRules>  {
  validate(data: MeetingProperties): boolean {
    return super.validate(new MeetingRules(data ?? {} as any));
  }
}

export class MeetingValidatorFactory{
  static create(){
      return new MeetingValidator();
  }
}
