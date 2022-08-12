import { IMeetingRepository } from "domain/meeting/repository";
import { MeetingOutputMapper, MeetingOutput } from "../dto";
import { IUseCase } from '../../dto/use-case';

export namespace FindOneMeetingUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private meetingRepository: IMeetingRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      const meeting = await this.meetingRepository.findById(input.id);
      return MeetingOutputMapper.toOutput(meeting)
    }
  }

  export type Input = {
    id: string
  };
  
  export type Output = MeetingOutput;
  
}