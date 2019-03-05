// Core
import { Injectable } from '@angular/core';

// Feathers
import feathers from '@feathersjs/client';

// REST
import rest from '@feathersjs/rest-client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Client and REST variables
  private rest: any;
  public client: any;

  /**
   * Class Description Title
   * @class ApiService
   * @classdesc API Service class
   */
  constructor() {
    // Create an instance of feathers attached to the client
    this.client = feathers();

    // REST for back-end communication
    this.rest = rest('http://localhost:3030');

    // Client configuration
    this.client.configure(this.rest.fetch(window.fetch));
  }
}
