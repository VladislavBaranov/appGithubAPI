import { Component, AfterViewInit, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { ListIssuesService } from '../core/list-issues.service';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'ams-list-issues',
  templateUrl: './list-issues.component.html',
  styleUrls: ['./list-issues.component.scss']
})

export class ListIssuesComponent implements AfterViewInit, OnDestroy, AfterViewChecked {

  public term: string;
  public repo: string;
  displayedColumns = ['avatar', 'issue'];
  dataSource = new MatTableDataSource();

  resultsLength = 0;
  isLoadingResults = false;
  isRateLimitReached = false;
  pageIndex: number;
  pageSize = 10;
  validateChildRoute = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  navigationSubscription;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private exampleDatabase: ListIssuesService
  ) {
    this.route.params
      .subscribe(params => {
        if (params['term']) {
          this.term = params['term'];
          this.repo = params['repo'];
          this.pageIndex = params['pageindex'];
          this.pageSize = params['pagesize'];
        }
        if (params['pageindex'] || params['pagesize']) {
          this.validateChildRoute = true;
        }
      });
  }

  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

  ngAfterViewInit() {
      this.navigationSubscription = this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.visualiseListIssues();
        }
      });
      this.visualiseListIssues();
  }

  visualiseListIssues() {
    merge(this.paginator.page)
      .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        if (this.validateChildRoute) {
          this.paginator.pageIndex = this.pageIndex;
          this.validateChildRoute = false;
          return this.exampleDatabase.getRepoIssues(
            this.term, this.repo, this.pageIndex, this.pageSize);
        } else {
          return this.exampleDatabase.getRepoIssues(
            this.term, this.repo, this.paginator.pageIndex, this.paginator.pageSize);
        }
      }),
      map(data => {
        this.pageIndex = this.paginator.pageIndex;
        this.pageSize = this.paginator.pageSize;
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.total_count;
        return data.items;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        this.isRateLimitReached = true;
        return observableOf([]);
      })
      ).subscribe(data => this.dataSource.data = data);
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
