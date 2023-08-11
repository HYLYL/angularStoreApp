import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Users } from '../store/data/users';
import { UsersService } from '../store/data/users.service';
import { selectCurrentUser } from '../store/ui/ui.reducer';
import { Store } from '@ngrx/store';
import { State } from '../store';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsermenuComponent implements OnInit, OnDestroy {

  public users$!: Observable< Users[] >;

  constructor(
    private authService: AuthService, 
    private entityUsersService: UsersService,
    private store: Store<State>
    ) {
      console.log(`ToolbarComponent - constructor`);
    }

ngOnInit() {
console.log(`ToolbarComponent - ngOnInit`);

this.store.select(selectCurrentUser).subscribe(userId => {
  if (userId) { 
    this.users$ = this.entityUsersService.getWithQuery({ _id: userId });
  }
});

}

ngOnDestroy() {
console.log(`ToolbarComponent - ngOnDestroy`);
}

  public logout(): void {
    
    return this.authService.logout();
    
  }

}
