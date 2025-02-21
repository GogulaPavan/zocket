package main

import (
	"fmt"
	"log"
	"github.com/gin-gonic/gin"
	"zocket/handlers"
	"zocket/middleware"
	"zocket/utils"
)

func main() {
	r := gin.Default()
	r.Use(middleware.CORSMiddleware())

	r.POST("/login", handlers.LoginHandler)
	r.GET("/tasks", handlers.GetTasks)
	r.POST("/tasks", handlers.CreateTask)
	r.POST("/ai-suggest-task", handlers.AISuggestTask)
	r.GET("/ws", utils.WebsocketHandler)

	fmt.Println("Server is running on :8080")
	log.Fatal(r.Run(":8080"))
}
