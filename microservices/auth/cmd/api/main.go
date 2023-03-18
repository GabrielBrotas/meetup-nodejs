package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/GabrielBrotas/meetup-auth/internal/middlewares"
	"github.com/GabrielBrotas/meetup-auth/internal/repositories"
	"github.com/GabrielBrotas/meetup-auth/internal/sso"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	router := gin.Default()

	githubProvider := sso.NewOAuth2Provider(
		sso.Github,
		os.Getenv("GITHUB_CLIENT_ID"),
		os.Getenv("GITHUB_CLIENT_SECRET"),
	)

	usersRepository := repositories.NewInMemoryUsersRepository()
	ssoRoutes := NewSSORoutes(githubProvider, usersRepository)

	router.GET("/healthy", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"success": true,
		})
	})
	router.GET("/users",
		ssoRoutes.listUsers,
	)
	router.GET("/login", ssoRoutes.loginHandler)
	router.GET("/auth/me", middlewares.EnsureAuth(githubProvider), ssoRoutes.getAuthenticatedUser)
	router.GET("/auth/callback", ssoRoutes.callbackHandler)

	log.Fatal(router.Run(":9090"))
}
