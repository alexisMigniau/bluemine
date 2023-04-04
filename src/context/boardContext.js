import { createContext, useEffect, useReducer } from "react";
import data from "../data/data.json";

export const BoardContext = createContext()

const BoardProvider = ({children}) => {

    // Met à jour le localStorage
    const updateLocalStorage = (board) => {
        if(board)
        {
            let currentBoardIndex = data.boards.findIndex(b => b.name === board.name)
            data.boards[currentBoardIndex] = board
            localStorage.setItem("boards", JSON.stringify(data));
        }
    };

    const reducer = (state, action) => {
        switch(action.type) {
            // Change le tableau courant
            case "setCurrentBoard":
                localStorage.setItem("lastBoard", action.name);
                return data.boards.find(b => b.name === action.name);
            // Déplace une tâche
            case "moveTask":
                const task = state.columns[action.sourceColumnIndex].tasks.splice(action.sourceIndex, 1).shift()
                state.columns[action.destinationColumnIndex].tasks.splice(action.destinationIndex, 0, task)
                updateLocalStorage({...state, columns : [...state.columns]})
                return {...state, columns : [...state.columns]};
            // Crée un nouveau tableau
            case "addBoard":
                data.boards.push({"name" : action.name, "columns" : action.columns.filter(c => c !== "").map(c => {return {"name" : c, "tasks" : []}})})
                
                let newBoard = data.boards.find(b => b.name === action.name);
                localStorage.setItem("lastBoard", action.name);
                updateLocalStorage(newBoard)
                return newBoard;
            case "addColumn":
                updateLocalStorage({...state, columns : [...state.columns, {name : action.name, tasks : []}]})
                return {...state, columns : [...state.columns, {name : action.name, tasks : []}]}
            default:
                throw new Error();
        }
    }

    // Initialise la valeur en fonction du localStorage
    useEffect(() => {
        let saved = JSON.parse(localStorage.getItem("boards")) ?? undefined;

        if(saved)
        {
           data = saved;
        } else {
            localStorage.setItem("boards", JSON.stringify(data));
        }

        setCurrent(localStorage.getItem("lastBoard") ?? data.boards[0].name)
    }, [])

    const [currentBoard, dispatch] = useReducer(reducer, null)

    const setCurrent = (name) => {
        dispatch({type : "setCurrentBoard", name : name})
    }

    const moveTask = (sourceColumnIndex, sourceIndex, destinationColumnIndex, destinationIndex) => {
        dispatch({type : "moveTask", sourceColumnIndex, sourceIndex, destinationColumnIndex, destinationIndex})
    }

    const addBoard = (name, columns) => {
        dispatch({type : "addBoard", name, columns})
    }

    const addColumn = (name) => {
        dispatch({type : "addColumn", name})
    }

    const updateSubtask = (column, task_index, subtask_index, checked) => {
        dispatch({type : "updateSubtask", column, task_index, subtask_index, checked})
    }

    return (
        <BoardContext.Provider value={{
            currentBoard,
            list : data.boards.map(b => b.name),
            moveTask,
            setCurrent,
            addBoard,
            addColumn,
            updateSubtask
        }}>
            {children}
        </BoardContext.Provider>
    )
}

export default BoardProvider;