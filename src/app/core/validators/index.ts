import { NG_ASYNC_VALIDATORS, NG_VALIDATORS } from "@angular/forms";
import { isEmailAllowed, isStrongPswd, isValidCreditCardNr, isEmailMatch, isChecked } from "./sync.validators";
import { DYNAMIC_VALIDATORS, ValidatorFactory, Validator } from "@ng-dynamic-forms/core";
import { loginExists } from "./async.validators";

export const VALIDATORS_PROVIDERS = [
    { provide: NG_VALIDATORS, useValue: isStrongPswd, multi: true },
    { provide: NG_VALIDATORS, useValue: isEmailAllowed, multi: true },
    { provide: NG_VALIDATORS, useValue: isValidCreditCardNr, multi: true},
    { provide: NG_VALIDATORS, useValue: isEmailMatch, multi: true},
    { provide: NG_VALIDATORS, useValue: isChecked, multi: true},
    { provide: NG_ASYNC_VALIDATORS, useValue: loginExists, multi: true },
    { provide: DYNAMIC_VALIDATORS,

        useValue: new Map<string, Validator | ValidatorFactory>([
        
            [ 'isStrongPswd', isStrongPswd ],
            [ 'isEmailAllowed', isEmailAllowed ],
            [ 'isValidCreditCardNr', isValidCreditCardNr ],
            [ 'isEmailMatch', isEmailMatch ],
            [ 'isChecked', isChecked ],
            [ 'loginExists', loginExists ]
        
        ])
        
    }
    
];