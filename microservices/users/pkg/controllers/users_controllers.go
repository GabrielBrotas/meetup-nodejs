package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func UserRouter(router *gin.Engine) {

	usersRouter := router.Group("/users")

	usersRouter.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "List all users")
	})

	usersRouter.GET("/:id", func(c *gin.Context) {
		c.String(http.StatusOK, "List all users")
	})

	usersRouter.POST("/:id", func(c *gin.Context) {
		c.String(http.StatusOK, "Create user")
	})

	usersRouter.DELETE("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Delete users")
	})

	usersRouter.PUT("/:id", func(c *gin.Context) {
		c.String(http.StatusOK, "Update user")
	})

}
