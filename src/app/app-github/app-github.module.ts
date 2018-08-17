import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppGithubRoutingModule } from './app-github-routing.module';
import { AppGithubComponent } from './app-github/app-github.component';
import { ListIssuesComponent } from './list-issues/list-issues.component';
import { ListIssuesService } from './core/list-issues.service';
import { GithubInfoComponent } from './github-info/github-info.component';
import { SearchComponent } from './search/search.component';
import { SearchGithubService } from './core/search-github.service';
import { SharedModule } from '../shared';

@NgModule({
  imports: [
    AppGithubRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    AppGithubComponent,
    GithubInfoComponent,
    ListIssuesComponent,
    SearchComponent
  ],
  providers: [
    ListIssuesService,
    SearchGithubService
  ]
})

export class AppGithubModule {
  constructor() { }
}
