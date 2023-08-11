//Angular
import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

//Library
import { combineLatestWith, map, Observable, Subject, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

//App
import { Articles } from '../store/data/articles';
import { ArticlesService } from '../store/data/articles.service';
import { Basket } from '../store/data/basket';
import { BasketService } from '../services/basket.service';
import { Error } from '../interfaces/error';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Orders } from '../store/data/orders';
import { OrdersService } from '../store/data/orders.service';
import { selectBasketCount, State } from '../store';
import { selectCurrentUser } from '../store/ui/ui.reducer';
import { Users } from '../store/data/users';
import { UsersService } from '../store/data/users.service';
import * as fromUi from '../store/ui/ui.reducer';
import * as UiActions from '../store/ui/ui.actions';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArticlesComponent implements OnInit, OnDestroy {

  @ViewChild('focusedArticle', { static: true }) focusedArticleTemplate!: TemplateRef<any>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public articles$!: Observable< Articles[] >;
  public articlesTotalCount$!: Observable<number>;
  public basketCount$!: Observable< number >;
  public basketName$!: Observable< string >;
  public baskets$!: Observable< Basket[] >;  
  public count$!: Observable< number >;
  public dialogRef!: MatDialogRef<any>;
  public error$!: Observable< Error | null >;
  public filter$!: Observable< fromUi.Filter | null >;
  public guestToken!: string | null;
  public limit$!: Observable< number >;
  public loading$!: Observable<boolean>;
  public orders$!: Observable< Orders[] >;
  public page$!: Observable< number >;
  public pageEvent!: PageEvent;
  public percentageDifference: number = 0;
  public priceDifference: number = 0;
  public selectedArticle: any; // Déclarez la variable selectedArticle dans votre composant
  public selectedArticleCompare: any;
  public showDifference = false;
  public userId: string = '';
  public users$!: Observable< Users[] >;
  public windowWidth!: number;
  

  constructor(  private dialog: MatDialog,
                private entityArticlesService: ArticlesService,
                private entityOrdersService: OrdersService,
                private entityUsersService: UsersService,
                private articleService: ArticleService,
                public basketService: BasketService,
                private router: Router,
                private store: Store<State>
                ) {};

  ngOnInit() {

                console.log(`ArticleComponent - ngOnInit`);
                this.guestToken = localStorage.getItem('guestToken');
                this.basketCount$ = this.store.select(selectBasketCount);
                this.error$ = this.store.select(fromUi.selectError);
                this.page$ = this.store.select(fromUi.selectArticlesPage);
                this.limit$ = this.store.select(fromUi.selectArticlesLimit);
                this.filter$ = this.store.select(fromUi.selectArticlesFilter);
                // this.count$ = this.store.select(fromUi.selectArticlesCount);
                this.count$ = this.entityArticlesService.getTotalCount();
                // this.fetchArticles();
                // Utilisez forkJoin pour combiner les articles de la base de données et les articles générés
                // const articlesFromDB$ = this.page$.pipe(
                //   combineLatestWith(this.limit$),
                //   switchMap(([page, limit]) => this.entityArticlesService.getWithQuery({ _page: page + 1, _limit: limit }))
                // );
                // console.log(`ArticlesComponent - OnInit - articlesFromDB$`);
                // articlesFromDB$.subscribe(articles => console.table(articles));

                this.articles$ = this.page$.pipe(
                  combineLatestWith(this.limit$),
                    // switchMap(([page, limit]) => {
                      // const queryParams = { _page: page + 1, _limit: limit };
                      switchMap(([page, limit]) => {return this.entityArticlesService.generateArticles({ _page: page + 1, _limit: limit }).pipe(
                        withLatestFrom(this.page$),
                          map(([articles, currentPage]) => {
                            // Appliquer la pagination aux articles en utilisant les limites spécifiées
                            const start = currentPage * limit;
                            const end = start + limit;
                            return articles.slice(start, end);
                          }
                        ))})
                );

                // this.articles$.pipe(
                //   map(articles => console.table(articles))
                // );
                
                // this.count$ = this.articles$.pipe(
                //   map(articles => articles.length)
                // );
//                 console.log(`ArticlesComponent - OnInit - generatedArticles$`);
//                 generatedArticles$.subscribe(articles => console.table(articles));

// combineLatest([articlesFromDB$, generatedArticles$]).subscribe(([articlesFromDB, generatedArticles]) => {
//   const combinedArticles = [...articlesFromDB, ...generatedArticles];
//   this.articles$ = of(combinedArticles);
// });

                // this.articles$ = of([]).pipe(
                //   switchMap(([page, limit]) =>
                //     forkJoin([articlesFromDB$, generatedArticles$]).pipe(
                //       map(([articlesFromDB, generatedArticles]) => [...articlesFromDB, ...generatedArticles])
                //     )
                //   ),
                //   startWith([]) // Émet un tableau vide au départ
                // );
                // this.articles$.subscribe(articles => console.table(articles));

                // this.articles$ = this.page$.pipe(
                //   combineLatestWith(this.limit$),
                //   switchMap(([page, limit]) => this.entityArticlesService.getWithQuery({ _page: page + 1, _limit: limit }))
                // );

                this.windowWidth = window.innerWidth;

                this.store.select(selectCurrentUser).subscribe(userId => {
                  console.log('User Id:', userId);
                  if (userId) { 
                    this.userId = userId;
                    this.users$ = this.entityUsersService.getWithQuery({ _id: userId });
                    this.orders$ = this.entityOrdersService.getWithQuery({ userId: userId });
                  }
                });
  }

  ngOnDestroy() {

    console.log(`ArticleComponent - ngOnDestroy`);
        
        this.destroy$.next(true);
        
        this.destroy$.complete();
    
      }

      @HostListener('window:resize', ['$event'])
      public onResize() {
        this.windowWidth = window.innerWidth;
      }

      // fetchArticles() {
      //   this.entityArticlesService.generateArticles();
      // }
      
      public addManyToCache(articles: Articles[]) {
        this.store.dispatch(addManyToCache('Articles', articles));
      }

      public openDialog(article: any) {
        this.selectedArticle = article;
        this.dialogRef = this.dialog.open(this.focusedArticleTemplate, {
          width: '100%',
          height: '100%',
          disableClose: false
        });
        this.calculatePriceDifference(article);
      }

      public openComponent(article: any) {
        this.articleService.setSelectedArticle(article);
        this.calculatePriceDifference(article);
        this.router.navigate(['/articlefocus']);
      }
      
      public calculatePriceDifference(article: any): void {
        if (this.selectedArticle && article) {
          this.priceDifference = this.selectedArticle.price - article.price;
          this.percentageDifference = (this.priceDifference / article.price) * 100;
        } else {
          this.priceDifference = 0;
          this.percentageDifference = 0;
        }
      }

      public onClickCompare(article: any): void {
        if(this.windowWidth > 900) {
        this.showDifference = true;
        this.selectedArticleCompare = article;
        }
      }

      public closeDialog() {
        this.dialogRef.close();
      }

  // increment(article: any): void {

  //   const basketItem = {
  //     _id: this.guestToken,
  //     articleId: article._id,
  //     quantity: 1 // Ici, on ajoute un seul article au panier
  //   };
  //   this.entityBasketsService.add(basketItem);

  //   this.store.dispatch(BasketActions.basketUpdateCount( { val: 1 } ));
  //   console.log('increment called');
  //   this.basketName$.subscribe((value) => {
  //     console.log('Article acheté :', article.name, article._id, value);
  //   });

  //   this.OrderService.add({
  //     userId: this.userId,
  //     articleId: article._id,
  //     price: article.price,
  //     name: article.name,
  //     quantity: 1
  //   }).subscribe();

  //   this.orders$.subscribe(orders => console.log(orders));

  //   this.orders$.pipe(
      
  //     take(1),
  //     map((orders) => {
  //       console.log(orders);
  //       const foundOrder = orders.find(order => order.articleId === article._id);
  //       console.log(`articles component - increment - ${foundOrder}`);
  //       if (foundOrder) {
  //         const newQuantity = foundOrder.quantity + 1;
  //         return this.OrderService.update({
  //           _id: foundOrder._id,
  //           userId: this.userId,
  //           articleId: article._id,
  //           price: article.price,
  //           name: article.name, 
  //           quantity: newQuantity
  //          });
  //       } else {
  //         return this.OrderService.add({
  //           userId: this.userId,
  //           articleId: article._id,
  //           price: article.price,
  //           name: article.name,
  //           quantity: 1
  //         });
  //       }
  //     })
  //   ).subscribe();
    
  // }
 
  // decrement(article: any) {

  //   this.store.dispatch(BasketActions.basketUpdateCount( { val: -1 } ));
  //   console.log('decrement called');
  //   console.log('Article supprimé :', article.name);

  //   this.orders$.subscribe((orders) => {
  //     const order = orders.find((o) => o.name === article.name);
  //     if (order) {
  //       this.basketService.delete(order._id).subscribe();
  //     }
  //   });
    
  // }

  onSizeSelected(event: any) {
    // this.store.dispatch(BasketActions.basketSetName( { val: event.target.value } ));
    // const selectedSize = event.target.value;
    console.log('Selected size: ', event.target.value);
    // return selectedSize;
  }

  onColorSelected(event: any) {
    console.log('Selected color: ', event.target.value);
    // const selectedColor = event.target.value;
    // console.log('Selected color: ', selectedColor);
  }

  onGenderSelected(event: any) {
    this.store.dispatch(UiActions.setArticlesFilter( {filter: event.target.value} ));
  }
 
  onPageEvent(event: PageEvent): void {

    this.store.dispatch(UiActions.setArticlesLimit( {limit: event.pageSize} ));
    this.store.dispatch(UiActions.setArticlesPage( {page: event.pageIndex} ));
     console.log(['content component', event]);
   
  }

}

function addManyToCache(arg0: string, articles: Articles[]): any {
  throw new Error('Function not implemented.');
}
