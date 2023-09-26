import { createReducer, on } from "@ngrx/store";
import { AppState } from "./app.state";
import { setAPIStatus } from "./app.action";
import { state } from "@angular/animations";

export const initialState: AppState = {
    apiStatus: '',
    apiResponseMessage: ''
}

export const appReducer = createReducer(
    initialState,
    on(setAPIStatus, (state, {apiStatus}) => {
        return apiStatus;
    })
)
