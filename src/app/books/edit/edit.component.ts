import { Component, OnInit } from '@angular/core';
import { Book } from '../store/book';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { selectBookById } from '../store/book.selector';
import { switchMap } from 'rxjs';
import { updateBook } from '../store/book.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { AppState } from 'src/app/shared/store/app.state';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  bookForm: Book = {
    id: 0,
    author: '',
    title: '',
    cost: 0
  }

  constructor(private store: Store, private route: ActivatedRoute, private router: Router, private appStore: Store<AppState>) { }

  ngOnInit(): void {
      let fetchFormData$ = this.route.paramMap.pipe(
        switchMap((param) => {
          var id = Number(param.get('id'));
          return this.store.pipe(select(selectBookById(id)));
        })
      );

      fetchFormData$.subscribe((data) => {
        if(data) {
          this.bookForm = {...data};
        } else {
          this.router.navigate(['/']);
        }
      })

    
  }

  updateBook(form: NgForm) {
    this.store.dispatch(updateBook({payload: { ...this.bookForm }}));

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
