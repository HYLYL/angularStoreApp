import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DynamicFormLayout, DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, switchMap, takeUntil } from 'rxjs';
import { REGISTER_FORM_LAYOUT, REGISTER_FORM_MODEL } from './register.model';
import { selectCurrentUser } from '../store/ui/ui.reducer';
import { State } from '../store';
import { Store } from '@ngrx/store';
import * as utils from '../core/utils/functions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public currentEmail: string | null = null;
  public formGroup!: FormGroup;
  public formLayout: DynamicFormLayout = REGISTER_FORM_LAYOUT;
  public formModel: DynamicFormModel = REGISTER_FORM_MODEL;
  public loginExists: boolean = false;
  public routeUsed: string = '';
  public userId: string | null = null;

  constructor( private formService: DynamicFormService,
               private http: HttpClient,
               private auth: AuthService,
               private store: Store<State>,
               private route: ActivatedRoute ) {
    console.log(`RegisterComponent - constructor`);
  }

  ngOnInit() {
    console.log(`RegisterComponent - OnInit`);

    this.route.url.subscribe(urlSegments => {
      this.routeUsed = urlSegments.join('/');
      console.log('Route:', this.routeUsed);
    });

    utils.setScope( this.formModel, ['email', 'password'], this );
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.formGroup.reset();
    this.store.select(selectCurrentUser)
    .pipe(
      takeUntil(this.destroy$),
      switchMap(( value ): Observable<Object> => { 
        if (value) { 
          console.log(value);
          this.userId = value;
          const endpoint = `http://localhost:3000/users/${value}`;
          const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
          return this.http.get(endpoint, { headers: headers }); 
        } else {
          return of({});
        }
      })
    )
    .subscribe( (res: any) => {
      if (res) { 
        console.log(`RegisterComponent - OnInit - subscribe - currentUser exist`);
        this.currentEmail = res.email;
        utils.setValues( res, this );
      } else { 
        console.log (`RegisterComponent - OnInit - subscribe - No currentUser exist`);
        this.currentEmail = null;
      }
    })
  }

  ngOnDestroy() {

    console.log(`RegisterComponent - ngOnDestroy`);
        
        this.destroy$.next(true);
        
        this.destroy$.complete();
    
      }

      public register() {
        console.log(`LoginComponent - register`);
    
        if (this.userId) {
          this.auth.update(this.userId, this.formGroup.controls['nom'].value, this.formGroup.controls['prenom'].value, this.formGroup.controls['email'].value, this.formGroup.controls['password'].value);
        } else {
          this.auth.register( this.formGroup.controls['nom'].value, this.formGroup.controls['prenom'].value, this.formGroup.controls['email'].value, this.formGroup.controls['password'].value );
        }
    }

}