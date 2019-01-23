import { Injectable } from '@angular/core';

import { Armory } from '../models/armory.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ArmoryService {
  private armories: Promise<Armory[]>;
  private service: any;

  constructor(
    private apiService: ApiService
  ) {
    // Register armory service
    this.service = this.apiService.client.service('armory');

    this.getAll();
  }

  public getAll(): Promise<Armory[]> {
    console.log('This is triggered?');
    if (!this.armories) {
      this.armories = this.apiGetAll();
    }

    return this.armories;
  }

  private apiGetAll(): Promise<Armory[]> {
    console.log('Inside apiGetAll');
    return this.service.find({
      $sort: { id: -1 },
      $limit: 1000
    }).then((results) => {
      if (results && results.length > 0) {
        return results.map(item => new Armory(item));
      } else {
        console.log('Got nothing!');
      }
      return [];
    });
  }


}
