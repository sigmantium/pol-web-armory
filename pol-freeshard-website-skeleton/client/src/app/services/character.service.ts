import { Injectable } from '@angular/core';

// Models
import { Character } from '../models/character.model';

// Services
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private characters: Promise<Character[]>;
  private service: any;

  constructor(
    private apiService: ApiService
  ) {
    this.service = this.apiService.client.service('characterservice');

    this.getAll();
  }

  /**
   * Public API
   */
  public get(id: string): Promise<Character> {
    return this.apiGet(id);
  }

  public getAll(): Promise<Character[]> {
    return this.apiGetAll();
  }

  /**
   * Internal API
   */
  private apiGet(id: string, query: any = {}): Promise<Character> {
    return this.service
      .get(id, query)
      .then(result => new Character(result.data));
  }

  private apiGetAll(): Promise<Character[]> {
    return this.service.find({
      $limit: 1000
    }).then((results) => {
      console.log('Results: ' + JSON.stringify(results));
      if (results.data && results.data.length > 0) {
        return results.data.map(item => new Character(item));
      }
      return [];
    });
  }

}
