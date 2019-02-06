import { Injectable } from '@angular/core';

// Models
import { ServerStats } from '../models/serverstats.model';

// Services
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ServerStatsService {
  private service: any;

  constructor(
    private apiService: ApiService
  ) {
    this.service = this.apiService.client.service('serverstatsservice');

    this.getAll();
  }

  /**
   * Public API
   */
  public getAll(): Promise<ServerStats[]> {
    return this.apiGetAll();
  }

  /**
   * Internal API
   */
  private async apiGetAll(): Promise<ServerStats[]> {
    return await this.service.find({
      $limit: 1000
    }).then((results: any) => {
      if (results.data && results.data.length > 0) {
        return results.data.map((item: any) => new ServerStats(item));
      }
      return [];
    });
  }

}
