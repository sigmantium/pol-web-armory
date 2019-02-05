import { Injectable } from '@angular/core';

// Models
import { Player } from '../models/player.model';

// Services
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private service: any;

  constructor(
    private apiService: ApiService
  ) {
    this.service = this.apiService.client.service('playerservice');

    this.getAll();
  }

  /**
   * Public API
   */
  public get(id: string): Promise<Player> {
    return this.apiGet(id);
  }

  public getAll(): Promise<Player[]> {
    return this.apiGetAll();
  }

  /**
   * Internal API
   */
  private async apiGet(id: string, query: any = {}): Promise<Player> {
    return await this.service
      .get(id, query)
      .then((result: any) => new Player(result.data));
  }

  private async apiGetAll(): Promise<Player[]> {
    return await this.service.find({
      $limit: 1000
    }).then((results: any) => {
      if (results.data && results.data.length > 0) {
        return results.data.map((item: any) => new Player(item));
      }
      return [];
    });
  }

}
