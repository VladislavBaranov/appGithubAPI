import { Component, OnInit, NgModule, EventEmitter, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

import { SearchGithubService } from '../core/search-github.service';

@Component({
  selector: 'ams-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit, OnDestroy {
  public term = '';
  public repo = '';
  private numberIssue = '';
  options: string[];
  formControl: FormControl;
  inputValidationRepo = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchGithubService: SearchGithubService
  ) { }

  ngOnInit() {

    if (this.route.firstChild) {
      this.route.firstChild.params.subscribe(params => {
        if (params['term']) {
          this.term = params['term'];
          this.onSubmit(this.term);
        }
      });
    }
    this.route.params
      .subscribe(params => {
        if (params['term']) {
          this.term = params['term'];
          this.onSubmit(this.term);
        }
      });
  }

  doSearch(query: string) {
    this.term = query;
    if (this.term) {
      this.router.navigate(['../search', { term: this.term }], { relativeTo: this.route });
    } else {
      this.router.navigate(['../search'], { relativeTo: this.route });
    }
  }

  onSubmit(query: string) {
    this.searchGithubService.repositories = [];
    this.searchGithubService.initialised = false;
    this.searchGithubService.initialisedIssues = false;
    this.formControl = new FormControl();
    this.searchGithubService.getGithubRepositories(query);
  }

  filterValues(inputValue) {
    this.options = this.searchGithubService.repositories.map(repo => repo.name).filter(repo => repo.toLowerCase().includes(inputValue));
  }

  doSearchIssues(option) {
    this.inputValidationRepo = false;
    this.repo = option;
    if (this.searchGithubService.repositories.map(repo => repo.name).includes(option)) {
      this.router.navigate(['../search/issues', { term: this.term, repo: option }], { relativeTo: this.route });
    } else {
      this.router.navigate(['../search', { term: this.term }], { relativeTo: this.route });
      this.inputValidationRepo = true;
    }
  }

  ngOnDestroy() {
    this.searchGithubService.repositories = [];
    this.searchGithubService.initialised = false;
    this.searchGithubService.initialisedIssues = false;
    this.repo = '';
  }
}
