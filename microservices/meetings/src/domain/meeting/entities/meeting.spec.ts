import { v4 } from "uuid";
import { Meeting } from "./meeting";

describe("Meeting Unit Tests", () => {
  beforeEach(() => {
    Meeting.validate = jest.fn();
  });

  test("constructor of meeting", () => {
    const category_id = v4()
    const date = new Date()

    let meeting = new Meeting({ 
      name: "Docker",
      category_id: category_id,
      category_name: "xpto",
      date: date
    });

    expect(Meeting.validate).toHaveBeenCalled();

    expect(meeting.toJSON()).toStrictEqual({
      id: meeting.id,
      name: 'Docker',
      category_id: category_id,
      category_name: 'xpto',
      date: date,
      duration_min: 60,
      participants_username: [],
    });

    expect(meeting.props.date).toBeInstanceOf(Date);

  });

});
