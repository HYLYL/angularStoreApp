import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as zxcvbn from "zxcvbn";

// Modèle de validator synchrone

// export function SampleValidator( scope: any ): ValidatorFn {
//     return ( control: AbstractControl ): ValidationErrors | null => {
//         //return null si le champ est valide
//         return null;
//         //return d'un object structuré si le champ est invalide
//         //return { sampleValidator: control };
//     }
// };

// export function isStrongPswd( scope: any ): ValidatorFn {
//     console.log("isStrongPswd - validator - loaded");
//     return ( control: AbstractControl ): ValidationErrors | null => {
//         console.log(`isStrongPswd - validator - value : ${control.value}`);
//         const Reg = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
        
//         return Reg.test(control.value) ? null : { isStrongPswd: control.value };
        
//     }
// };

export function isStrongPswd( scope: any ): ValidatorFn {

    console.log('Sync validator - isStrongPswd loaded');
  
    return ( control: AbstractControl): ValidationErrors | null => {
  
        console.log('Sync validator -  in isStrongPswd validator function : ' + control.value );
  
      const { score, feedback = {} } = control.value ? zxcvbn( control.value ) : { score : 0, feedback : {}};
      
    if (scope.passwordEvaluationResult <= 4) {
      scope.passwordEvaluationResult = score;
      // scope.hasDigit = true ;
    }

    scope.hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=|]/.test(control.value);
    scope.hasDigit = /\d/.test(control.value);
    scope.hasUppercase = /[A-Z]/.test(control.value);
    
      console.log('Sync validator -  in isStrongPswd validator function - pswd strength : ' + score + scope.passwordEvaluationResult);
      console.table(feedback);
      const isValid =  score >= scope.config['pswdStrength'] ;
  
      return isValid ? null : { isStrongPswd: false };
  
    };
}

export function isEmailAllowed( scope: any ): ValidatorFn {
    console.log("isEmailAllowed - validator - loaded");
    return ( control: AbstractControl ): ValidationErrors | null => {

        console.log(`isEmailAllowed - validator - value : ${control.value}`);

        const allowedDomains = ["hotmail.com", "gmail.com", "outlook.com", "hotmail.fr", "gmail.fr", "outlook.fr"];
        const emailRegex = new RegExp(`@(${allowedDomains.join("|")})$`, "i");
        
        return emailRegex.test(control.value) ? null : { isEmailAllowed: control.value };
        
    }
};

export function isValidCreditCardNr( scope: any ): ValidatorFn {
    console.log('Sync validator - isValidCreditCardNr loaded');
    return ( control: AbstractControl ): ValidationErrors| null => {
        console.log('Sync validator - isValidCreditCardNr validator function : ' + control.value, scope.formGroup);
    let isValid = false;
    if ( control.value ) {
    let card = control.value;
    if (control.value.indexOf('_') !== -1) {
    card = card.replace('_', '');
    }
    card = card.split(' ').join('');
    console.log('Sync validator - isValidCreditCardNr validator function', card);
    const CREDIT_CARDS_REGEXP = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/gi;
    isValid = CREDIT_CARDS_REGEXP.test(card);
    }
    console.log('Sync validator - isValidCreditCardNr validator function', scope.formGroup, isValid);
    return isValid ? null : { isValidCreditCardNr: false };
    };
}

export function isEmailMatch(scope: any): ValidatorFn {
    console.log("isEmailMatch - validator - loaded");
    
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(`isEmailMatch - validator - value : ${control.value}`);
      if (scope.steppers[0]) {
        const email1Model = scope.formService.findModelById('email1', scope.steppers[0].formModel);
        return email1Model.value == control.value ? null : { isEmailMatch: control.value };
    }
      
      return null;
    }
  }

export function isChecked(scope: any): ValidatorFn {
    console.log("isChecked - validator - loaded");
    return (control: AbstractControl): ValidationErrors | null => {
        console.log(`isChecked - validator - value : ${control.value}`);
        return control.value !== true ? { isChecked: control.value} : null
    }
}
    