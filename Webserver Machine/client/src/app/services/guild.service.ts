// Core
import { Injectable } from '@angular/core';

// Models
import { Guild } from '../models/guild.model';

// Services
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class GuildService {
  // Service-related variables
  private service: any;

  /**
   * Class Description Title
   * @class GuildService
   * @classdesc Guild service class
   * @param {any} apiService The api service
   */
  constructor(
    private apiService: ApiService
  ) {
    // Assign service to guild service from back-end
    this.service = this.apiService.client.service('guildservice');

    // Get all data
    this.getAll();
  }

  /**
   * Public API
   * Calls the Internal API
   * @method GuildService#get
   * @param {string} id Id of the guild to get
   * @returns {Promise<Guild>}
   */
  public get(id: number): Promise<Guild> {
    return this.apiGet(id);
  }

  /**
   * Public API
   * Calls the Internal API
   * @method GuildService#getAll
   * @returns {Promise<Character[]>}
   */
  public getAll(): Promise<Guild[]> {
    return this.apiGetAll();
  }

  /**
   * Internal API
   * Communicates with the back-end to get a specific guild
   * @method GuildService#apiGet
   * @param {string} id Id of the guild to get
   * @param {any} query Additional query options to pass to back-end
   * @returns {Promise<Guild>}
   */
  private async apiGet(id: number, query: any = {}): Promise<Guild> {
    return await this.service
      .get(id, query)
      .then((result: any) => new Guild(result.data));
  }

  /**
   * Internal API
   * Communicates with the back-end to get all guilds
   * @method GuildServices#apiGetAll
   * @returns {Promise<Guild[]>}
   */
  private async apiGetAll(): Promise<Guild[]> {
    return await this.service.find({
      query: {
        $limit: 1000,
      }
    }).then((results: any) => {
      if (results.data && results.data.length > 0) {
        return results.data.map((item: any) => new Guild(item));
      }
      return [];
    });
  }

}
