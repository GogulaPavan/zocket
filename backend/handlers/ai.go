package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

type TaskInput struct {
	Input string `json:"input"`
}

type AIResponse struct {
	Choices []struct {
		Text string `json:"text"`
	} `json:"choices"`
}

func AISuggestTask(c *gin.Context) {
	var taskInput TaskInput
	if err := c.ShouldBindJSON(&taskInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	apiKey := os.Getenv("OPENAI_API_KEY") // Ensure you set this in your environment variables
	if apiKey == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Missing OpenAI API key"})
		return
	}

	url := "https://api.openai.com/v1/completions"

	// Create JSON payload correctly
	requestBody, err := json.Marshal(map[string]interface{}{
		"model":  "gpt-3.5-turbo",
		"prompt": fmt.Sprintf("Suggest a task related to: %s", taskInput.Input),
		"max_tokens": 50,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request body"})
		return
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create request"})
		return
	}

	req.Header.Set("Authorization", "Bearer "+apiKey)
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send request"})
		return
	}
	defer resp.Body.Close()

	// Decode response
	var aiResp AIResponse
	if err := json.NewDecoder(resp.Body).Decode(&aiResp); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse response"})
		return
	}

	if len(aiResp.Choices) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "No suggestions received"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"suggested_task": aiResp.Choices[0].Text})
}
