export interface Clients {
    _id?: any;
    userId?: string;
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    cards: CreditCard[];
  }

  export interface CreditCard {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
  }