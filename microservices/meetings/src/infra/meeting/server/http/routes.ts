import { FindAllMeetingsUseCase } from "application/meetings/use-cases/find-all-meetings";
import { Router } from "express";
import { MeetingRepository } from "infra/meeting/repository/sequelize";

export const meetingsRouter = Router()

const meetingsRepository = new MeetingRepository()

meetingsRouter.get("/", async (req, res) => {
    const findAllMeetingsUseCase = new FindAllMeetingsUseCase.UseCase(meetingsRepository)

    const meetings = findAllMeetingsUseCase.execute()

    return res.status(200).json({
        success: true,
        result: meetings
    })
})

