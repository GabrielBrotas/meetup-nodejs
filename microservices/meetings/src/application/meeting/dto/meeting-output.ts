import { Meeting } from "domain/meetings/entities";

export type MeetingOutput = {
  id: string
  name: string;
  category_id: string;
  category_name: string;
  date: Date;
  participants_username?: Array<string>;
  duration_min?: number;
};

export class MeetingOutputMapper {
  static toOutput(entity: Meeting): MeetingOutput {
    return entity.toJSON();
  }
}