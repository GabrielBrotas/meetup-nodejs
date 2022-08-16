import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { CreateCategoryUseCase } from '@gbrotas/categories-core/application';
import { EntityValidationError } from '@gbrotas/categories-core/domain';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const { name } = createCategoryDto;
      const result = await this.createUseCase.execute({
        name,
      });

      return {
        success: true,
        result,
      };
    } catch (error) {
      return {
        success: false,
        error: String(error),
        ...(error instanceof EntityValidationError && { errors: error.error }),
      };
    }
    // return this.categoriesService.create(createCategoryDto);
  }

  // @Get()
  // findAll() {
  //   return this.categoriesService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
