
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { SearchGithubService } from './search-github.service';
import { GithubIssue } from './info-github';

describe('SearchGithubService', () => {
    const userName = 'userName';
    const repoName = 'repoName';
    const numberIssue = 1;
    const listRepo = [
        { name: 'additional_4' },
        { name: 'additional_5' },
        { name: 'additional_6' }
    ];
    const listIssues: GithubIssue = {
        created_at: '2014-01-21T18:00:29Z',
        number: '1',
        title: 'Optimise_Images',
        user: {
            login: 'ghost',
            avatar_url: 'https://avatars3.githubusercontent.com/u/10137?v=4',
            html_url: 'https://github.com/ghost',
        },
        body: 'Hello! It is an automatic GitHub image optimizer](https://github.com/somu/picabot).Your repository cointains some images'
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SearchGithubService]
        });
    });

    it('should get list of repository', () => {
        const searchGithubService = TestBed.get(SearchGithubService);
        const http = TestBed.get(HttpTestingController);
        let profileResponse;

        searchGithubService.searchRepo(userName).subscribe((response) => {
            profileResponse = response;
        });

        http.expectOne('https://api.github.com/users/userName/repos').flush(listRepo);
        expect(profileResponse).toEqual(listRepo);
    });

    it('should get list of issues', () => {
        const searchGithubService = TestBed.get(SearchGithubService);
        const http = TestBed.get(HttpTestingController);
        let profileResponse;

        searchGithubService.getIssue(userName, repoName, numberIssue).subscribe((response) => {
            profileResponse = response;
        });

        http.expectOne('https://api.github.com/repos/userName/repoName/issues/1').flush(listIssues);
        expect(profileResponse).toEqual(listIssues);
    });
});
