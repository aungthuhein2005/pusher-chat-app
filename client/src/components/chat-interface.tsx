import React, { useState, FormEvent, useEffect, useRef } from "react"
import { SendHorizonal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import Pusher from "pusher-js"
// import Echo from "laravel-echo"
import { useUser } from "@/context/UserContext"
import axios from "axios"
import echo from "@/pusher"
import { send } from "process"

interface Message {
  id: string
  sender_id: number
  receiver_id: number
  message: string
  created_at?: string
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const token = localStorage.getItem("token")
  const { selectedUser } = useUser()
  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const messagesEndRef = useRef<HTMLDivElement | null>(null) // Reference for scroll container
  useEffect(() => {
    if (!selectedUser) return;
    echo.private(`chat.${user.id}`)
      .listen('MessageSent', (data) => {  
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

    // Cleanup on component unmount
    return () => {
      echo.leaveChannel(`chat.${user.id}`);
    };
  }, [token, user.id, selectedUser]);
  
  useEffect(() => {
    if (!selectedUser) return;
    
    axios
      .get(`/api/fetch-messages/`, {
        params: {
          receiver_id: selectedUser?.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessages(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.error("Failed to fetch messages: ", err);
      });
  }, [token, selectedUser]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim() || !selectedUser) return

    const user = JSON.parse(localStorage.getItem("user") || "{}")

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      sender_id: user.id,
      receiver_id: selectedUser.id,
      message: input,
      created_at: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newUserMessage])
    setInput("")

    try {
      const response = await axios.post(
        "/api/send-message",
        {
          message: input,
          role: 'user',
          sender_id: user.id,
          receiver_id: selectedUser.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log("Message sent: ", response.data)
    } catch (err) {
      console.error("Failed to send message: ", err)
    }
  }

  // Scroll to the bottom when new messages are added or when the component mounts
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === user.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender_id === user.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {message.message}
              <div className="text-xs text-end opacity-50">
                {new Date(message.created_at).toLocaleString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Scroll target */}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit">
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
