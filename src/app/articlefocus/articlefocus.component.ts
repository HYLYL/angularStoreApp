//Angular
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';

//Library
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

//App
import { Articles } from '../store/data/articles';
import { ArticlesService } from '../store/data/articles.service';
import { Basket } from '../store/data/basket';
import { BasketService } from '../services/basket.service';
import { Orders } from '../store/data/orders';
import { OrdersService } from '../store/data/orders.service';
import { selectBasketCount, State } from '../store';
import { selectCurrentUser } from '../store/ui/ui.reducer';
import { Users } from '../store/data/users';
import { UsersService } from '../store/data/users.service';
import * as UiActions from '../store/ui/ui.actions';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articlefocus',
  templateUrl: './articlefocus.component.html',
  styleUrls: ['./articlefocus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlefocusComponent {
  
  @ViewChild('focusedArticle', { static: true }) focusedArticleTemplate!: TemplateRef<any>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public articles$!: Observable< Articles[] >;
  public articlesTotalCount$!: Observable<number>;
  public basketCount$!: Observable< number >;
  public basketName$!: Observable< string >;
  public baskets$!: Observable< Basket[] >;  
  public guestToken!: string | null;
  public loading$!: Observable<boolean>;
  public orders$!: Observable< Orders[] >;
  public percentageDifference: number = 0;
  public priceDifference: number = 0;
  public selectedArticle: any; // Déclarez la variable selectedArticle dans votre composant
  public selectedArticleCompare: any;
  public showDifference = false;
  public userId: string = '';
  public users$!: Observable< Users[] >;

  constructor( 
    private entityOrdersService: OrdersService,
    private entityUsersService: UsersService,
    public basketService: BasketService,
    private store: Store<State>
    ) {};

ngOnInit() {

    console.log(`ArticleComponent - ngOnInit`);
    
    const storedArticle = localStorage.getItem('selectedArticle');
    this.selectedArticle = storedArticle ? JSON.parse(storedArticle) : null;

    
    this.guestToken = localStorage.getItem('guestToken');
    this.basketCount$ = this.store.select(selectBasketCount);

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
  this.showDifference = true;
  this.selectedArticleCompare = article;
}

}
