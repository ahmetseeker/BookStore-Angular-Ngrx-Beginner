import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { Injectable } from "@angular/core";
import { addBooks, addBooksSuccess, booksFetchAPISuccess, deleteBook, deleteBookAPISuccess, invokeBooksAPI, updateBook, updateBookAPISuccess } from "./book.action";
import { EMPTY, map, switchMap, withLatestFrom } from "rxjs";
import { AppState } from "src/app/shared/store/app.state";
import { Store, select } from "@ngrx/store";
import { setAPIStatus } from "src/app/shared/store/app.action";
import { selectBooks } from "./book.selector";

@Injectable()
export class BooksEffects {
    constructor(private actions$: Actions, private bookService: BooksService, private appStore: Store<AppState>, private store: Store) {}

    loadAllBooks$ = createEffect(() => 
        this.actions$.pipe(
            ofType(invokeBooksAPI),
            withLatestFrom(this.store.pipe(select(selectBooks))),
            switchMap(([, booksFromStore]) => {
                if(booksFromStore.length > 0) {
                    return EMPTY;
                }
                return this.bookService.get()
                .pipe(
                    map((data) => booksFetchAPISuccess({ allBooks: data }))
                );
            })
        )
    );

    addNewBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addBooks),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}))
                return this.bookService.create(action.payload).pipe(
                    map((data) => {
                        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}
                    }))
                        return addBooksSuccess({ response: data})}));
            })
        )
    );

    updateBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateBook),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}));
                return this.bookService.update(action.payload).pipe(
                    map((data) => {
                        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}
                    }))
                        return updateBookAPISuccess({ response: data})}));
            })
        )
    );

    deleteBook$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteBook),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:''}}));
                return this.bookService.delete(action.id).pipe(
                    map((data) => {
                        this.appStore.dispatch(setAPIStatus({apiStatus:{apiResponseMessage:'', apiStatus:'success'}
                    }))
                        return deleteBookAPISuccess({ id: action.id })}));
            })
        )
    )
}
