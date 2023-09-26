import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { NgForm } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { addBooks } from '../store/book.action';
import { AppState } from 'src/app/shared/store/app.state';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Router } from '@angular/router';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  bookForm: Book = {
    id:0,
    author: '',
    title: '',
    cost: 0
  }

  constructor(private store: Store, private appStore: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
  }

  saveBook(form: NgForm) {
    this.store.dispatch(addBooks({payload: {...this.bookForm }}));
    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: {apiStatus: '', apiResponseMessage: ''}})
        );
        this.router.navigate(['/']);
      }
    })
  }

}
