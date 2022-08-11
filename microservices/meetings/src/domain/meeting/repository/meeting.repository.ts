import { RepositoryInterface } from "domain/@shared/repository";
import { Meeting } from "../entities";

export namespace IMeetingRepository {
  export interface Repository
    extends RepositoryInterface<Meeting> {}
}
