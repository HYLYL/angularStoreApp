import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private selectedArticleSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  setSelectedArticle(article: any): void {
    this.selectedArticleSubject.next(article);
    localStorage.setItem('selectedArticle', JSON.stringify(article));
    console.table(this.selectedArticleSubject);
  }

  getSelectedArticle(): Observable<any> {
    return this.selectedArticleSubject.asObservable();
  }
}