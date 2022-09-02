import { Meeting } from "domain/meetings/entities";
import { IMeetingRepository } from "domain/meetings/repository";
import { MeetingModel } from "./meeting.model"

export class MeetingRepository implements IMeetingRepository.Repository {

  private static INSTANCE: MeetingRepository;

  private constructor() {}

  public static getInstance() {
    if(!MeetingRepository.INSTANCE) {
      MeetingRepository.INSTANCE = new MeetingRepository()
    }

    return MeetingRepository.INSTANCE
  }

  async insert(entity: Meeting): Promise<void> {
    await MeetingModel.create(entity.toJSON());
  }

  async findAll(): Promise<Meeting[]> {
    const meetingsModel = await MeetingModel.findAll();
    return meetingsModel.map((meeting) => {
      return new Meeting(meeting.toJSON())
    });
  }

  async findById(id: string): Promise<Meeting> {
    const meetingModel = await MeetingModel.findOne({ where: { id } });
    if(!meetingModel) throw new Error("Meeting not found");
    return new Meeting(meetingModel.toJSON());
  }

  async update(entity: Meeting): Promise<void> {
    await MeetingModel.update(
      entity.toJSON(),
      {
        where: { id: entity.id },
      }
    )
  }

  async delete(id: string): Promise<void> {
    await MeetingModel.destroy({
      where: { id: id }
    })
  }

  async updateCategoriesName(id: string, name: string): Promise<void> {
    console.log({id, name})
    await MeetingModel.update(
      {
        category_name: name
      }, 
      {
        where: { category_id: String(id) }
      }
    )
  }
}

