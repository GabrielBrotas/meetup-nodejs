import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { MeetingRepository } from 'infra/meeting/repository/sequelize';
import { CreateMeetingUseCase } from 'application/meeting/use-cases';

export class CreateMeetingController {
  constructor(private readonly meetingsRepository: MeetingRepository) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body
      
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
          return res.status(400).json({ success: false, errors: errors.array() });
      }

      const createMeetingUseCase = new CreateMeetingUseCase.UseCase(this.meetingsRepository)

      const meetings = await createMeetingUseCase.execute({
        name: body.name,
        category_id: body.category_id,
        category_name: body.category_name,
        date: body.date,
        participants_username: body.participants_username,
        duration_min: body.duration_min
      })

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
