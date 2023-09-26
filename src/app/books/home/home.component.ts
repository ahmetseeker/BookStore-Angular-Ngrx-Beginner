import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectBooks } from '../store/book.selector';
import { deleteBook, invokeBooksAPI } from '../store/book.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/app.state';
import { Router } from '@angular/router';
import { setAPIStatus } from 'src/app/shared/store/app.action';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private store: Store, private appStore: Store<AppState>, private router: Router) { }

  books$ = this.store.pipe(select(selectBooks));
  deleteModal: any;
  idToDelete: number = 0;

  ngOnInit(): void {

    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );

    this.store.dispatch(invokeBooksAPI());
  }

  openToDeleteModal(id: number) {
    this.idToDelete = id;
    this.deleteModal.show();
  }

  confirmDelete() {
    this.store.dispatch(deleteBook({id: this.idToDelete}));

    let appStatus$ = this.appStore.pipe(select(selectAppState));
    appStatus$.subscribe((data) => {
      if(data.apiStatus === 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: {apiStatus: '', apiResponseMessage: ''}})
        );
        this.deleteModal.hide();
      }
    })
  }

}
