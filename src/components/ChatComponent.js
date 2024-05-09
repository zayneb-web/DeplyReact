import React, { useState, useRef, useEffect } from 'react';
import StopIcon from '@mui/icons-material/Stop';
import MicIcon from '@mui/icons-material/Mic';

function ChatComponent() {
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([
    { speaker: 'AI', message: 'Hi, how can I help you today?' }
  ]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const toggleListen = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (!recognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = handleResult;
      recognition.onerror = handleError;
      recognition.onend = handleEnd;
      setRecognition(recognition);
    }

    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    setIsListening(false);
    setResult('');
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  const handleResult = event => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    setMessage(transcript);
  };

  const handleError = error => {
    setError('Speech recognition error.');
    console.error('Speech recognition error:', error);
  };

  const handleEnd = () => {
    setIsListening(false);
  };

  const handleSpeechToText = () => {
    toggleListen();
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chatHistory, isChatOpen]);

  const handleUserInput = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!message.trim()) return;

    const updatedChatHistory = [...chatHistory, { speaker: 'You', message }];
    setChatHistory(updatedChatHistory);

    try {
      const response = await fetch('http://localhost:8000/chatbot/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch response from the chatbot backend');
      }

      const responseData = await response.json();
      const botResponse = responseData.response;

      const updatedChatHistoryWithBotResponse = [...updatedChatHistory, { speaker: 'AI', message: botResponse }];
      setChatHistory(updatedChatHistoryWithBotResponse);
    } catch (error) {
      console.error('Error:', error);
    }

    setMessage('');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {isChatOpen && (
        <div className="fixed bottom-[calc(4rem+1.5rem)] right-0 mr-4 bg-white p-3 rounded-lg border border-[#e5e7eb] w-[350px] h-[480px]">
          <div className="flex flex-col space-y-1.5 pb-4">
            <h2 className="font-bold text-lg tracking-tight">AI assistant</h2>
          </div>
          <div className="pr-3 h-[374px] overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div key={index} className={`flex gap-3 my-4 text-gray-600 text-sm ${chat.speaker === 'You' ? 'justify-end' : ''}`}>
                {chat.speaker === 'AI' && (
                  <div className="relative flex-shrink-0 overflow-hidden rounded-full w-8 h-8">
                    <div className="rounded-full bg-gray-100 border p-1">
                      <svg stroke="none" fill="black" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"></path>
                      </svg>
                    </div>
                  </div>
                )}
                <p className={`leading-relaxed ${chat.speaker === 'You' ? 'text-right' : ''}`}>
                  <span className="block font-bold text-gray-700">{chat.speaker}</span>
                  {chat.message}
                </p>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="flex items-center pt-2">
            <input
              type="text"
              className="flex-1 h-10 rounded-md border border-[#e5e7eb] px-3 py-2 text-sm placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#9ca3af] text-[#030712] focus-visible:ring-offset-2"
              placeholder="Type your message"
              value={message}
              onChange={handleUserInput}
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-[#f9fafb]  hover:bg-red-700 h-10 px-4 ml-2"
              style={{ backgroundColor: '#d00000' }}>
              Send
            </button>
            <button color="dark" onClick={handleSpeechToText}>
              {isListening ? <StopIcon /> : <MicIcon />}
            </button>
          </form>
        </div>
      )}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16  hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isChatOpen ? 'true' : 'false'}
        data-state={isChatOpen ? 'open' : 'closed'}
        style={{ backgroundColor: '#d00000' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white block border-gray-200 align-middle">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" className="border-gray-200"></path>
        </svg>
      </button>
    </>
  );
}

export default ChatComponent;