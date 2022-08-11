import {v4 as uuidv4 } from "uuid"

export abstract class Entity<Props = any> {
  public readonly id: string;

  constructor(public readonly props: Props, id?: string) {
    this.id = id || uuidv4();
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}

// entity -> object
