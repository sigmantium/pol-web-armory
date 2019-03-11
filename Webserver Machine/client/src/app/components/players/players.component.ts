// Core
import { Component, OnInit } from '@angular/core';

// Models
import { Player } from '../../models/player.model';
import { ServerStats } from '../../models/serverstats.model';

// Services
import { PlayerService } from '../../services/player.service';
import { ServerStatsService } from '../../services/serverstats.service';

// Angular Material
import { MatTableDataSource } from '@angular/material';

// Plugins
import { Chart } from 'chart.js';

// Interface
export interface PlayerElement {
  name: string;
  gender: string;
  race: string;
  title_guild: string;
  title_prefix: string;
  title_suffix: string;
  title_race: string;
  guild: string;
  murderer: string;
}

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})

export class PlayersComponent implements OnInit {
  // Chart-related variables
  private chart = [];

  // Service-related variables
  private players: Player[];
  private serverStats: ServerStats[];

  // Table-related variables
  private data: PlayerElement[];
  public dataSource: any;
  public columnHeaders: string[] = [
    'name',
    'gender',
    'race',
    'title_guild',
    'title_prefix',
    'title_suffix',
    'title_race',
    'murderer'
  ];

  /**
   * Class Description Title
   * @implements OnInit
   * @class PlayersComponent
   * @classdesc Players component class
   * @param {any} playerService The player service
   * @param {any} serverStatsService The server statistics service
   */
  constructor(
    private playerService: PlayerService,
    private serverStatsService: ServerStatsService
  ) { }

  /**
   * ngOnInit Description
   * Initiates and assigns all variables
   * Creates datasources for the table
   * Generates the chart for players online activity
   * @async
   * @method PlayersComponent#ngOnInit
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    // Get data from database
    this.players = await this.playerService.getAll();
    this.serverStats = await this.serverStatsService.getAll();

    // Map and re-format date
    const onlineCount =  this.serverStats.map(obj => obj.onlinecount);
    const dateInterval = this.serverStats.map(obj =>
      new Date(obj.uploaded).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
    );

    // Prepare data for table
    this.data = this.players;
    this.dataSource = new MatTableDataSource(this.data);

    // Generate the chart
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: dateInterval,
        datasets: [
          {
            label: 'Online Count',
            data: onlineCount
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        elements: {
          line: {
              tension: 0, // disables bezier curves
            }
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              beginAtZero: true,
                 userCallback: (label: any) => {
                     if (Math.floor(label) === label) {
                       return label;
                     }
                 },
            }
          }]
        }
      }
    });
  }
}
