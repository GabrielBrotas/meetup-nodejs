import { RepositoryInterface } from "domain/@shared/repository";
import { Category } from "../entities";

export namespace ICategoryRepository {
  export interface Repository
    extends RepositoryInterface<Category> {}
}
