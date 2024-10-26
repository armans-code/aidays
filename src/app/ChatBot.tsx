'use client';
import Image from "next/image"
import { useState } from "react"
import "./ChatBot.css"

async function retrieveData(message: string, updateConversation: (message: string, isBot: boolean) => void) {


    if (message.trim() === "") return 

    // Adds user message to conversation
    updateConversation(message, false)
    

    // Needs to get server route -> gets data from AI
    const response = await fetch("/#", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({message: message})
    })
    if (!response.ok) throw new Error("Failed to retrieve data")
    
    // parses AI response
    let data = await response.json();
    data = JSON.parse(data).message;
    
    // Adds AI response to conversation
    updateConversation(data, true);


}

function ChatPrompt() {
    const [message, setMessage] = useState("");
    const [conversation, setConversation] = useState<Array<{ message: string; isBot: boolean }>>([{message: "Hello, How can I assist you today?", isBot: true}]);

    const updateConversation = (newMessage: string, isBot: boolean) => {
        setConversation((prev) => [...prev, { message: newMessage, isBot }])
    }

    function handleSendPrompt(event: React.MouseEvent) {
        retrieveData(message, updateConversation)
        setMessage("");
    }

    function handleKeyDown(event: React.KeyboardEvent) {
        if (event.key === "Enter") {
            retrieveData(message, updateConversation)
            setMessage("");
        }
    }

    return (
        <div
            className="chatPrompt w-80 h-2/5 rounded-lg flex flex-col"
        >
            <div
                className="bg-slate-300 font-bold text-base flex-column"
            >
                AI Disaster Assistant
            </div>
            <div
                className="text-sm bg-slate-100 flex-1 flex flex-col gap-3 p-3 conversation-exchange"
            >
                {conversation.map((entry, index) => (
                    <div
                        key={index}
                        className={entry.isBot ? "botConversation" :"userConversation"}
                    >
                        {entry.message}
                    </div>
                ))}
            </div>
            <div
                className="bg-slate-300 flex gap-2"
            >
                <input
                    placeholder="Enter your response"
                    type="text"
                    className="rounded-md input-prompt flex-grow"
                    value = {message}
                    onChange = {(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                >
                </input>
                <Image
                    className="hover:cursor-pointer send-prompt"
                    onClick={handleSendPrompt}     
                    src="/send.svg"
                    alt="AI Chat Button"
                    width={25}
                    height={25}
                />
            </div>
        </div>

    )
}


const ChatBot = () => {
    const [isVisible, setIsVisible] = useState(false);

    function handleClick(event: React.MouseEvent) {
        setIsVisible(isVisible => !isVisible)
    }
    return (
        <div>
            <Image
            className="chatButton hover:cursor-pointer"
            onClick={handleClick}
            src="/chat.svg"
            alt="AI Chat Button"
            width={40}
            height={40}
            />
            {isVisible && <ChatPrompt />}
        </div>
    )
}

export default ChatBot