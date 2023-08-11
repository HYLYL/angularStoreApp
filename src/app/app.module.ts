//Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator'; 
import { NgModule, isDevMode } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//Library
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { MatBadgeModule } from '@angular/material/badge'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatIconModule } from '@angular/material/icon'; 
import { MatListModule } from '@angular/material/list'; 
import { MatMenuModule }  from '@angular/material/menu'; 
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepper, MatStepperModule } from '@angular/material/stepper'; 
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

//App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/authinterceptor.service';
import { BasketComponent } from './basket/basket.component';
import { BasketEffects } from './store/basket/basket.effects';
import { CoreModule } from './core/core.module';
import { defaultDataServiceConfig, entityConfig } from './entity-metadata';
import { DynamicFormsMaterialUIModule } from '@ng-dynamic-forms/ui-material';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { reducers, metaReducers } from './store';
import { RegisterComponent } from './register/register.component';
import { ResponseInterceptor } from './services/interceptor.service';
import { SigninComponent } from './signin/signin.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { StepperComponent } from './stepper/stepper.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { TextareaScrollDirective } from './core/utils/text-area.directive';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { UsersComponent } from './users/users.component';
import { ArticlefocusComponent } from './articlefocus/articlefocus.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    BasketComponent,
    LoginComponent,
    RegisterComponent,
    SigninComponent,
    SnackbarComponent,
    StepperComponent,
    TextareaScrollDirective,
    ToolbarComponent,
    UsermenuComponent,
    UsersComponent,
    ArticlefocusComponent,
  ],

  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    DynamicFormsMaterialUIModule,
    EffectsModule.forFeature([BasketEffects]),
    EffectsModule.forRoot(),
    EntityDataModule.forRoot(entityConfig),
    FormsModule,
    HttpClientModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
  ],
  
  providers: [
    AuthGuard,
    MatStepper,
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  exports: [
    StepperComponent
  ]
})
export class AppModule { }