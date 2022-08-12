import { Request, Response } from 'express';
import { MeetingRepository } from 'infra/meeting/repository/sequelize';
import { FindAllMeetingsUseCase } from 'application/meeting/use-cases';

export class FindAllMeetingsController {

  constructor(private readonly meetingsRepository: MeetingRepository) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      console.log(this.meetingsRepository)
      const findAllMeetingsUseCase = new FindAllMeetingsUseCase.UseCase(this.meetingsRepository)
  
      const meetings = await findAllMeetingsUseCase.execute()
  
      return res.status(200).json({
        success: true,
        result: meetings
      })
    } catch(error) {
      return res.status(400).json({
        success: false,
        message: error.message ? error.message : String(error)
      })
    }
  }
}
