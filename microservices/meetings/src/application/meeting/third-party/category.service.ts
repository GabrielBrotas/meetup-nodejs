import { Category, ICategoryProvider } from "./category.interface";
import axios, { AxiosInstance } from 'axios';
import 'dotenv/config'

export class CategoryProvider implements ICategoryProvider {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: process.env.category_url
    })
  }

  async getCategoryById(id: string): Promise<Category> {
    const result = await this.client.get(`/categories/${id}`)
    
    if(!result.data.success) throw new Error(result.data.error)

    return {
      id: result.data.result.id,
      name: result.data.result.name
    }
  }
}