import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../categories.controller';
import { CreateCategoryUseCase } from '@gbrotas/categories-core/application';
import { CreateCategoryDto } from '../dto/create-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should creates a category', async () => {
    const createCategoryOutput: CreateCategoryUseCase.Output = {
      id: '9366b7dc-2d71-4799-b91c-c64adb205104',
      name: 'Movie',
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(createCategoryOutput)),
    };

    //@ts-expect-error defined part of methods
    controller['createUseCase'] = mockCreateUseCase;

    const input: CreateCategoryDto = {
      name: 'Movie',
    };

    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect({
      success: true,
      result: createCategoryOutput,
    }).toStrictEqual(output);
  });
});
