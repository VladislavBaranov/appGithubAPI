import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ams-app-github',
  templateUrl: './app-github.component.html',
  styleUrls: ['./app-github.component.scss']
})
export class AppGithubComponent implements OnInit {

  examples = [
    { link: 'search', label: 'Search' }
  ];

  constructor() { }

  ngOnInit() { }
}
