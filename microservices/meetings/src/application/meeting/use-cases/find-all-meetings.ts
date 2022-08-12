import { IMeetingRepository } from "domain/meeting/repository";
import { MeetingOutputMapper, MeetingOutput } from "../dto";
import { IUseCase } from '../../dto/use-case';

export namespace FindAllMeetingsUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private meetingRepository: IMeetingRepository.Repository) {}
  
    async execute(): Promise<Output> {
      const meetings = await this.meetingRepository.findAll();
      
      return meetings.map(meet => MeetingOutputMapper.toOutput(meet))
    }
  }

  export type Input = {};
  
  export type Output = MeetingOutput[];
  
}