import { createContext, useReducer } from "react";
import data from "../data/data.json";

export const BoardContext = createContext()

const BoardProvider = ({children}) => {

    const reducer = (state, action) => {
        switch(action.type) {
            // Change le tableau courant
            case "setCurrentBoard":
                return data.boards.find(b => b.name === action.name);
            // Déplace une tâche
            case "moveTask":
                const task = state.columns[action.sourceColumnIndex].tasks.splice(action.sourceIndex, 1).shift()
                state.columns[action.destinationColumnIndex].tasks.splice(action.destinationIndex, 0, task)
                return {...state, columns : [...state.columns]};
            // Crée un nouveau tableau
            case "addBoard":
                data.boards.push({"name" : action.name, "columns" : action.columns.map(c => {return {"name" : c, "tasks" : []}})})
                return data.boards.find(b => b.name === action.name);
            default:
                throw new Error();
        }
    }

    const [currentBoard, dispatch] = useReducer(reducer ,data.boards[0])

    const setCurrent = (name) => {
        dispatch({type : "setCurrentBoard", name : name})
    }

    const moveTask = (sourceColumnIndex, sourceIndex, destinationColumnIndex, destinationIndex) => {
        dispatch({type : "moveTask", sourceColumnIndex, sourceIndex, destinationColumnIndex, destinationIndex})
    }

    const addBoard = (name, columns) => {
        dispatch({type : "addBoard", name, columns})
    }

    return (
        <BoardContext.Provider value={{
            currentBoard,
            list : data.boards.map(b => b.name),
            moveTask,
            setCurrent,
            addBoard
        }}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardProvider;