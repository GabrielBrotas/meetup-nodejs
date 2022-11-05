package repositories_test

import (
	"database/sql"
	"log"
	"testing"

	database "github.com/GabrielBrotas/meetup-users/pkg/db"
	"github.com/GabrielBrotas/meetup-users/pkg/entities"
	"github.com/GabrielBrotas/meetup-users/pkg/repositories"

	"github.com/stretchr/testify/require"
)

func get_db_connection() (*sql.DB, error) {
	const db_test_uri = "postgres://postgres:password123@users-db-test:5432/postgres?sslmode=disable"

	db, err := database.ConnectDb(db_test_uri)

	if err != nil {
		log.Println("Connection error", err)
		return nil, err
	}

	return db, nil
}

func db_setup(db *sql.DB) (*database.DatabaseSetup, error) {
	dbSetup := database.DatabaseSetup{
		DB: db,
	}

	err := dbSetup.Sync()

	if err != nil {
		log.Println("Error on sync db", err)
		return nil, err
	}

	return &dbSetup, nil
}

func drop_test_db(db *database.DatabaseSetup) {
	err := db.Down()

	if err != nil {
		log.Println("Error droping db", err)
		return
	}
}

func get_users_respositories(db *sql.DB) (*repositories.UsersRespository, error) {
	usersRepositories := repositories.UsersRespository{}.New(db)
	return usersRepositories, nil
}

func TestCreateUser(t *testing.T) {
	db_conn, err := get_db_connection()

	if err != nil {
		log.Println("error connecting repository")
		require.Nil(t, err)
	}

	setup, err := db_setup(db_conn)
	defer drop_test_db(setup)

	if err != nil {
		log.Println("error syncing repository")
		require.Nil(t, err)
	}

	usersRespository, err := get_users_respositories(db_conn)

	if err != nil {
		log.Println("error in get test repository")
		require.Nil(t, err)
	}

	user, err := entities.User{}.New(
		"Jon Doe",
		"jondoe@gmail.com",
		"123456",
	)

	if err != nil {
		log.Println("Error creating user", err)
		require.Nil(t, err)
	}

	id, err := usersRespository.Save(user)

	log.Println(id)
	require.Nil(t, err)
	require.NotNil(t, id)
}

func TestGetById(t *testing.T) {
	db_conn, err := get_db_connection()

	if err != nil {
		log.Println("error connecting repository")
		require.Nil(t, err)
	}

	setup, err := db_setup(db_conn)
	defer drop_test_db(setup)

	if err != nil {
		log.Println("error syncing repository")
		require.Nil(t, err)
	}

	usersRespository, err := get_users_respositories(db_conn)

	if err != nil {
		log.Println("error in get test repository")
		require.Nil(t, err)
	}

	user_entity, err := entities.User{}.New(
		"Jon Doe",
		"jondoe@gmail.com",
		"123456",
	)

	if err != nil {
		log.Println("Error creating user", err)
		require.Nil(t, err)
	}

	id, err := usersRespository.Save(user_entity)

	if err != nil {
		log.Println("Error saving user", err)
		require.Nil(t, err)
	}

	user, err := usersRespository.GetById(id)

	if err != nil {
		log.Println("Error getting user", err)
		require.Nil(t, err)
	}

	require.Equal(t, user_entity.Name, user.Name)
	require.Equal(t, user_entity.Email, user.Email)
	require.Equal(t, user_entity.Password, user.Password)
}

func TestFindAll(t *testing.T) {
	db_conn, err := get_db_connection()

	if err != nil {
		log.Println("error connecting repository")
		require.Nil(t, err)
	}

	setup, err := db_setup(db_conn)
	defer drop_test_db(setup)

	if err != nil {
		log.Println("error syncing repository")
		require.Nil(t, err)
	}

	usersRespository, err := get_users_respositories(db_conn)

	if err != nil {
		log.Println("error in get test repository")
		require.Nil(t, err)
	}

	user_entity, err := entities.User{}.New(
		"Jon Doe",
		"jondoe@gmail.com",
		"123456",
	)

	user2_entity, _ := entities.User{}.New(
		"Test User",
		"testuser@gmail.com",
		"1234568",
	)

	if err != nil {
		log.Println("Error creating user", err)
		require.Nil(t, err)
	}

	usersRespository.Save(user_entity)

	usersRespository.Save(user2_entity)

	if err != nil {
		log.Println("Error saving user", err)
		require.Nil(t, err)
	}

	users, err := usersRespository.FindAll()

	if err != nil {
		log.Println("Error finding users", err)
		require.Nil(t, err)
	}

	require.Equal(t, len(users), 2)
}

func TestDeleteOne(t *testing.T) {
	db_conn, err := get_db_connection()

	if err != nil {
		log.Println("error connecting repository")
		require.Nil(t, err)
	}

	setup, err := db_setup(db_conn)
	defer drop_test_db(setup)

	if err != nil {
		log.Println("error syncing repository")
		require.Nil(t, err)
	}

	usersRespository, err := get_users_respositories(db_conn)

	if err != nil {
		log.Println("error in get test repository")
		require.Nil(t, err)
	}

	user_entity, err := entities.User{}.New(
		"Jon Doe",
		"jondoe@gmail.com",
		"123456",
	)

	if err != nil {
		log.Println("Error creating user", err)
		require.Nil(t, err)
	}

	id, _ := usersRespository.Save(user_entity)

	err = usersRespository.DeleteOne(id)

	require.Nil(t, err)
}

func TestUpdateOne(t *testing.T) {
	db_conn, err := get_db_connection()

	if err != nil {
		log.Println("error connecting repository")
		require.Nil(t, err)
	}

	setup, err := db_setup(db_conn)
	defer drop_test_db(setup)

	if err != nil {
		log.Println("error syncing repository")
		require.Nil(t, err)
	}

	usersRespository, err := get_users_respositories(db_conn)

	if err != nil {
		log.Println("error in get test repository")
		require.Nil(t, err)
	}

	user_entity, err := entities.User{}.New(
		"Jon Doe",
		"jondoe@gmail.com",
		"123456",
	)

	if err != nil {
		log.Println("Error creating user", err)
		require.Nil(t, err)
	}

	id, _ := usersRespository.Save(user_entity)
	user_entity.SetID(id)

	user_entity.UpdatePassword("123xxx")

	err = usersRespository.Update(user_entity)

	require.Nil(t, err)

	usr, _ := usersRespository.GetById(user_entity.ID)
	require.Equal(t, user_entity.Password, usr.Password)
}