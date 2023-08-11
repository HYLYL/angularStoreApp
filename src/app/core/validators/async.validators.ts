import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, catchError, debounceTime, distinctUntilChanged, first, map, of, startWith, switchMap, tap } from "rxjs";
import { User } from "src/app/services/auth.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";

// Modèle de validator asynchrone

// export function loginExists( scope: any ): AsyncValidatorFn {
//     return ( control: AbstractControl ): Observable<ValidationErrors | null> => {
//         //return null si le champ est valide
//         return of(null);
//         //return d'un object structuré si le champ est invalide
//         // return of({ sampleAsyncValidator: control });
//     }
// };

export function loginExists( scope: any ): AsyncValidatorFn {
    console.log('Async validator - loginExists loaded' );
    return ( control: AbstractControl ): Observable<ValidationErrors | null > => {
      console.log( `Async validator - in loginExists validator function :  ${control.value} ` );
      return scope.auth.checkCredentials( control.value ).pipe(
        map( ( res: any[] ) => {
          console.log(`Async validator - in loginExists validator function : loginExists =  ${scope.loginExists} - res length = ${res.length} `); 
             
          // let len = 0;
      
          // if(scope.loginExists) {
          //   len = 1 
          // }else{ len = 0 }

          // let err = null;
          
          // if(res.length==len) {
          //   err = null;
          // }else{ 
          //   if ( scope.currentEmail && scope.currentEmail == control.value ) {
          //     err = null;
          //   }else {
          //     err = { loginExists: control.value }
          //   }
          // }
          // return err;
          
        return ( res.length == ( scope.loginExists == true ? 1 : 0 ) ) 
        ? null : ( scope.currentEmail && scope.currentEmail == control.value )
        ? null : { loginExists: control.value };
         } )
      );
    }
  }