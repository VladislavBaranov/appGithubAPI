import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()

export class ListIssuesService {
  constructor(private http: HttpClient) { }
  getRepoIssues(userName: string, repoName: string, pageIndex: number, pageSize: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:${userName}/${repoName}+type:issue&page=${+pageIndex + 1}&per_page=${+pageSize}`;
    return this.http.get<GithubApi>(requestUrl);
  }
}

export interface GithubApi {
  items: GithubIssues[];
  total_count: number;
}

export interface GithubIssues {
  created_at: string;
  number: string;
  title: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}
