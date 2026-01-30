import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
    role: 'user' | 'ai';
    content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
    const isAi = role === 'ai';

    return (
        <div className={`w-full py-6 md:py-8 border-b border-black/5 ${isAi ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="max-w-3xl mx-auto px-4 md:px-6 flex gap-4 md:gap-6">
                <div className="flex-shrink-0 flex flex-col relative items-end">
                    <div className={`w-8 h-8 rounded-sm flex items-center justify-center overflow-hidden ${isAi ? 'bg-transparent' : 'bg-spekty-blue'
                        }`}>
                        {isAi ? (
                            <img src="/spekty-favicon.png" alt="Spekty AI" className="w-full h-full object-contain" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                </div>

                <div className="relative flex-1 overflow-hidden">
                    <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed prose-p:mb-2 prose-headings:font-bold prose-headings:text-gray-900 prose-strong:font-bold prose-strong:text-gray-900">
                        <ReactMarkdown>{content}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessage;
