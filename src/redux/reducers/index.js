import { combineReducers,} from "redux";
import { weatherReducer } from "./reducers";


export const rootReducers = combineReducers({
    weather:weatherReducer,
})

export type RootState = ReturnType<typeof rootReducers>