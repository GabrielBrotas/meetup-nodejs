import { IMeetingRepository } from "domain/meeting/repository";
import { IUseCase } from '../../dto/use-case';

export namespace DeleteMeetingUseCase {
  
	export class UseCase implements IUseCase<Input, Output> {
    constructor(private meetingRepository: IMeetingRepository.Repository) {}
  
    async execute(input: Input): Promise<Output> {
      await this.meetingRepository.delete(input.id);
    }
  }

  export type Input = {
    id: string
  };
  
  export type Output = void;
  
}