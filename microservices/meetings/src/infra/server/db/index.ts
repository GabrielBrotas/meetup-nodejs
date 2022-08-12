import { MeetingModel } from 'infra/meeting/repository/sequelize/meeting.model';
import { Sequelize } from 'sequelize-typescript';

import { db_config } from './config';

export async function sync_db() {
    const db_connection = new Sequelize(db_config);
    db_connection.addModels([MeetingModel])

    await db_connection.sync()
}
