import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { GithubIssue } from '../core/info-github';
import { SearchGithubService } from '../core/search-github.service';

@Component({
  selector: 'ams-github-info',
  templateUrl: './github-info.component.html',
  styleUrls: ['./github-info.component.scss']
})

export class GithubInfoComponent implements OnInit {

  pageIndex: number;
  pageSize: number;
  term: string | number;
  repo: string | number;

  public issue: GithubIssue;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchGithubService: SearchGithubService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['number']) {
        this.pageIndex = params['pageindex'];
        this.pageSize = params['pagesize'];
        this.term = params['term'];
        this.repo = params['repo'];
        this.getGithub(params['term'], params['repo'], params['number']);
      }
    });
  }

  getGithub(githubName: string, githubRepo: string, number: string) {
    this.searchGithubService.getIssue(githubName, githubRepo, number)
      .subscribe(data => {
        this.issue = data;
      },
      error => {
        console.log('oops', error);
      });
  }

  navigateBack() {
    this.router.navigate(['./app-github/search/issues', {
      term: this.term,
      repo: this.repo,
      pageindex: this.pageIndex,
      pagesize: this.pageSize }]);
  }
}
