import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatCardModule, MatTableModule } from '@angular/material';
import { MatAutocompleteModule, MatInputModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SearchComponent } from './search.component';
import { SearchGithubService } from '../core/search-github.service';
import { GithubIssue } from '../core/info-github';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let searchGithubService: SearchGithubService;
    let spy: jasmine.Spy;
    const listIssues: GithubIssue = {
        created_at: '2014-01-21T18:00:29Z',
        number: '1',
        title: 'Optimise_Images',
        user: {
            login: 'ghost',
            avatar_url: 'https://avatars3.githubusercontent.com/u/10137?v=4',
            html_url: 'https://github.com/ghost',
        },
        body: 'Hello! It is an automatic GitHub image optimizer. Your repository cointains some images'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientModule,
                RouterTestingModule,
                MatCardModule,
                MatInputModule,
                MatFormFieldModule,
                MatAutocompleteModule,
                FormsModule,
                ReactiveFormsModule,
            ],
            declarations: [SearchComponent],
            providers: [SearchGithubService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        searchGithubService = fixture.debugElement.injector.get(SearchGithubService);
        spy = spyOn(searchGithubService, 'getGithubRepositories').and.returnValue(Observable.of(listIssues));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call SearchGithubService', () => {
        component.onSubmit('repo');
        expect(spy.calls.any()).toBeTruthy();
    });

});
