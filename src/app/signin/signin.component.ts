import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Clients } from '../store/data/clients';
import { DynamicCheckboxModel, DynamicFormControlModel, DynamicFormGroupModel, DynamicFormLayout, DynamicFormModel, DynamicFormService, DynamicInputModel } from '@ng-dynamic-forms/core';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable, Subject } from 'rxjs';
import { OrderService } from '../services/order.service';
import { selectIsLoggedIn } from '../store/ui/ui.reducer';
import { SIGNIN_FORM_MODEL, SIGNIN_FORM_LAYOUT } from './signin.model';
import { State } from '../store';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { ThemePalette } from '@angular/material/core';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core'
import * as utils from '../core/utils/functions';
import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
import * as zxcvbnEnPackage from '@zxcvbn-ts/language-en'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SigninComponent implements OnInit, OnDestroy  {

  @Output() nextClicked: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('stepper') stepper!: MatStepper;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  private fieldsToValidate = ['email', 'password', 'conditions', 'email2', 'pswd'];

  public client!: Clients;
  // public color: ThemePalette;
  public currentEmail: string | null = null;
  public currentNom: string | null = null;
  public currentPrenom: string | null = null;
  public currentUserAdresse: string | null = null;
  public currentUserId: string | null = null;
  public formGroup!: FormGroup; 
  public formsGroup!: FormGroup[];
  public formsLayout: DynamicFormLayout[] = SIGNIN_FORM_LAYOUT;
  public formsModel: DynamicFormModel[] = SIGNIN_FORM_MODEL;
  public hasDigit: boolean = false;
  public hasSpecialChar: boolean = false;
  public hasUppercase: boolean = false;
  public inputType: string = 'password';
  public isFirstStepActive: boolean = true;
  public isLinear: boolean = false;
  public isLoggedIn$!: Observable<boolean>;
  public isWindowTooSmall: boolean = true;
  public loginExists: boolean = false;
  public orientation: StepperOrientation = 'horizontal';
  public passwordEvaluationResult: any = 0;
  public isVisible: boolean = false;
  public steppers: any[] = [];
  public termsAccepted: boolean = false;
  public userId: string | null = null;
  public windowWidth!: number;
  public evaluationMeter!: any;
  public config: any = {
    pswdStrength: 4
  };
  public pswdModel!: DynamicInputModel;
  public dynamicHtmlContent!: string;
  public safeDynamicHtmlContent!: SafeHtml;

 
  constructor(  
    private cdr: ChangeDetectorRef,
    private oS: OrderService,
    private formService: DynamicFormService,//ne pas mélanger à FormBuilder
    private store: Store<State>,
    private sanitizer: DomSanitizer
  ) {
      this.isLoggedIn$ = this.store.select(selectIsLoggedIn);

      // Exemple de contenu HTML dynamique (à titre d'illustration)
    // this.dynamicHtmlContent = '<h2>Titre dynamique'+ this.passwordEvaluationResult +'</h2><p>Ceci est du contenu HTML injecté avec Angular.</p>';
    this.dynamicHtmlContent = '<h2>Titre dynamique' + this.passwordEvaluationResult + '</h2><p>Ceci est du contenu HTML injecté avec Angular.</p>';

    // Nettoyer le contenu HTML et le marquer comme sûr
    this.safeDynamicHtmlContent = this.sanitizer.bypassSecurityTrustHtml(this.dynamicHtmlContent);
    
    }

  ngOnInit() {
    console.log(`StepperComponent - OnInit- start`);

    for(let i = 0; i < this.formsModel.length; i++) {

      const formModel = this.formsModel[i];
      utils.setScope( formModel, this.fieldsToValidate, this );
      if( i == 0 ) {
        this.pswdModel = this.formService.findModelById('pswd', formModel) as DynamicInputModel;
        
      }
      const formGroup = this.formService.createFormGroup(formModel);
      const formLayout = this.formsLayout[i];
      this.steppers.push({ formModel: formModel, formGroup: formGroup, formLayout: formLayout });
      this.setStepperOrientation();

    }

    // this.store.select(selectCurrentUser)
    // .pipe(
    //   takeUntil(this.destroy$),
    //   switchMap(( value ): Observable<Object> => { 
    //     if (value) { 
    //       console.log(value);
    //       this.userId = value;
    //       const endpoint = `http://localhost:3000/users/${value}`;
    //       const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    //       return this.http.get(endpoint, { headers: headers }); 
    //     } else {
    //       return of({});
    //     }
    //   })
    // )
    // .subscribe( (res: any) => {
    //   if (res) { 
    //     console.log(`StepperComponent - OnInit - subscribe - currentUser exist`);
    //     this.currentEmail = res.email;
    //     this.currentNom = res.Nom;
    //     this.currentPrenom = res.Prenom;
    //     this.currentUserId = res.UserId;
    //     this.currentUserAdresse = res.Adresse;
    //     utils.setValues( res, this );
    //     this.skipRegister()

    //   } else { 
    //     console.log (`StepperComponent - OnInit - subscribe - No currentUser exist`);
    //     this.currentEmail = null;
    //   }
    // })

    console.log(`StepperComponent - OnInit - End`)
  }

  ngOnDestroy() {
    console.log(`StepperComponent - ngOnDestroy`);

    this.destroy$.next(true);

    this.destroy$.complete();
  }

  @HostListener('window:resize', ['$event'])

  public onResize() {
    this.windowWidth = window.innerWidth;
    this.setStepperOrientation();
  }

  public safeInnerHtml(event: any) {
    // Exemple de contenu HTML dynamique (à titre d'illustration)
    this.dynamicHtmlContent = '<h2>Titre dynamique'+ this.passwordEvaluationResult +'</h2><p>Ceci est du contenu HTML injecté avec Angular.</p>';

    // Nettoyer le contenu HTML et le marquer comme sûr
    this.safeDynamicHtmlContent = this.sanitizer.bypassSecurityTrustHtml(this.dynamicHtmlContent);
  }

  public setStepperOrientation() {
    if (!this.isFirstStepActive) {
      if (this.windowWidth < 900) {
        this.orientation = 'vertical';
      } else {
        this.orientation = 'horizontal';
      }

      if (this.windowWidth < 400) {
        this.orientation = 'horizontal';
        this.isWindowTooSmall = true;
      } else {
        this.isWindowTooSmall = false;
      }
    }
  }

  public getSuffix(): SafeHtml {
    const unsafeHtml = `<i (click)="onClick()" class="material-icons pr-2">visibility</i>`;
    return this.sanitizer.bypassSecurityTrustHtml(unsafeHtml);
  }

  public onNextClicked() {
    this.isFirstStepActive = false;
    this.nextClicked.emit();
  }

  public skipRegister() {
    this.stepper.selectedIndex = 2;
  }

  public emailConfirm() {
    console.log('Email send !');
  }

  public updateTermsAccepted(value: boolean) {
    this.termsAccepted = value;
    this.cdr.detectChanges();
  }

  public onScrolled(event: any): void {
    console.log(event);
    const conditionsModel: DynamicCheckboxModel = this.formService.findModelById('conditions', this.formsModel[3]) as DynamicCheckboxModel;
    conditionsModel.disabled = false;
  }

  public setClient() {
    console.log(`StepperComponent - setClient :`);

    const emailClient = this.currentEmail || '';
    const guestId = localStorage.getItem('guestToken')
    const userIdClient = this.currentUserId || guestId;

    if(userIdClient) {
      const client: Clients = {
        userId: userIdClient,
        email: emailClient || this.steppers[0].formGroup.controls.step0.controls['email'].value,
        nom: this.steppers[0].formGroup.controls.step0.controls['nom'].value || 'John',
        prenom: this.steppers[0].formGroup.controls.step0.controls['prenom'].value || 'Doe',
        adresse: this.steppers[2].formGroup.controls.step2.controls['adresseLivraison1'].value || 'truc à gauche',

        cards: [
          {
          cardNumber: this.steppers[3].formGroup.controls.step3.controls['cardNumber'].value || 'Pas de value',
          cardHolderName: 'this.formGroup.controlvalue',
          expirationDate: '20/06/2042',
          cvv: '321'
          }
        ]
      }

      this.client = client;

    };
  }

  public sendClient() {this.oS.setClient(this.client);}

  public onClick() {
    this.isVisible = !this.isVisible
    this.pswdModel.inputType = this.isVisible ? 'text' : 'password';
  }

  // public togglePasswordVisibility() {
  //   this.showPassword = !this.showPassword;
  //   this.inputType = this.showPassword ? 'text' : 'password';
  //   this.suffix = this.showPassword ? '<i class="material-icons pr-2">visibility</i>' : '<i class="material-icons pr-2">visibility_off</i>';
  // }

  public onChange(event: any) {

    const model: any = event['model'];
    const control: FormControl = event['control'];

    switch (model['id']) {
      case 'sameAdresse':
        
      const facturationGroup: DynamicFormGroupModel = this.formService.findById('facturationGroup', this.formsModel[2]) as DynamicFormGroupModel;
      
      if (facturationGroup) {
        facturationGroup.hidden = control.value;
        facturationGroup.disabled = control.value;

        const facturationModels: DynamicFormControlModel[] = facturationGroup.group;

        for (const facturationModel of facturationModels) {
          facturationModel.hidden = control.value;
          facturationModel.disabled = control.value;
        }
      }
      break;
      case 'pswd':

      // const control: FormControl = event['control'];

      const pswd: any = this.formService.findById('pswd', this.formsModel[0]);
      console.log(pswd.value);

      // Exemple de contenu HTML dynamique (à titre d'illustration)
    this.dynamicHtmlContent = '<h2>Titre dynamique'+ this.passwordEvaluationResult +'</h2><p>Ceci est du contenu HTML injecté avec Angular.</p>';

    // Nettoyer le contenu HTML et le marquer comme sûr
    this.safeDynamicHtmlContent = this.sanitizer.bypassSecurityTrustHtml(this.dynamicHtmlContent);
    
      break;
      default:
      break;
    }
  }

  public getCardType() {
    let cur_val = this.steppers[3].formGroup.controls.step3.controls['cardNumber'].value;
    if (cur_val != null && cur_val != undefined && cur_val != "") {
      const jcb_regex = /^(?:2131|1800|35)[0-9]{0,}$/; //2131, 1800, 35 (3528-3589)
      const amex_regex = /^3[47][0-9]{0,}$/; //34, 37
      const diners_regex = /^3(?:0[0-59]{1}|[689])[0-9]{0,}$/; //300-305, 309, 36, 38-39
      const visa_regex = /^4[0-9]{0,}$/; //4
      const mastercard_regex = /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$/; //2221-2720, 51-55
      const maestro_regex = /^(5[06789]|6)[0-9]{0,}$/; //always growing in the range: 60-69, started with / not something else, but starting 5 must be encoded as mastercard anyway
      const discover_regex = /^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$/; //6011, 622126-622925, 644-649, 65

      // get rid of anything but numbers
      cur_val = cur_val.replace(/\D/g, "");

      let sel_brand = "unknown";
      if (cur_val.match(jcb_regex)) {
        sel_brand = "JCB";
      } else if (cur_val.match(amex_regex)) {
        sel_brand = "Amex";
      } else if (cur_val.match(diners_regex)) {
        sel_brand = "Diners_club";
      } else if (cur_val.match(visa_regex)) {
        sel_brand = "Visa";
      } else if (cur_val.match(mastercard_regex)) {
        sel_brand = "Mastercard";
      } else if (cur_val.match(discover_regex)) {
        sel_brand = "Discover";
      } else if (cur_val.match(maestro_regex)) {
      if (cur_val[0] == "5") {
        sel_brand = "MasterCard";
      } else {
        sel_brand = "Maestro";
      }
      }
      console.log(sel_brand);
      return sel_brand;
    }
    return "";
  }

  async initializeStripe() {
    await this.oS.initializeStripe();
    this.oS.processPayment();
  }
    
}
