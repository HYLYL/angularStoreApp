import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { State } from '../store';
import { Store } from '@ngrx/store';
import { v4 as uuid } from 'uuid';
import * as fromUi from '../store/ui/ui.actions';

export interface User {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

export interface Error {
  code: number;
  msg: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  expiresAt: Date;
}

const url = 'http://localhost:3000';
const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public userIdFinal!: string;

  constructor(
              private store: Store<State>,
              private http: HttpClient,
              private router: Router) {
                console.log(`AuthService - constructor`);
              }

  public register(nom: string, prenom: string, email: string, password: string): void {
    console.log(`AuthService - register : ${email} / ${password} / ${nom} / ${prenom}`);
    const id = uuid();
    const endpoint = `${url}/register`;
    const body = { 
      _id: id,
      nom: nom,
      prenom: prenom,
      email: email,
      password: password
     };
     console.table(body);
    this.http.post<User>(endpoint, body, { headers: headers }).subscribe(
      (res: any) => {

        this.setSession(res.user._id, email, password);

      }
    );
  }

  public update(id: string, nom: string, prenom: string, email: string, password: string): void {
    console.log(`AuthService - update : ${id} / ${email} / ${password} / ${nom} / ${prenom}`);
    const endpoint = `${url}/users/${id}`;
    const body = { 
        nom: nom,
        prenom: prenom,
        email: email,
        password: password
    };

    this.http.patch(endpoint, body, { headers: headers }).subscribe(
        res => {
            console.log(res);
        }
    );
}

  public login(email: string, password: string): void {
    console.log(`AuthService - login : ${email} / ${password}`);
    const endpoint = `${url}/login`;
    console.log(`AuthService - login : ${endpoint} / ${headers}`);
    const body = { email, password };
    console.table(body)
    console.table(headers)
    this.http.post<User>(endpoint, body, { headers: headers }).subscribe(
      (res: any) => {
        console.table(res)
console.log(res.user._id, email, password);
        this.setSession(res.user._id, email, password);

      }
    );
  }

  public checkCredentials( email: string ): Observable<any> {
    const queryParams = new HttpParams().append( 'email', email );
    return this.http.get( url + '/users', { headers: headers, params: queryParams })
  }

  public getUsers(): Observable<User[]> {
    console.log('AuthService - get user');
    const endpoint = `${url}/users`;
    return this.http.get<User[]>(endpoint);
  }
  
  public logout(): void {
    console.log(`AuthService - logout`);
        localStorage.removeItem('session');
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        this.store.dispatch(fromUi.setCurrentUser({ currentUser: null }));
        this.isLoggedIn();
        this.router.navigate(['/login']);
  }

  public isLoggedIn() {
    console.log(`AuthService - isLoggedIn`);
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const session = localStorage.getItem('session');
    const delta = ( expiration ? +expiration : 0 ) - Date.now();
    const isLoggedIn = ( token !== null ) && ( session !== null ) && ( expiration !== null ) && ( delta > 0 );
    console.log(`AuthService - isLoggedIn : ${isLoggedIn}`);
    this.store.dispatch(fromUi.setIsLoggedIn({isLoggedIn: isLoggedIn}));
  }

  public setSession( id: string, u: string, p: string ) {
    console.log(`AuthService - setSession : ${u} / ${p}`);
    this.store.dispatch(fromUi.setCurrentUser({currentUser: id}));
    const urlSession = `${url}/sessions`;
    const sessionId = uuid();
    localStorage.setItem('session', sessionId);
    const body = {
      _id: sessionId,
      expire: Date.now() + 60 * 60 * 1000,
      u: u,
      p: p
    }
    return this.http.post(urlSession, body, { headers: headers })
    .subscribe(response => {
      console.log([`AuthService - setSession - success : `, response]);
      this.isLoggedIn();
      this.router.navigate(['/articles']);
    },
    error => {
      console.log([`AuthService - setSession - error : `, error]);
      localStorage.removeItem('session');

    }
    );
  }

  public setToken(token: string, duration: number) {
    console.log(`AuthService - setToken : ${token} / ${duration}`);
    localStorage.setItem( 'token', token);
    localStorage.setItem( 'expiration', ( Date.now() + duration ).toString() );
  }

  public getToken() {
    console.log(`AuthService - getToken`);
    const expiration = localStorage.getItem('expiration');
    const delta = ( expiration ? +expiration : 0 ) - Date.now();
    console.log(delta);
    console.log(( delta > 60 * 1000 ) ? localStorage.getItem('token') : 'error get token');

    return ( delta > 60 * 1000 ) ? localStorage.getItem('token') : this.refreshToken();
  }

  private refreshToken(): string {
    console.log(`AuthService - refreshToken`);
    this.http.get(`${url}/sessions/${localStorage.getItem('session')}`);
    return "null";
  }

}
