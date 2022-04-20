import React from "react";

export interface Memory {
    id: string;
    imagePath: string;
    title: string;
    type: "good" | "bad";
    base64url: string;
    // lng: number;
    // lat: number;
}

const MemoriesContext = React.createContext<{
    memories: Memory[];
    addMemory: (
        path: string,
        base64Data: string,
        title: string,
        type: "good" | "bad",
        // lng: number,
        // lat: number
    ) => void;
    initContext: () => void;
}>({
    memories: [],
    addMemory: () => {},
    initContext: () => {},
});

export default MemoriesContext;