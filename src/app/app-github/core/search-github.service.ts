
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import { map } from 'rxjs/operators';

import { GithubIssue } from './info-github';

@Injectable()

export class SearchGithubService {
  public loading = false;
  public initialised = false;
  public initialisedIssues = false;
  public totalItems = 0;
  public query = '';
  public repoName = '';
  public repositories;
  public infoGithub: GithubIssue;

  constructor(private http: HttpClient) { }

  public searchRepo(query: string): Observable<Object> {
    return this.http.get(`https://api.github.com/users/${query}/repos`);
  }

  public getIssue(username: string, repoName: string, numberIssue: string): Observable<GithubIssue> {
    return this.http.get<GithubIssue>(`https://api.github.com/repos/${username}/${repoName}/issues/${numberIssue}`);
  }

  public getGithubRepositories(queryTitle: string): void {
    this.query = queryTitle;
    this.loading = true;
    this.initialised = true;
    this.repositories = [];
    this.searchRepo(queryTitle)
      .pipe(
      map((data) => data))
      .do(_ => this.loading = false)
      .subscribe(data => {
        this.repositories = data;
      },
      error => {
        console.log('oops', error);
        this.loading = false;
      });
  }

}
