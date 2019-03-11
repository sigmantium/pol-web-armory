// Core
import { Component, OnInit } from '@angular/core';

// Models
import { Guild } from '../../models/guild.model';

// Services
import { GuildService } from '../../services/guild.service';

// Angular Material
import { MatTableDataSource } from '@angular/material';

// Interface
export interface GuildElement {
  guildid: number;
  abbr: string;
  name: string;
  type: string;
  master: string;
  website: string;
  members: number;
  allies: number;
  enemies: number;
}

@Component({
  selector: 'app-guilds',
  templateUrl: './guilds.component.html',
  styleUrls: ['./guilds.component.css']
})
export class GuildsComponent implements OnInit {
  // Server-related variables
  private guilds: Guild[];

  // Table-related variables
  private data: GuildElement[];
  public dataSource: any;
  public columnHeaders: string[] = [
    'guildid',
    'abbr',
    'name',
    'type',
    'master',
    'members',
    'allies',
    'enemies',
    'website'
  ];

  /**
   * Class Description Title
   * @implements OnInit
   * @class GuildsComponent
   * @classdesc Guilds component class
   * @param {any} guildService The guild service
   */
  constructor(
    private guildService: GuildService
  ) { }

  /**
   * ngOnInit Description
   * Initiates and assigns all variables
   * Creates datasources for the table
   * @async
   * @method GuildsComponent#ngOnInit
   * @returns {Promise<void>}
   */
  async ngOnInit(): Promise<void> {
    // Get data from database
    this.guilds = await this.guildService.getAll();

    // Prepare data for table
    this.data = this.guilds;
    this.dataSource = new MatTableDataSource(this.data);
  }

}
