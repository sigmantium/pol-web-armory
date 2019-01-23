import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import feathers from '@feathersjs/client';

import rest from '@feathersjs/rest-client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private rest;
  public client;

  constructor() {

    this.client = feathers();

    this.rest = rest('http://localhost:3030');
    this.client.configure(this.rest.fetch(window.fetch));

  }
}
