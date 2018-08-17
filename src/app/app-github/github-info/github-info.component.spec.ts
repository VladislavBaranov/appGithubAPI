import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { GithubInfoComponent } from './github-info.component';
import { SearchGithubService } from '../core/search-github.service';
import { GithubIssue } from '../core/info-github';


describe('GithubInfoComponent', () => {
    let component: GithubInfoComponent;
    let fixture: ComponentFixture<GithubInfoComponent>;
    let searchGithubService: SearchGithubService;
    let spy: jasmine.Spy;
    let mockIssue: GithubIssue;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, RouterTestingModule, MatCardModule],
            declarations: [GithubInfoComponent],
            providers: [SearchGithubService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GithubInfoComponent);
        component = fixture.componentInstance;
        searchGithubService = fixture.debugElement.injector.get(SearchGithubService);
        mockIssue = {
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
        spy = spyOn(searchGithubService, 'getIssue').and.returnValue(Observable.of(mockIssue));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call searchGithubService', () => {
        component.getGithub('term', 'repo', 'number');
        expect(spy.calls.any()).toBeTruthy();
    });

    it('should set issue', () => {
        component.getGithub('term', 'repo', 'number');
        expect(component.issue).toEqual(mockIssue);
    });

});
