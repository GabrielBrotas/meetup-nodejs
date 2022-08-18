import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from '../categories.controller';
import { CreateCategoryUseCase, DeleteCategoryUseCase, FindAllCategoriesUseCase, FindOneCategoryUseCase, UpdateCategoryUseCase } from '@gbrotas/categories-core/application';
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

  it("should find all categories", async () => {
    const findAllCategoriesOutput: FindAllCategoriesUseCase.Output = [
      {
        id: '9366b7dc-2d71-4799-b91c-c64adb205104',
        name: 'Movie',
      },
      {
        id: '9366b7dc-2d71-4799-b91c-c64adb205105',
        name: 'Music',
      },
    ];

    const mockFindAllUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(findAllCategoriesOutput)),
    };

    //@ts-expect-error defined part of methods
    controller['findAllUseCase'] = mockFindAllUseCase;

    const output = await controller.findAll();
    expect(mockFindAllUseCase.execute).toHaveBeenCalled();
    expect({
      success: true,
      result: findAllCategoriesOutput,
    }).toStrictEqual(output);
  })

  it("should find one category", async () => {
    const category_id = '9366b7dc-2d71-4799-b91c-c64adb205104'
    const findOneCategoryOutput: FindOneCategoryUseCase.Output = {
        id: category_id,
        name: 'Movie',
    }

    const mockFindOneUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(findOneCategoryOutput)),
    };

    //@ts-expect-error defined part of methods
    controller['findOneUseCase'] = mockFindOneUseCase;

    const output = await controller.findOne(category_id);
    expect(mockFindOneUseCase.execute).toHaveBeenCalled();
    expect({
      success: true,
      result: findOneCategoryOutput,
    }).toStrictEqual(output);
  })

  it("should update one category", async () => {
    const category_id = '9366b7dc-2d71-4799-b91c-c64adb205104'
    const updateCategoryOutput: UpdateCategoryUseCase.Output = {
        id: category_id,
        name: 'Movie',
    }

    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(updateCategoryOutput)),
    };

    //@ts-expect-error defined part of methods
    controller['updateUseCase'] = mockUpdateUseCase;

    const output = await controller.update(category_id, {name: 'Movie'});	
    expect(mockUpdateUseCase.execute).toHaveBeenCalled();
    expect({
      success: true,
      result: updateCategoryOutput,
    }).toStrictEqual(output);
  })

  it("should delete one category", async () => {
    const category_id = '9366b7dc-2d71-4799-b91c-c64adb205104'

    const deleteCategoryOutput: DeleteCategoryUseCase.Output = null

    const mockDeleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(deleteCategoryOutput)),
    };

    //@ts-expect-error defined part of methods
    controller['deleteUseCase'] = mockDeleteUseCase;

    const output = await controller.remove(category_id);
    expect(mockDeleteUseCase.execute).toHaveBeenCalled();
    expect({
      success: true
    }).toStrictEqual(output);
  })
});
