import { v4 } from "uuid";
import { Sequelize } from "sequelize-typescript";
import { Meeting } from "domain/meeting/entities";
import { MeetingModel } from "./meeting.model";
import { MeetingRepository } from "./meeting.repository";
import { db_test_config } from "infra/@shared/db-test-config";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {

    sequelize = new Sequelize(db_test_config);
  
    sequelize.addModels([MeetingModel]);
  
    await sequelize.sync({logging: false});
  });

  afterEach(async () => {
    await sequelize.drop({logging: false})
    await sequelize.close();
  });

  it("should create a new meeting", async () => {
    const meetingRepository = new MeetingRepository();

    const category_id = v4()
    const date = new Date()

    let meeting = new Meeting({ 
      name: "Docker",
      category_id: category_id,
      category_name: "xpto",
      date: date,
    });

    await meetingRepository.insert(meeting);

    const meetingStored = await MeetingModel.findOne({
      where: { id: meeting.id },
    });

    expect(meeting.toJSON()).toStrictEqual(meetingStored.toJSON());
  });

  it("should find an meeting by id", async () => {
    const meetingRepository = new MeetingRepository();

    const category_id = v4()
    const date = new Date()

    let meeting = new Meeting({ 
      name: "Docker",
      category_id: category_id,
      category_name: "xpto",
      date: date,
    });

    await meetingRepository.insert(meeting);
    const meetingFound = await meetingRepository.findById(meeting.id);
    
    expect(meetingFound).toStrictEqual(meeting);
    expect(meetingFound).toBeInstanceOf(Meeting)
  })

  it("should return all meetings", async () => {
    const meetingRepository = new MeetingRepository();
    
    const category_id = v4()
    const date = new Date()

    let meeting1 = new Meeting({ 
      name: "Docker",
      category_id: category_id,
      category_name: "xpto",
      date: date,
    });

    let meeting2 = new Meeting({ 
      name: "Docker",
      category_id: category_id,
      category_name: "xpto",
      date: date,
    });

    await meetingRepository.insert(meeting1);
    await meetingRepository.insert(meeting2);

    const meetingsFound = await meetingRepository.findAll();

    expect(meetingsFound).toEqual([meeting1, meeting2]);
  })

  it("should delete a meeting", async () => {
    const meetingRepository = new MeetingRepository();
    const category_id = v4()
    const date = new Date()

    let meeting = new Meeting({ 
      name: "Docker",
      category_id: category_id,
      category_name: "xpto",
      date: date,
    });

    await meetingRepository.insert(meeting);

    await meetingRepository.delete(meeting.id);

    const meetingsFound = await meetingRepository.findAll();

    expect(meetingsFound).toEqual([]);
  })

  it("should update a meeting", async () => {
    const meetingRepository = new MeetingRepository();
    const category_id = v4()
    const date = new Date()

    let meeting = new Meeting({ 
      name: "Docker",
      category_id: category_id,
      category_name: "xpto",
      date: date,
    });

    await meetingRepository.insert(meeting);

    const new_category_id = v4()
    meeting.updateCategory({
      id: new_category_id,
      name: "new category"
    })

    await meetingRepository.update(meeting)

    const meetingFound = await meetingRepository.findById(meeting.id);

    expect(meetingFound.category.id).toBe(new_category_id)
    expect(meetingFound.category.name).toBe("new category")

    expect(meetingFound).toEqual(meeting)
  })
});
