// Core
import { Component, OnInit } from '@angular/core';

// Models
import { ServerStats } from '../../models/serverstats.model';

// Services
import { ServerStatsService } from '../../services/serverstats.service';

// Plugins
import { Chart } from 'chart.js';

@Component({
  selector: 'app-server-statistics',
  templateUrl: './server-statistics.component.html',
  styleUrls: ['./server-statistics.component.css']
})
export class ServerStatisticsComponent implements OnInit {
  // Chart-related variables
  private chart = [];

  // Service-related variables
  private recentServerStats: ServerStats;
  private serverStats: ServerStats[];

  /**
   * Class Description Title
   * @implements OnInit
   * @class ServerStatisticsComponent
   * @classdesc Server statistics component class
   * @param {any} serverStatsService The server statistics service
   */
  constructor(
    private serverStatsService: ServerStatsService
  ) { }

  /**
   * ngOnInit Description
   * Initiates and assigns all variables
   * Generates the chart for server statistics
   * @async
   * @method ServerStatisticsComponent#ngOnInit
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    // Get data from database
    this.serverStats = await this.serverStatsService.getAll();
    this.recentServerStats = this.serverStats[this.serverStats.length - 1];

    // Store datasets information into constants
    const pol = this.serverStats.map(obj => obj.polversion);
    const uptime = this.serverStats.map(obj => obj.uptime);
    const sysload = this.serverStats.map(obj => obj.serverload);
    const accounts = this.serverStats.map(obj => obj.accounts);
    const guilds = this.serverStats.map(obj => obj.guildcount);
    const itemcount = this.serverStats.map(obj => obj.itemcount);
    const mobilecount = this.serverStats.map(obj => obj.mobilecount);
    const onlinecount = this.serverStats.map(obj => obj.onlinecount);

    // Map and re-format date to use for the chart
    const dateInterval = this.serverStats.map(obj =>
      new Date(obj.uploaded).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })
    );

    // Generate the chart
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: dateInterval,
        datasets: [{
          data: pol,
          label: 'Pol',
          borderColor: '#fbae00',
          fill: false
        }, {
          data: uptime,
          label: 'Uptime',
          borderColor: '#da5353',
          fill: false
        }, {
          data: sysload,
          label: 'Load',
          borderColor: '#693f7b',
          fill: false
        }, {
          data: accounts,
          label: 'Accounts',
          borderColor: '#39589a',
          fill: false
        }, {
          data: guilds,
          label: 'Guilds',
          borderColor: '#338984',
          fill: false
        }, {
          data: itemcount,
          label: 'Items',
          borderColor: '#7b0000',
          fill: false
        }, {
          data: mobilecount,
          label: 'Mobiles',
          borderColor: '#405500',
          fill: false
        }, {
          data: onlinecount,
          label: 'Online',
          borderColor: '#c1a180',
          fill: false
        }
      ]
      },
      options: {
        legend: {
          display: true
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
            display: false
          }]
        }
      }
    });
  }

}
