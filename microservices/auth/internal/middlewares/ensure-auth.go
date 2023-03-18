package middlewares

import (
	"net/http"

	"github.com/GabrielBrotas/meetup-auth/internal/sso"
	"github.com/gin-gonic/gin"
	"golang.org/x/oauth2"
)

func EnsureAuth(provider sso.OAuth2Provider) gin.HandlerFunc {
	return func(c *gin.Context) {
		accessToken := c.GetHeader("Authorization")

		if accessToken == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "Access token required"})
			return
		}

		token := &oauth2.Token{
			AccessToken: accessToken,
			TokenType:   "bearer",
		}

		user, err := provider.GetUserData(token)

		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.Set("userID", int(*user.ID))

		c.Next()
	}
}
