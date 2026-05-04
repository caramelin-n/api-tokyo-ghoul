import React, {useReducer} from "react";
import { CharacterContext } from "./characterContext.js";
import { characterReducer } from "../reducer/characterReducer.js";

export const CharacterProvider = ({ children }) => {
    const [characters, dispatch] = useReducer(characterReducer, []);
    return(
        <CharacterContext.Provider value={{ characters, dispatch }}>
            {children}
        </CharacterContext.Provider>
    )
}