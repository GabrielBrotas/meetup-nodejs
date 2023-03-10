import { Meeting } from "domain/meetings/entities";
import { IMeetingRepository } from "domain/meetings/repository";
import { MeetingOutputMapper, MeetingOutput } from "../dto";
import { IUseCase } from '../../dto/use-case';
import { CategoryProvider } from "../third-party/category.service";

export namespace CreateMeetingUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private meetingRepository: IMeetingRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      const categoryProvider = new CategoryProvider();
      const category = await categoryProvider.getCategoryById(input.category_id)
      console.log({category})
      const entity = new Meeting({...input, category_name: category.name});

      await this.meetingRepository.insert(entity);
      return MeetingOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
		name: string;
		category_id: string;
		date: Date;
		participants_username?: Array<string>;
		duration_min?: number;
  };
  
  export type Output = MeetingOutput;
  
}