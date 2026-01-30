import React from 'react';

const ChatInput: React.FC = () => {
    return (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="relative flex items-center w-full p-3 bg-white border border-gray-200 rounded-lg shadow-sm focus-within:shadow-md focus-within:border-spekty-blue/50 transition-all">
                    <textarea
                        rows={1}
                        placeholder="Send a message..."
                        className="w-full resize-none border-0 bg-transparent p-0 pl-2 pr-10 focus:ring-0 focus-visible:ring-0 max-h-[200px] overflow-y-hidden"
                        style={{ minHeight: '24px' }}
                    ></textarea>
                    <button className="absolute right-3 p-1 rounded-md text-gray-400 hover:bg-spekty-blue hover:text-white transition-colors disabled:opacity-40">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                    </button>
                </div>
                <div className="text-center text-xs text-gray-400 mt-2">
                    Spekty AI can make mistakes. Consider checking important information.
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
