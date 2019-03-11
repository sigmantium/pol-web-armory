// Core
import { Injectable } from '@angular/core';

// Models
import { Player } from '../models/player.model';

// Services
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // Service-related variables
  private service: any;

  /**
   * Class Description Title
   * @class PlayerService
   * @classdesc Player service class
   * @param {any} apiService The api service
   */
  constructor(
    private apiService: ApiService
  ) {
    // Assign service to player service from back-end
    this.service = this.apiService.client.service('playerservice');

    // Get all data
    this.getAll();
  }

  /**
   * Public API
   * Calls the Internal API
   * @method PlayerService#get
   * @param {string} id Id of the player to get
   * @returns {Promise<Player>}
   */
  public get(id: string): Promise<Player> {
    return this.apiGet(id);
  }

  /**
   * Public API
   * Calls the Internal API
   * @method PlayerService#getAll
   * @returns {Promise<Player[]>}
   */
  public getAll(): Promise<Player[]> {
    return this.apiGetAll();
  }

  /**
   * Internal API
   * Communicates with the back-end to get a specific Player
   * @method PlayerService#apiGet
   * @param {string} id Id of the player to get
   * @param {any} query Additional query options to pass to back-end
   * @returns {Promise<Player>}
   */
  private async apiGet(id: string, query: any = {}): Promise<Player> {
    return await this.service
      .get(id, query)
      .then((result: any) => new Player(result.data));
  }

  /**
   * Internal API
   * Communicates with the back-end to get all players
   * @method PlayerService#apiGetAll
   * @returns {Promise<Player[]>}
   */
  private async apiGetAll(): Promise<Player[]> {
    return await this.service.find({
      query: {
        $limit: 1000,
      }
    }).then((results: any) => {
      if (results.data && results.data.length > 0) {
        return results.data.map((item: any) => new Player(item));
      }
      return [];
    });
  }

}
