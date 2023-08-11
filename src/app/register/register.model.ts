import { AUTOCOMPLETE_OFF, DynamicFormHook, DynamicFormLayout, DynamicFormModel, DynamicInputModel } from "@ng-dynamic-forms/core";

export const REGISTER_FORM_LAYOUT: DynamicFormLayout = {
  email: {
    grid: {
      host: 'col',
      container: 'col',
      control: 'col'
    }
  }

}

  export const REGISTER_FORM_MODEL = [
    new DynamicInputModel({
      id: '_id',
      inputType: 'text',
      hidden: true
    }),
    new DynamicInputModel({
      id: 'nom',
      inputType: 'text',
      value: '',
      autoComplete: AUTOCOMPLETE_OFF,
      updateOn: DynamicFormHook.Blur,
      placeholder: 'Nom',
      hint: 'Saisir votre nom',
      prefix: '<i class="material-icons pr-2">face</i>',
      validators: {
        required: null
      },
      errorMessages: {
        required: 'Champ obligatoire'
      }
    }),
    new DynamicInputModel({
      id: 'prenom',
      inputType: 'text',
      value: '',
      autoComplete: AUTOCOMPLETE_OFF,
      updateOn: DynamicFormHook.Blur,
      placeholder: 'Prénom',
      hint: 'Saisir votre prénom',
      prefix: '<i class="material-icons pr-2">face</i>',
      validators: {
        required: null
      },
      errorMessages: {
        required: 'Champ obligatoire'
      }
    }),
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
        loginExists: 'Adresse e-mail déjà utilisée'
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