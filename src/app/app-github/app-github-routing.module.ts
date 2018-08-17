import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AppGithubComponent } from './app-github/app-github.component';
import { ListIssuesComponent } from './list-issues/list-issues.component';
import { GithubInfoComponent } from './github-info/github-info.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: 'app-github',
    component: AppGithubComponent,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: SearchComponent,
        children: [
          {
          path: 'issues',
          component: ListIssuesComponent,
          canActivate: [],
          runGuardsAndResolvers: 'always',
          },
        ],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'issue/:term/:repo/:number',
        component: GithubInfoComponent
      },
      {
        path: '**',
        redirectTo: 'search'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppGithubRoutingModule { }
