import { DynamicFormControlModel, DynamicFormModel } from "@ng-dynamic-forms/core";

export function setScope( formModel: DynamicFormModel, fields: string[], scope: any ) {
  console.log(`utils - functions - setScope`);
  fields.forEach( field => {
    const model = scope.formService.findModelById( field, formModel );
    if( model?.validators ) {
      const v = model.validators;
      Object.keys( v) .forEach( key => {
        if ( [ 'min', 'max', 'required', 'requiredTrue', 'email', 'minLength', 'maxLength', 'pattern' ].indexOf( key ) == -1 ) v[key] = scope ;
      });
    }
    if( model?.asyncValidators ) {
      const v = model.asyncValidators;
      Object.keys( v ).forEach( key => v[key] = scope );
    }
  })
}

export function setValues( fields: any, scope: any ) {
  console.log(`utils - functions - setValue`);
  Object.keys( fields ).forEach( field => {
    const model = scope.formService.findModelById( field, scope.formModel );
    if( model ) {
      model.value = fields[field]
    }
  })
}