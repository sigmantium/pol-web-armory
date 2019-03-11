// Core
import { Injectable } from '@angular/core';

// Models
import { ServerStats } from '../models/serverstats.model';

// Services
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ServerStatsService {
  // Service-related variables
  private service: any;

  /**
   * Class Description Title
   * @class ServerStatsService
   * @classdesc Server statistics service class
   * @param {any} apiService The api service
   */
  constructor(
    private apiService: ApiService
  ) {
    // Assign service to server statistics service from back-end
    this.service = this.apiService.client.service('serverstatsservice');

    // Get all data
    this.getAll();
  }

  /**
   * Public API
   * Calls the Internal API
   * @method ServerStatsService#getOne
   * @returns {Promise<ServerStats[]>}
   */
  public getOne(): Promise<ServerStats[]> {
    return this.apiGetOne();
  }

  /**
   * Public API
   * Calls the Internal API
   * @method ServerStatsService#getAll
   * @returns {Promise<ServerStats[]>}
   */
  public getAll(): Promise<ServerStats[]> {
    return this.apiGetAll();
  }

  /**
   * Internal API
   * Communicates with the back-end to get the latest server statistics record
   * @method ServerStatsService#apiGetOne
   * @returns {Promise<ServerStats[]>}
   */
  private async apiGetOne(): Promise<ServerStats[]> {
    return await this.service.find({
      query: {
        $limit: 1,
        $sort: {
          uploaded: 1
        }
      }
    }).then((results: any) => {
      if (results.data && results.data.length > 0) {
        return results.data.map((item: any) => new ServerStats(item));
      }
      return [];
    });
  }

  /**
   * Internal API
   * Communicates with the back-end to get all server statistics
   * @method ServerStatsService#apiGetAll
   * @returns {Promise<ServerStats[]>}
   */
  private async apiGetAll(): Promise<ServerStats[]> {
    return await this.service.find({
      query: {
        $limit: 1000,
        $sort: {
          uploaded: 1
        }
      }
    }).then((results: any) => {
      if (results.data && results.data.length > 0) {
        return results.data.map((item: any) => new ServerStats(item));
      }
      return [];
    });
  }

}
