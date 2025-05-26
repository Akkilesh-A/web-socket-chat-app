import { Button, Input, Card, notification } from "antd";
import { useEffect, useRef, useState } from "react";
import { SendOutlined } from "@ant-design/icons";

const SimpleBroadcast = () => {
  const [messages, setMessages] = useState(["Welcome to the chat!"]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    notification.info({
      message: "Connecting...",
      description: "Connecting to websocket server...",
    });
    try {
      console.log(
        "Connecting to websocket server... at ",
        import.meta.env.VITE_SOCKET_URL
      );
      const ws = new WebSocket(import.meta.env.VITE_SOCKET_URL);

      ws.onmessage = (event) => {
        setMessages((m) => [...m, event.data]);
      };

      wsRef.current = ws;

      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: "join",
            payload: {
              roomId: "broadcast-room",
            },
          })
        );
        notification.success({
          message: "Connected",
          description: "Connected to websocket server",
        });
      };
    } catch (e) {
      console.log(e);
      notification.error({
        message: "Error",
        description: "Error connecting to websocket server",
      });
    }
  }, []);

  return (
    <Card
      title="Simple Broadcast"
      about="Everyone can see your messages!"
      className="w-[400px] h-[500px] p-4"
    >
      <div className="p-4 flex-1 h-[350px] overflow-y-auto space-y-2">
        {messages.map((message, index) => (
          <p key={index} className="p-2 rounded w-auto bg-gray-200">
            {message}
          </p>
        ))}
      </div>
      <div className="p-2 w-full flex gap-2 items-center">
        <Input
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const message = (
                document.getElementById("message") as HTMLInputElement
              ).value;
              (document.getElementById("message") as HTMLInputElement).value =
                "";
              wsRef.current!.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: message,
                  },
                })
              );
            }
          }}
          type="text"
          id="message"
          className="flex-1 text-white border border-white rounded p-2"
          placeholder="Enter Message...."
        />
        <Button
          type="primary"
          icon={<SendOutlined className="w-4 h-4" />}
          dir="rtl"
          onClick={() => {
            const message = (
              document.getElementById("message") as HTMLInputElement
            ).value;
            (document.getElementById("message") as HTMLInputElement).value = "";
            wsRef.current!.send(
              JSON.stringify({
                type: "chat",
                payload: {
                  message: message,
                },
              })
            );
          }}
        />
      </div>
    </Card>
  );
};

export default SimpleBroadcast;
