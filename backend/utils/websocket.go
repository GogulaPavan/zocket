package utils

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

var clients = make(map[*websocket.Conn]bool)
var broadcast = make(chan string)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func WebsocketHandler(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Println("Error upgrading WebSocket:", err)
		return
	}
	defer conn.Close()

	clients[conn] = true

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			delete(clients, conn)
			break
		}
		broadcast <- string(msg)
	}
}

func BroadcastTask(task string) {
	for client := range clients {
		client.WriteMessage(websocket.TextMessage, []byte(task))
	}
}
