import React from 'react';

export default function loading() {
    return (
        <div className="flex flex-1 justify-center h-screen items-center flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-black animate-bounce"></div>
            <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:-.5s]"></div>
        </div>
    );
}
