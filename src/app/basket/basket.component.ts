import { Basket } from '../store/data/basket';
import { BasketService } from '../services/basket.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../store/data/orders';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BasketComponent implements OnInit {

  public basket: Basket[] = [];
  public basket$!: Observable< Basket[] >;
  public displayedColumns: string[] = ['article', 'name', 'quantity', 'pu', 'total', 'increment', 'decrement', 'remove'];
  public orders$!: Observable< Orders[] >;

  constructor(private bs: BasketService) {
                console.log('BasketComponent - constructor');
               };

  ngOnInit() {
    console.log('BasketComponent - onInit');
    this.basket$ = this.bs.get();
    this.basket$.subscribe(basket => this.basket = basket);
  }

  public update(item: Basket, add: boolean) {
    this.bs.update(item.data, add);
  }

  public remove(item: Basket) {
    this.bs.remove(item);
  }

  public getTotal(basket: Basket[]): number {
    let total = 0;
    basket.forEach((item: Basket) => {
      total += item.quantity * item.data.price;
    });
    return total;
  }
}
