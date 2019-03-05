// Core
import { Component, OnInit } from '@angular/core';

// Router
import { ActivatedRoute, Router } from '@angular/router';

// JSON
// import WikiPage from '../wiki.json';

@Component({
  selector: 'app-wiki-detail',
  templateUrl: './wiki-detail.component.html',
  styleUrls: ['./wiki-detail.component.css']
})
export class WikiDetailComponent implements OnInit {
  private id: number;
  private wikiPage: Object;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);

    // console.log('Wikipage: ' + WikiPage);

    this.wikiPage = {
      'title': 'Alchemy',
      'description': 'Description for alchemy',
      'training': 'Do this and this...'
    };

    if (!this.wikiPage) {
      this.router.navigate(['/not-found']);
    }
  }

}
