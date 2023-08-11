import { Articles } from '../store/data/articles';
import { Basket } from '../store/data/basket';
import { basketUpdateCount } from '../store/basket/basket.actions';
import { EntityBasketService } from '../store/data/basket.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../store';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private items: any;

  constructor(private ebs: EntityBasketService,
              private store: Store<State>) {
    console.log(`BasketService - Constructor`);
    this.ebs.entities$.subscribe(items => this.items = items); 
    console.log(this.items);
  }
    
    public update(article: Articles, add: boolean = true) {
      console.log(`BasketService - Update`);
      const fi = this.items.filter( (el: Basket) => el._id == article._id);
      const qty = fi.length === 0 ? 1 : add ? fi[0].quantity + 1 : fi[0].quantity - 1;
      if (qty <= 0) {
        this.remove(article._id);
      } else {
        const item = {
          _id: article._id,
          quantity: qty,
          data: article
        };
        this.ebs.upsertOneInCache(item);
        this.store.dispatch(basketUpdateCount({ val: this.items.length }));
      }
    }

    public remove(item: Basket) {
      console.log(`BasketService - Remove`);
      this.ebs.removeOneFromCache(item);
    }

    public get(): Observable<Basket[]> {
      console.log(`BasketService - Get`);
      return this.ebs.entities$;
    }

}
