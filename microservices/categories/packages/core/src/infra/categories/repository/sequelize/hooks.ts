import { CategoryModel } from './category.model';
import { DomainEvents } from 'domain/@shared/events';
import { Model } from 'sequelize-typescript';

const dispatchEventsCallback = (model: Model, primaryKeyField: string) => {
  const aggregateId = model.toJSON()[primaryKeyField];
  console.log(`dispatch events for = ${aggregateId}`)
  DomainEvents.dispatchEventsForAggregateId(aggregateId);
}

(async function createHooksForAggregateRoots () {

  if(!CategoryModel.isInitialized) {
    console.log("Model not initialized, retry....")
    setTimeout(async () => {
      await createHooksForAggregateRoots()
    }, 3000)
    return
  }

  console.log("Category hooks added successfully")
  CategoryModel.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'id'));
  CategoryModel.addHook('afterDestroy', (m: any) => dispatchEventsCallback(m, 'id'));
  CategoryModel.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'id'));
  CategoryModel.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'id'));
  CategoryModel.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'id'));
})();