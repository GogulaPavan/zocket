package handlers

import (
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
)

// Task struct
type Task struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Status string `json:"status"`
}

var (
	tasks = []Task{}
	mu    sync.Mutex
	nextID = 1
)

// GetTasks retrieves all tasks
func GetTasks(c *gin.Context) {
	c.JSON(http.StatusOK, tasks)
}

// CreateTask adds a new task
func CreateTask(c *gin.Context) {
	var newTask Task
	if err := c.ShouldBindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	mu.Lock()
	newTask.ID = nextID
	nextID++
	tasks = append(tasks, newTask)
	mu.Unlock()

	c.JSON(http.StatusCreated, newTask)
}
