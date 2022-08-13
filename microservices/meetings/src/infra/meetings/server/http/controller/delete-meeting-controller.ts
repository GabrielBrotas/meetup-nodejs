import { Request, Response } from 'express';
import { MeetingRepository } from 'infra/meetings/repository/sequelize';
import { DeleteMeetingUseCase } from 'application/meeting/use-cases';

export class DeleteMeetingController {
  constructor(private readonly meetingsRepository: MeetingRepository) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const deleteMeetingUseCase = new DeleteMeetingUseCase.UseCase(this.meetingsRepository)

      await deleteMeetingUseCase.execute({ id })

      return res.status(200).json({
        success: true
      })
    } catch(error) {
      return res.status(400).json({
        success: false,
        message: error.message ? error.message : String(error)
      })
    }
  }
}
