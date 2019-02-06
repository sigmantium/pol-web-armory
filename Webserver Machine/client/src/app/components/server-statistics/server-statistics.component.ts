import { Component, OnInit } from '@angular/core';

// Models
import { ServerStats } from '../../models/serverstats.model';

// Services
import { ServerStatsService } from '../../services/serverstats.service';

@Component({
  selector: 'app-server-statistics',
  templateUrl: './server-statistics.component.html',
  styleUrls: ['./server-statistics.component.css']
})
export class ServerStatisticsComponent implements OnInit {
  private serverStats: ServerStats;

  constructor(
    private serverStatsService: ServerStatsService
  ) { }

  async ngOnInit() {
    this.serverStats = await this.serverStatsService.get(1);
  }

}
