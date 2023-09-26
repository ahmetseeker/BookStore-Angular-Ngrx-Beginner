import { createAction, props } from "@ngrx/store";
import { AppState } from "./app.state";

export const setAPIStatus = createAction(
    '[Books Effects API] Success Or Failure Status',
    props<{apiStatus: AppState}>()
)
