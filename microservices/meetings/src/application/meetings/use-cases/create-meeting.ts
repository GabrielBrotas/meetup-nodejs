import { Meeting } from "domain/meeting/entities";
import { IMeetingRepository } from "domain/meeting/repository";
import { MeetingOutputMapper, MeetingOutput } from "../dto";
import { IUseCase } from '../../dto/use-case';

export namespace CreateMeetingUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private meetingRepository: IMeetingRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      const entity = new Meeting(input);
      await this.meetingRepository.insert(entity);
      return MeetingOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
		name: string;
		category_id: string;
		category_name: string;
		date: Date;
		participants_username?: Array<string>;
		duration_min?: number;
  };
  
  export type Output = MeetingOutput;
  
}