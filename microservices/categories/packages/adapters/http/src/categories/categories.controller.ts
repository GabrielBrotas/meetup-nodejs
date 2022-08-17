import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Get,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

import { EntityValidationError } from '@gbrotas/categories-core/domain';
import {
  CreateCategoryUseCase,
  FindAllCategoriesUseCase,
  FindOneCategoryUseCase,
  DeleteCategoryUseCase,
} from '@gbrotas/categories-core/application';

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;

  @Inject(FindAllCategoriesUseCase.UseCase)
  private findAllUseCase: FindAllCategoriesUseCase.UseCase;

  @Inject(FindOneCategoryUseCase.UseCase)
  private findOneUseCase: FindOneCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteUseCase: DeleteCategoryUseCase.UseCase;

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
  }

  @Get()
  async findAll() {
    try {
      const result = await this.findAllUseCase.execute();

      return {
        success: true,
        result,
      };
    } catch (error) {
      return {
        success: false,
        error: String(error),
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.findOneUseCase.execute({ id: id });

      return {
        success: true,
        result,
      };
    } catch (error) {
      return {
        success: false,
        error: String(error),
      };
    }
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateCategoryDto: UpdateCategoryDto,
  // ) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.deleteUseCase.execute({ id: id });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: String(error),
      };
    }
  }
}
