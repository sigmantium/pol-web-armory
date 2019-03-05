// Core
import { Injectable } from '@angular/core';

// Models
import { Character } from '../models/character.model';

// Services
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  // Service-related variables
  private service: any;

  /**
   * Class Description Title
   * @class CharacterService
   * @classdesc Character service class
   * @param {any} apiService The api service
   */
  constructor(
    private apiService: ApiService
  ) {
    // Assign service to character service from back-end
    this.service = this.apiService.client.service('characterservice');

    // Get all data
    this.getAll();
  }

  /**
   * Public API
   * Calls the Internal API
   * @method CharacterService#get
   * @param {string} id Id of the character to get
   * @returns {Promise<Character>}
   */
  public get(id: string): Promise<Character> {
    return this.apiGet(id);
  }

  /**
   * Public API
   * Calls the Internal API
   * @method CharacterService#getAll
   * @returns {Promise<Character[]>}
   */
  public getAll(): Promise<Character[]> {
    return this.apiGetAll();
  }

  /**
   * Internal API
   * Communicates with the back-end to get a specific Character
   * @method CharacterService#apiGet
   * @param {string} id Id of the character to get
   * @param {any} query Additional query options to pass to back-end
   * @returns {Promise<Character>}
   */
  private async apiGet(id: string, query: any = {}): Promise<Character> {
    return await this.service
      .get(id, query)
      .then((result: any) => new Character(result.data));
  }

  /**
   * Internal API
   * Communicates with the back-end to get all characters
   * @method CharacterService#apiGetAll
   * @returns {Promise<Character[]>}
   */
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
