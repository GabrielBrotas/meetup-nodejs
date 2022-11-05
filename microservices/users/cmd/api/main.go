package main

import "github.com/gin-gonic/gin"


func main() {
	r := gin.Default()
	r.SetTrustedProxies([]string{"127.0.0.1"})

	setup_routes(r)
	
	r.GET("/health-check", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"success": true,
		})
	})

	r.Run(":4002")
}