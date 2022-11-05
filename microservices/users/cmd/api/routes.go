package main

import (
	"github.com/GabrielBrotas/meetup-users/pkg/controllers"
	"github.com/gin-gonic/gin"
)

func setup_routes(r *gin.Engine) {
	controllers.UserRouter(r)
}