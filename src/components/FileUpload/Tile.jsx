import React, { useState } from 'react';

function Tile({ word, definition }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="w-96 h-64 cursor-pointer relative"
            onClick={() => setFlipped(!flipped)}
        >
            <div
                className={`w-full h-full transition-transform duration-700 transform ${flipped ? 'rotate-y-180' : ''} relative`}
            >
                {/* Front Side */}
                <div
                    className={`absolute inset-0 bg-green-100 rounded-lg shadow-md p-4 flex items-center justify-center ${flipped ? 'hidden' : 'block'}`}
                >
                    <h3 className="text-gray-700 text-lg font-semibold">{word}</h3>
                </div>
                {/* Back Side */}
                <div
                    className={`absolute inset-0 bg-green-200 rounded-lg shadow-md p-4 flex items-center justify-center ${flipped ? 'block' : 'hidden'}`}
                >
                    <p className="text-gray-700 text-sm">{definition}</p>
                </div>
            </div>
        </div>
    );
}

export default Tile;
