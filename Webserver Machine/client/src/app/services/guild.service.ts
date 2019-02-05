import { Injectable } from '@angular/core';

// Models
import { Guild } from '../models/guild.model';

// Services
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class GuildService {
  private guilds: Promise<Guild[]>;
  private service: any;

  constructor(
    private apiService: ApiService
  ) {
    this.service = this.apiService.client.service('guildservice');

    this.getAll();
  }

  /**
   * Public API
   */
  public get(id: number): Promise<Guild> {
    return this.apiGet(id);
  }

  public getAll(): Promise<Guild[]> {
    return this.apiGetAll();
  }

  /**
   * Internal API
   */
  private async apiGet(id: number, query: any = {}): Promise<Guild> {
    return await this.service
      .get(id, query)
      .then((result: any) => new Guild(result.data));
  }

  private async apiGetAll(): Promise<Guild[]> {
    return await this.service.find({
      $limit: 1000
    }).then((results: any) => {
      if (results.data && results.data.length > 0) {
        return results.data.map((item: any) => new Guild(item));
      }
      return [];
    });
  }

}
