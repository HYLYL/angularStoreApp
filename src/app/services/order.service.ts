import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orders } from '../store/data/orders';
import { Clients } from '../store/data/clients';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = 'http://localhost:3000/orders';
  urlClients = 'http://localhost:3000/clients';
  stripe: Stripe | null = null;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Orders[]> {
    return this.http.get<Orders[]>(this.url);
  }

  get(id: number): Observable<Orders> {
    const url = `${this.url}/${id}`;
    return this.http.get<Orders>(url);
  }

  add(order: Orders): Observable<Orders> {
    return this.http.post<Orders>(this.url, order);
  }

  update(order: Orders): Observable<Orders> {
    const url = `${this.url}/${order._id}`;
    return this.http.patch<Orders>(url, order);
  }

  delete(id: number): Observable<Orders> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Orders>(url);
  }

  getAllClients(): Observable<Clients[]> {
    return this.http.get<Clients[]>(this.urlClients);
  }

  getClient(id: number): Observable<Clients> {
    const url = `${this.urlClients}/${id}`;
    return this.http.get<Clients>(url);
  }

  setClient(client: Clients) {
    console.log(client);
    console.log(`setClient - order service : ${client}`);
    // const url = `${this.urlClients}?_id=${client._id}`;
    const url = `${this.urlClients}`;

    // Get all clients
  this.getAllClients().subscribe(clients => {
    // Check if the user id of the client passed in matches any of the user ids from the getAllClients method
    const matchingClient = clients.find(c => c.userId === client.userId);
    if (matchingClient) {
      console.log(matchingClient);
      // Update the matching client with the new client data
      return this.http.patch<Clients>(`${this.urlClients}/${matchingClient._id}`, client).subscribe(updatedClient => {
        console.log(updatedClient);
      });
    } else {
      // Add the new client data as a new client
      return this.http.post<Clients>(url, client).subscribe(newClient => {
        console.log(newClient);
      });
    }
  });
  }

  
  async initializeStripe() {
    const token = 'pk_test_51N9SNeLI8bYKSCoteOmAWIGWlFOPMrjaOW0XjbvcoLCJHZz7r5a6RIoykEpQuHTzIrD2DROrTwo5cEC0tfc5D82H00gzb58YFi';
    const stripePromise = loadStripe(token);
    return stripePromise.then((stripe) => {
      this.stripe = stripe;
    });
  }
  
  async processPayment() {
    
    if (!this.stripe) {
      console.error('Stripe is not initialized');
      return;
    }
  
    const { error } = await this.stripe.redirectToCheckout({
      lineItems: [{ price: '', quantity: 1 }],
      mode: 'payment',
      successUrl: 'https://example.com/success',
      cancelUrl: 'https://example.com/cancel',
    });
  
    if (error) {
      console.error(error);
    }
  }


  
}