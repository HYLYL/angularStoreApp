import { AuthService } from '../services/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DynamicFormLayout, DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { LOGIN_FORM_LAYOUT, LOGIN_FORM_MODEL } from './login.model';
import * as utils from '../core/utils/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public formGroup!: FormGroup;
  public formLayout: DynamicFormLayout = LOGIN_FORM_LAYOUT;
  public formModel: DynamicFormModel = LOGIN_FORM_MODEL;
  public loginExists: boolean = true;

  constructor( private formService: DynamicFormService,
               private auth: AuthService ) {
    console.log(`LoginComponent - constructor`);
  }

  ngOnInit() {
    console.log(`LoginComponent - OnInit`);
    utils.setScope( this.formModel, ['email', 'password'], this );
    this.formGroup = this.formService.createFormGroup(this.formModel);
    this.formGroup.reset();
  }

  public login() {
    console.log(`LoginComponent - login`);
    this.auth.login( this.formGroup.controls['email'].value, this.formGroup.controls['password'].value );
    
  }

}
