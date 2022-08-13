import { Request, Response } from 'express';
import { MeetingRepository } from 'infra/meetings/repository/sequelize';
import { FindOneMeetingUseCase } from 'application/meeting/use-cases';

export class FindOneMeetingController {

  constructor(private readonly meetingsRepository: MeetingRepository) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const findOneMeetingUseCase = new FindOneMeetingUseCase.UseCase(this.meetingsRepository)
  
      const meeting = await findOneMeetingUseCase.execute({
        id
      })
  
      return res.status(200).json({
        success: true,
        result: meeting
      })
    } catch(error) {
      return res.status(400).json({
        success: false,
        message: error.message ? error.message : String(error)
      })
    }
  }
}
