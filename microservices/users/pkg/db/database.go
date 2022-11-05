package database

import (
	"context"
	"database/sql"
	"log"
	"time"

	_ "github.com/lib/pq"
)

type DatabaseSetup struct {
	DB *sql.DB
}

func ConnectDb(uri string) (*sql.DB, error) {
	db, err := sql.Open("postgres", uri)

	if err != nil {
		return nil, err
	}

	ctx := context.Background()
	ctx, cancel := context.WithTimeout(ctx, time.Second*5)
	defer cancel()

	err = db.PingContext(ctx) // verify if the connection with the db is alive

	if err != nil {
		return nil, err
	}

	return db, nil
}

func (d *DatabaseSetup) Sync() error {
	log.Println("Creating tables...")

	ctx, cancel := context.WithTimeout(context.Background(), time.Second * 3)
	defer cancel()

	tx, err := d.DB.BeginTx(ctx, nil)

	if err != nil {
		return err
	}

	query_users_table := `CREATE TABLE IF NOT EXISTS users (
		id serial PRIMARY KEY,
		name VARCHAR(255) NOT NULL,
		password VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL,
		created_at timestamp default CURRENT_TIMESTAMP,
		updated_at timestamp default CURRENT_TIMESTAMP
	)`

	_, err = tx.ExecContext(ctx, query_users_table)

	if err != nil {
		log.Println("Error creating tx to users table", err)
		tx.Rollback()
		return err
	}

	err = tx.Commit()

	if err != nil {
		log.Println("Error creating db", err)
		return err
	}

	log.Println("Db synced successfully")
	return nil
}

func (d *DatabaseSetup) Down() error {
	log.Println("Droping tables...")

	ctx, cancel := context.WithTimeout(context.Background(), time.Second * 3)
	defer cancel()

	tx, err := d.DB.BeginTx(ctx, nil)

	if err != nil {
		return err
	}

	query_users_table := `DROP TABLE IF EXISTS users`

	_, err = tx.ExecContext(ctx, query_users_table)

	if err != nil {
		log.Println("Error creating tx to delete users table", err)
		tx.Rollback()
		return err
	}

	err = tx.Commit()

	if err != nil {
		log.Println("Error creating db", err)
		return err
	}

	log.Println("Db table deleted successfully")
	return nil
}
