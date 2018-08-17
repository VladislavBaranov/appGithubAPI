
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { ListIssuesService, GithubApi } from './list-issues.service';

describe('ListIssuesService', () => {
    const userName = 'userName';
    const repoName = 'repoName';
    const page = 1;
    const pageSize = 2;
    const listIssues: GithubApi = {
        items: [
            {
                created_at: '2014-01-21T18:00:29Z',
                number: '1',
                title: 'Optimise_Images',
                user: {
                    login: 'ghost',
                    avatar_url: 'https://avatars3.githubusercontent.com/u/10137?v=4',
                    html_url: 'https://github.com/ghost',
                }
            }
        ],
        total_count: 1
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ListIssuesService]
        });
    });

    it('should get list issues of repository', () => {
        const listIssuesService = TestBed.get(ListIssuesService);
        const http = TestBed.get(HttpTestingController);
        let profileResponse;

        listIssuesService.getRepoIssues(userName, repoName, page, pageSize).subscribe((response) => {
            profileResponse = response;
        });

        http.expectOne('https://api.github.com/search/issues?q=repo:userName/repoName+type:issue&page=2&per_page=2').flush(listIssues);
        expect(profileResponse).toEqual(listIssues);
    });

});
