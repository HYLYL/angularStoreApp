import { AUTOCOMPLETE_OFF, DynamicCheckboxModel, DynamicFormGroupModel, DynamicFormHook, DynamicFormLayout, DynamicFormModel, DynamicInputModel } from "@ng-dynamic-forms/core";

export const SIGNIN_FORM_LAYOUT: DynamicFormLayout[] = [
    {
        nom: {
            grid: {
              host: 'col-12',
              container: 'col',
              control: 'd-flex col'
            },
            element: {
              control: 'col'
            }
          },
          prenom: {
            grid: {
              host: 'col-12',
              container: 'col',
              control: 'd-flex col'
            },
            element: {
              control: 'col'
            }
          },
          email1: {
            grid: {
              host: 'col-12',
              container: 'col',
              control: 'd-flex col'
            },
            element: {
              control: 'col'
            }
          },
          email2: {
            grid: {
              host: 'col-12',
              container: 'col',
              control: 'd-flex col'
            },
            element: {
              control: 'col'
            }
          },
          pswd: {
            grid: {
              host: 'col-12',
              container: 'col',
              control: 'd-flex col'
            },
            element: {
              control: 'col'
            }
          }
    },
    {},
    {},
    {},
    {}
]

export const SIGNIN_FORM_MODEL: DynamicFormModel[] = [

    [
        new DynamicFormGroupModel({
            id: 'step0',
            group: [
                    new DynamicInputModel({
                    id: 'nom',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Nom',
                    hint: 'Saisir votre nom',
                    prefix: '<i class="material-icons pr-2">badge</i>',
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
                    prefix: '<i class="material-icons pr-2">badge</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                    }),
                    new DynamicInputModel({
                    id: 'email1',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Adresse e-mail',
                    hint: 'Saisir une adresse e-mail valide',
                    prefix: '<i class="material-icons pr-2">alternate_email</i>',
                    validators: {
                        required: null
                    },
                    asyncValidators: {
                        // loginExists: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                    }),
                    new DynamicInputModel({
                        id: 'email2',
                        inputType: 'text',
                        value: '',
                        autoComplete: AUTOCOMPLETE_OFF,
                        updateOn: DynamicFormHook.Blur,
                        placeholder: 'Confirmer adresse e-mail',
                        hint: 'Confirmer votre adresse e-mail valide',
                        prefix: '<i class="material-icons pr-2">alternate_email</i>',
                        validators: {
                            required: null,
                            isEmailMatch: null
                        },
                        errorMessages: {
                            required: 'Champ obligatoire',
                            isEmailMatch: 'Les adresses e-mail ne correspondent pas'
                        }
                        }),
                    new DynamicInputModel({
                    id: 'pswd',
                    inputType: 'password',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Change,
                    placeholder: 'Mot de passe',
                    hint: 'Saisir votre mot de passe',
                    prefix: '<i class="material-icons pr-2">vpn_key</i>',
                    validators: {
                        required: null,
                        isStrongPswd: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire',
                        isStrongPswd: 'Mot de passe trop simple'
                    }
                    })
            ]
        })
    ],
    [
        new DynamicFormGroupModel({
            id: 'step1',
            group: [
                    new DynamicInputModel({
                    id: 'emailConfirmation',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Change,
                    placeholder: 'Code de confirmation',
                    hint: 'Saisir le code envoyé sur votre adresse e-mail',
                    prefix: '<i class="material-icons pr-2">vpn_key</i>',
                    validators: {
                        required: null
                    },
                    asyncValidators: {
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                    })
            ]
        })
    ],
    [
        new DynamicFormGroupModel({
            id: 'step2',
            group: [
                new DynamicFormGroupModel({
                    id: 'livraisonGroup',
                    group: [
                new DynamicInputModel({
                    id: 'adresseLivraison1',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Adresse',
                    hint: 'Saisir votre adresse',
                    prefix: '<i class="material-icons pr-2">house</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                }),
                new DynamicInputModel({
                    id: 'adresseLivraison2',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Adresse',
                    hint: 'Confirmer votre adresse',
                    prefix: '<i class="material-icons pr-2">house</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                }),
                new DynamicInputModel({
                    id: 'ville',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Ville',
                    hint: 'Saisir votre ville',
                    prefix: '<i class="material-icons pr-2">location_city</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                }),
                new DynamicInputModel({
                    id: 'codePostal',
                    inputType: 'number',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Code Postal',
                    hint: 'Saisir votre code postal',
                    prefix: '<i class="material-icons pr-2">location_on</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                }),
                new DynamicCheckboxModel({
                    id: 'sameAdresse',
                    label: 'L\'adresse de livraison est la même que l\'adresse de facturation',
                    value: true
                })
            ]
        }),
        new DynamicFormGroupModel({
            id: 'facturationGroup',
            hidden: true,
            disabled: true,
            group: [
                new DynamicInputModel({
                    id: 'adresseFacturation1',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Adresse',
                    hint: 'Confirmer votre adresse de facturation1',
                    prefix: '<i class="material-icons pr-2">house</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    },
                    hidden: true,
                    disabled: true,
                }),
                new DynamicInputModel({
                    id: 'adresseFacturation2',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Adresse de facturation',
                    hint: 'Confirmer votre adresse de facturation',
                    prefix: '<i class="material-icons pr-2">house</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    },
                    hidden: true,
                    disabled: true,
                }),
                new DynamicInputModel({
                    id: 'villeFacturation',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Ville',
                    hint: 'Saisir votre ville',
                    prefix: '<i class="material-icons pr-2">location_city</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    },
                    hidden: true,
                    disabled: true,
                }),
                new DynamicInputModel({
                    id: 'codePostalFacturation',
                    inputType: 'number',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Code Postal',
                    hint: 'Saisir votre code postal',
                    prefix: '<i class="material-icons pr-2">location_on</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    },
                    hidden: true,
                    disabled: true,
                })
            ]
            
            })
            ]
            
        })
    ],
    [
        new DynamicFormGroupModel({
            id: 'step3',
            group: [
                    new DynamicCheckboxModel({
                    id: 'conditions',
                    updateOn: DynamicFormHook.Blur,
                    label: 'accepter les conditions général',
                    validators: {
                        isChecked: null
                    },
                    errorMessages: {
                        isChecked: 'Champ obligatoire'
                    },
                    disabled: true
                })
            ]
        })
    ],
    [
        new DynamicFormGroupModel({
            id: 'step4',
            group: [
                new DynamicInputModel({
                    id: 'cardNumber',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'N° de carte de crédit',
                    hint: 'Saisir le numéro de carte de crédit',
                    prefix: '<i class="material-icons pr-2">credit_card</i>',
                    validators: {
                        required: null
                    },
                    asyncValidators: {
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                }),
                new DynamicInputModel({
                    id: 'cardName',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Nom inscrit sur la carte de crédit',
                    hint: 'Saisir le nom de carte de crédit',
                    prefix: '<i class="material-icons pr-2">credit_card</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                }),
                new DynamicInputModel({
                    id: 'cryptogramme',
                    inputType: 'text',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'cryptogramme',
                    hint: 'Saisir le cryptogramme',
                    prefix: '<i class="material-icons pr-2">credit_card</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                }),
                new DynamicInputModel({
                    id: 'dateValidation',
                    inputType: 'date',
                    value: '',
                    autoComplete: AUTOCOMPLETE_OFF,
                    updateOn: DynamicFormHook.Blur,
                    placeholder: 'Date de validité',
                    hint: 'Saisir la Date de validité',
                    prefix: '<i class="material-icons pr-2">credit_card</i>',
                    validators: {
                        required: null
                    },
                    errorMessages: {
                        required: 'Champ obligatoire'
                    }
                })
            ]
        })
    ]
]
