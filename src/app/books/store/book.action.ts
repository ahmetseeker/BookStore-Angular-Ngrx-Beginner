import { createAction, props } from "@ngrx/store";
import { Book } from "./book";

export const invokeBooksAPI = createAction(
    "[Home Component] Invoke Books Fetch API"
)

export const booksFetchAPISuccess = createAction(
    "[Books Effects API] Books Fetch API Success",
    props<{allBooks: Book[]}>()
)

export const addBooks = createAction(
    "[Add Component] Save Book API",
    props<{payload: Book}>()
)

export const addBooksSuccess = createAction(
    "[Books Effect] Save Book API Success",
    props<{response: Book}>()
)

export const updateBook = createAction(
    '[Edit Component] Invoke Update Book API',
    props<{payload: Book}>()
)

export const updateBookAPISuccess = createAction(
    '[Books Effect] Invoke Update Book API Success',
    props<{response: Book}>()
)

export const deleteBook = createAction(
    '[Home Component] Delete Book API',
    props<{id: number}>()
)

export const deleteBookAPISuccess = createAction(
    '[Books Effect] Delete Book API Success',
    props<{id: number}>()
)