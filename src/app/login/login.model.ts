import { AUTOCOMPLETE_OFF, DynamicFormHook, DynamicFormLayout, DynamicInputModel } from "@ng-dynamic-forms/core";

export const LOGIN_FORM_LAYOUT: DynamicFormLayout = {
  email: {
    grid: {
      host: 'col-md-7 col-sm-12',
      container: 'col',
      control: 'd-flex col'
    },
    element: {
      control: 'col'
    }
  },
  password: {
    grid: {
      host: 'col-md-5 col-sm-12',
      container: 'col',
      control: 'd-flex col'
    },
    element: {
      control: 'col'
    }
  }

}

  export const LOGIN_FORM_MODEL = [
    new DynamicInputModel({
      id: 'email',
      inputType: 'text',
      value: '',
      autoComplete: AUTOCOMPLETE_OFF,
      updateOn: DynamicFormHook.Blur,
      placeholder: 'Identifiant',
      hint: 'Saisir une adresse e-mail valide',
      prefix: '<i class="material-icons pr-2">face</i>',
      validators: {
        required: null
      },
      asyncValidators: {
        loginExists: null
      },
      errorMessages: {
        required: 'Champ obligatoire',
        pattern: 'Adresse e-mail invalide',
        loginExists: 'Adresse e-mail inconnue'
      }
    }),
    new DynamicInputModel({
      id: 'password',
      inputType: 'password',
      value: '',
      autoComplete: AUTOCOMPLETE_OFF,
      placeholder: 'Mot de passe',
      prefix: '<i class="material-icons pr-2">lock_outline</i>',
      validators: {
        required: null
      },
      errorMessages: {
        required: 'champ obligatoire'
      }
    })
  ]