import { createContext, useState } from "react";
import data from "../data/data.json";

export const BoardContext = createContext()

const BoardProvider = ({children}) => {

    const [currentBoard, setCurrentBoard] = useState(data.boards[0])

    const setCurrent = (name) => {
        setCurrentBoard(data.boards.find(b => b.name === name))
    }

    return (
        <BoardContext.Provider value={{currentBoard, setCurrent, list : data.boards.map(b => b.name)}}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardProvider;