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
  private async apiGet(id: string, query: any = {}): Promise<Character> {
    return await this.service
      .get(id, query)
      .then((result: any) => new Character(result.data));
  }

  private async apiGetAll(): Promise<Character[]> {
    return await this.service.find({
      $limit: 1000
    }).then((results: any) => {
      if (results.data && results.data.length > 0) {
        return results.data.map((item: any) => new Character(item));
      }
      return [];
    });
  }

}
