export type Category = {
  id: string
  name: string
}

export interface ICategoryProvider {
  getCategoryById(id: string): Promise<Category>
}