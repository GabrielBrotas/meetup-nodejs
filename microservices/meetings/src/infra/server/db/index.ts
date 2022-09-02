import { MeetingModel } from 'infra/meetings/repository/sequelize/meeting.model';
import { Sequelize } from 'sequelize-typescript';

import { db_config } from './config';

export let IS_DB_SYNCED = false;

export async function sync_db() {
  try {
    console.log('syncing db...')
    const db_connection = new Sequelize(db_config);
    db_connection.addModels([MeetingModel])
  
    await db_connection.sync()
    IS_DB_SYNCED = true
    console.log('db synced')
  } catch(error) {
    console.log(error)
    console.log("trying to sync again...")
    
    setTimeout(async () => {
      await sync_db()
    }, 5000)
  }
}
