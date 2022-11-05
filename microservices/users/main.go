package main

import (
	"log"
	"os"

	"github.com/GabrielBrotas/meetup-users/src/cmd/api"
	database "github.com/GabrielBrotas/meetup-users/src/db"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env.local")

	server := api.Server{}

	db, err := database.ConnectDb(os.Getenv("POSTGRES_URI"))

	if err != nil {
		log.Print(err)
		os.Exit(1)
	}

	dbSetup := database.DatabaseSetup{
		DB: db,
	}

	err = dbSetup.Sync()

	if err != nil {
		log.Println("Error sync db.", err)
		os.Exit(1)
	}

	server.Run()
}
