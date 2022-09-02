import { Router } from "express";
import { body } from 'express-validator';
import { MeetingRepository } from "../../repository/sequelize";
import { FindAllMeetingsController } from "./controller/find-all-meetings-controller";
import { CreateMeetingController } from "./controller/create-meeting-controller";
import { FindOneMeetingController } from "./controller/find-one-meeting-controller";
import { DeleteMeetingController } from "./controller/delete-meeting-controller";
import { setupMeetingListeners } from "./listeners";

export const meetingsRouter = () => {
  const meetingsRouter = Router()
  
  const meetingsRepository = MeetingRepository.getInstance()
  
  const findAllMeetingsController = new FindAllMeetingsController(meetingsRepository);
  const createMeetingController = new CreateMeetingController(meetingsRepository);
  const findOneMeetingController = new FindOneMeetingController(meetingsRepository);
  const deleteMeetingController = new DeleteMeetingController(meetingsRepository);
  
  meetingsRouter.get("/", async (req, res) => await findAllMeetingsController.handle(req, res))
  meetingsRouter.get("/:id", async (req, res) => await findOneMeetingController.handle(req, res))
  meetingsRouter.delete("/:id", async (req, res) => await deleteMeetingController.handle(req, res))
  
  meetingsRouter.post("/", 
    body('name').isString(),
    body('category_id').isString(),
    body('category_name').isString(),
    body('date').toDate().notEmpty(),
    body('participants_username').isArray().optional(),
    body('duration_min').isInt().optional(),
    async (req, res) => await createMeetingController.handle(req, res)
  )

  setupMeetingListeners()
  return meetingsRouter
}