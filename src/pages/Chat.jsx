// const Chat = () => {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");
//   const handleChange = (e) => {
//     setPrompt(e.target.value);
//   };
//   const handleClick = async () => {
//     const response = await fetch("http://localhost:11434/api/generate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "llama3.1",
//         prompt: prompt,
//         max_tokens: 15000,
//         stream: false,
//       }),
//     });

//     const data = await response.json();
//     const answer = data.response;
//     setResponse(answer);
//   };
//   return (
//     <div>
//       <textarea value={response} readOnly></textarea>
//       <input type="text" id="prompt" name="prompt" onChange={handleChange} />
//       <button className="" onClick={handleClick}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default Chat;

import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, useRef } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;
    const newMessage = {
      role: "user",
      content: userMessage,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.1",
          prompt: userMessage,
          max_tokens: 15000,
          stream: false,
        }),
      });

      const data = await response.json();
      const botResponse = data.response;

      const botMessage = {
        role: "assistant",
        content: botResponse,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error fetching bot response:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-green-100">
      <header className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 text-center font-bold text-lg">
        Alif Chatbot
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`${message.role === "user" ? "flex flex-row-reverse" : "flex flex-row"} items-center gap-4`}>
                <div>
                  <p>
                    {message.role === "user" ? (
                      <FontAwesomeIcon icon={faUser} />
                    ) : (
                      <FontAwesomeIcon icon={faRobot} />
                    )}
                  </p>
                </div>
                <div
                  className={`p-4 rounded-lg shadow ${message.role === "user" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-900"} max-w-xs`}
                >
                  <p>{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 sticky bottom-0 border-t">
        <div className="max-w-2xl mx-auto flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-opacity-30 bg-blue-100"
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            disabled={loading} // Disable input while waiting for response
          />
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={handleSendMessage}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
