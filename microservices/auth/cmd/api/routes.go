package main

import (
	"context"
	"log"
	"net/http"

	"github.com/GabrielBrotas/meetup-auth/internal/entities"
	"github.com/GabrielBrotas/meetup-auth/internal/repositories"
	"github.com/GabrielBrotas/meetup-auth/internal/sso"
	"github.com/gin-gonic/gin"
)

type SSORoutes struct {
	provider sso.OAuth2Provider
	db       repositories.IUsersRepository
}

func NewSSORoutes(provider sso.OAuth2Provider, db repositories.IUsersRepository) *SSORoutes {
	return &SSORoutes{
		provider: provider,
		db:       db,
	}
}

func (r *SSORoutes) listUsers(c *gin.Context) {
	users, err := r.db.List()

	if err != nil {
		c.JSON(400, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"users": users,
	})
}

func (r *SSORoutes) getAuthenticatedUser(c *gin.Context) {
	userID, ok := c.MustGet("userID").(int)

	if !ok {
		c.JSON(500, gin.H{
			"error": "something went wront",
		})
		return
	}

	user := r.db.GetByProviderID(userID)
	
	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

func (r *SSORoutes) loginHandler(c *gin.Context) {
	url := r.provider.AuthCodeURL("state")
	c.Redirect(http.StatusTemporaryRedirect, url)
}

// callbackHandler handles the Github OAuth2 callback.
func (r *SSORoutes) callbackHandler(c *gin.Context) {
	code := c.Query("code")

	token, err := r.provider.Exchange(context.Background(), code)

	if err != nil {
		log.Println(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// Use the access token to get ghUser data from the OAuth2 provider.
	ghUser, err := r.provider.GetUserData(token)

	log.Println(ghUser)

	existentUser := r.db.GetByProviderID(int(*ghUser.ID))

	if existentUser == nil {
		newUser := entities.NewUser(sso.Github, int(*ghUser.ID), *ghUser.Login)
		err := r.db.Save(newUser)

		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
	}

	if err != nil {
		log.Println(err)
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	c.JSON(200, gin.H{
		"token": token,
		"user":  *ghUser.Login,
	})
}
