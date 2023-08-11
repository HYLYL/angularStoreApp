import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';
import { Articles } from './articles';
import { Observable, OperatorFunction, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ArticlesService extends EntityCollectionServiceBase<Articles> {
  pipe(arg0: OperatorFunction<unknown, any>) {
    throw new Error('Method not implemented.');
  }
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Articles', serviceElementsFactory);
  }

  public generateArticles(queryParams: any): Observable<Articles[]> {
    const articles: Articles[] = [];
  
    for (let i = 30; i <= 60; i++) {
      const article: Articles = {
        _id: i,
        name: `Article ${i}`,
        brand: `Brand ${i}`,
        category: `Category ${i}`,
        price: Math.floor(Math.random() * 100) + 1,
        sizes: [10, 20, 30],
        colors: ['Red', 'Blue', 'Green'],
        gender: 'homme'
      };
  
      articles.push(article);
    }
  
    console.log(`Store - articles.service - generateArticles() - ${articles.length}`);
    console.table(articles);
  
    // Appliquer les filtres supplémentaires avec queryParams
    return this.getWithQuery(queryParams).pipe(
      map((dbArticles: Articles[]) => [...dbArticles, ...articles])
    );
  }

  public getTotalCount(): Observable<number> {
    return this.generateArticles({}).pipe(
      tap((articles) => console.log(articles.length)),
      map((articles) => articles.length)
    );
  }
}
