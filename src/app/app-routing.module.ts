import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from './services/auth.guard';
import { BasketComponent } from './basket/basket.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { StepperComponent } from './stepper/stepper.component';
import { UsersComponent } from './users/users.component';
import { ArticlefocusComponent } from './articlefocus/articlefocus.component';

const routes: Routes = [
  { path: 'articles', component: ArticlesComponent },
  { path: 'articlefocus', component: ArticlefocusComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: RegisterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'stepper', component: StepperComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', component: ArticlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
