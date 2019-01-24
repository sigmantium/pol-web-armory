import { Injectable } from '@angular/core';

import { TestService } from '../models/testservice.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class TestserviceService {
  private testservices: Promise<TestService[]>;
  private service: any;

  constructor(
    private apiService: ApiService
  ) {
    // Register testservice service
    this.service = this.apiService.client.service('testservice');

    this.getAll();
  }

  /**
   * Public API
   */
  public get(id: string): Promise<TestService | boolean> {
    return this.apiGet(id);
  }

  public getAll(): Promise<TestService[]> {
    return this.apiGetAll();
  }

  /**
   * Internal API
   */
  private apiGet(id: string, query: any = {}): Promise<TestService> {
    return this.service.get(id, query);
  }

  private apiGetAll(): Promise<TestService[]> {
    return this.service.find({
      $sort: { id: -1 },
      $limit: 1000
    }).then((results) => {
      if (results && results.length > 0) {
        console.log('GETTING SOMETHING!');
        return results.map(item => new TestService(item));
      }

      return [];
    });
  }


}
