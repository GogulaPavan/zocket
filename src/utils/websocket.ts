const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8080/ws";

export const connectWebSocket = (onMessage) => {
  const socket = new WebSocket(WS_URL);

  socket.onopen = () => console.log("WebSocket connected!");
  socket.onmessage = (event) => onMessage(JSON.parse(event.data));
  socket.onerror = (error) => console.error("WebSocket error:", error);
  socket.onclose = () => console.log("WebSocket disconnected!");

  return socket;
};
