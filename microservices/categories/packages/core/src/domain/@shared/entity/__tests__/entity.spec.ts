import { Entity } from "../entity";
import { validate as uuidValidate, v4 as uuidv4 } from "uuid";

class StubEntity extends Entity<{ prop1: string; prop2: number }> {}

describe("Entity Unit Tests", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "prop1 value", prop2: 10 };
    const entity = new StubEntity(arrange);

    expect(entity.props).toStrictEqual(arrange);
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const arrange = { prop1: "prop1 value", prop2: 10 };
    const id = uuidv4();
    
    const entity = new StubEntity(arrange, id);

    expect(entity.id).toBe(id);
    expect(uuidValidate(entity.id)).toBeTruthy();

  });

  it("should convert an entity to a JavaScript Object", () => {
    const arrange = { prop1: "prop1 value", prop2: 10 };
    const id = uuidv4();

    const entity = new StubEntity(arrange, id);
    
    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...arrange,
    });
  });
});
