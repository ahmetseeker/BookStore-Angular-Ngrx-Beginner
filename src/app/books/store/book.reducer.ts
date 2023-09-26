import { createReducer, on } from "@ngrx/store";
import { Book } from "./book";
import { addBooksSuccess, booksFetchAPISuccess, deleteBookAPISuccess, updateBookAPISuccess } from "./book.action";

export const initialState: ReadonlyArray<Book> = [];

export const bookReducer = createReducer(
    initialState,
    on(booksFetchAPISuccess, (state, {allBooks}) => {
        return allBooks;
    }),
    on(addBooksSuccess, (state, { response }) => {
        let newState = [...state];
        newState.unshift(response);
        return newState;
    }),
    on(updateBookAPISuccess, (state, {response}) => {
        let newState = state.filter(book => book.id !== response.id);
        newState.unshift(response);
        return newState;
    }),
    on(deleteBookAPISuccess, (state, {id}) => {
        let newState = state.filter(book => book.id !== id);
        return newState;
    })
);