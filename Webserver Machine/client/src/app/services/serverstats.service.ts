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

    this.get(1);
  }

  /**
   * Public API
   */
  public get(id: number): Promise<ServerStats> {
    return this.apiGet(id);
  }

  /**
   * Internal API
   */
  private async apiGet(id: number, query: any = {}): Promise<ServerStats> {
    return await this.service
      .get(id, query)
      .then((result: any) => new ServerStats(result.data));
  }

}
