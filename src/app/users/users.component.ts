import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UsersService } from '../store/data/users.service';
import { Users } from '../store/data/users';
import { Observable, Subject } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'email', 'mdp'];

  public error$!: Observable< Error | null >;
  public loading$!: Observable<boolean>;
  public users$!: Observable< Users[] >;
  public page$!: Observable< number >;
  public limit$!: Observable< number >;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public pageEvent!: PageEvent;
  public articlesTotalCount$!: Observable<number>;
  public count$!: Observable< number >;


  constructor( private entityUsersService: UsersService ) {};

  ngOnInit() {
               
                // this.error$ = this.store.select(fromUi.selectError);
                // this.page$ = this.store.select(fromUi.selectArticlesPage);
                // this.limit$ = this.store.select(fromUi.selectArticlesLimit);
                // this.filter$ = this.store.select(fromUi.selectArticlesFilter);
                this.users$ = this.entityUsersService.getWithQuery({});
                // this.articlesTotalCount$ = this.articles$.pipe(
                //   switchMap(async (articles) => articles.length)
                // );
                // debugger;
                // this.articlesTotalCount$ = this.entityArticlesService.getTotalCount();
                // this.count$ = this.store.select(fromUi.selectArticlesCount);
                // this.entityArticlesService.count$.subscribe(count => console.log('content component' + count));
  }

  ngOnDestroy() {
        
        this.destroy$.next(true);
        
        this.destroy$.complete();
    
      }

  // onPageEvent(event: PageEvent): void {

  //   this.store.dispatch(UiActions.setArticlesLimit( {limit: event.pageSize} ));
  //   this.store.dispatch(UiActions.setArticlesPage( {page: event.pageIndex} ));
  //    console.log(['content component', event]);
   
  // }
}
