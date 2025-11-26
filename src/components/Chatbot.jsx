import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);

    // Load chat history when chatbot opens
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            loadChatHistory();
        }
    }, [isOpen]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadChatHistory = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await fetch('http://localhost:5000/api/chatbot/history', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const formattedMessages = [];

                // Add welcome message if no history
                if (data.history.length === 0) {
                    formattedMessages.push({
                        id: 'welcome',
                        text: 'Hello! I\'m your DevHub AI assistant. How can I help you today?',
                        sender: 'bot'
                    });
                } else {
                    // Format history into messages
                    data.history.forEach((chat, index) => {
                        formattedMessages.push({
                            id: `user-${chat.id}`,
                            text: chat.message,
                            sender: 'user'
                        });
                        formattedMessages.push({
                            id: `bot-${chat.id}`,
                            text: chat.response,
                            sender: 'bot'
                        });
                    });
                }

                setMessages(formattedMessages);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
            setMessages([{
                id: 'welcome',
                text: 'Hello! I\'m your DevHub AI assistant. How can I help you today?',
                sender: 'bot'
            }]);
        }
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: `user-${Date.now()}`,
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/chatbot/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message: inputValue })
            });

            const data = await response.json();

            if (response.ok) {
                const botMessage = {
                    id: `bot-${Date.now()}`,
                    text: data.response,
                    sender: 'bot'
                };
                setMessages(prev => [...prev, botMessage]);
            } else {
                // Handle error response
                const errorMessage = {
                    id: `bot-error-${Date.now()}`,
                    text: data.response || 'Sorry, I encountered an error. Please try again.',
                    sender: 'bot'
                };
                setMessages(prev => [...prev, errorMessage]);

                if (data.error && data.error.includes('API key')) {
                    setError('OpenAI API key not configured. Please add it to server/.env');
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = {
                id: `bot-error-${Date.now()}`,
                text: 'Sorry, I couldn\'t connect to the server. Please try again.',
                sender: 'bot'
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            {!isOpen && (
                <button
                    className="chatbot-toggle"
                    onClick={() => setIsOpen(true)}
                >
                    <MessageCircle size={24} />
                </button>
            )}

            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-header-content">
                            <MessageCircle size={20} />
                            <span>DevHub AI Assistant</span>
                        </div>
                        <button
                            className="chatbot-close"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {error && (
                        <div className="chatbot-error">
                            {error}
                        </div>
                    )}

                    <div className="chatbot-messages">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`chatbot-message ${message.sender}`}
                            >
                                <div className="chatbot-message-bubble">
                                    {message.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="chatbot-message bot">
                                <div className="chatbot-message-bubble">
                                    <div className="chatbot-typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chatbot-input-container">
                        <input
                            type="text"
                            className="chatbot-input"
                            placeholder="Type your message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="chatbot-send"
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim() || isTyping}
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
