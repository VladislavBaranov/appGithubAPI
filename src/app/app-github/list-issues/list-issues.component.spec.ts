import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule, MatCardModule, MatTableModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ListIssuesComponent } from './list-issues.component';
import { ListIssuesService } from '../core/list-issues.service';
import { GithubIssue } from '../core/info-github';

describe('ListIssuesComponent', () => {
    let component: ListIssuesComponent;
    let fixture: ComponentFixture<ListIssuesComponent>;
    let listIssuesService: ListIssuesService;
    let spy: jasmine.Spy;
    let mockListIssue;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                BrowserAnimationsModule,
                HttpClientModule,
                RouterTestingModule,
                MatCardModule,
                MatPaginatorModule,
                MatTableModule
            ],
            declarations: [ListIssuesComponent],
            providers: [ListIssuesService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListIssuesComponent);
        component = fixture.componentInstance;
        listIssuesService = fixture.debugElement.injector.get(ListIssuesService);

        mockListIssue = {
            items: [
                {
                    created_at: '2014-01-21T18:00:29Z',
                    number: '1',
                    title: 'Optimise_Images',
                    user: {
                        login: 'ghost',
                        avatar_url: 'https://avatars3.githubusercontent.com/u/10137?v=4',
                        html_url: 'https://github.com/ghost',
                    },
                    body: 'Hello! It is an automatic GitHub image optimizer'
                }
            ],
            total_count: 1
        };

        spy = spyOn(listIssuesService, 'getRepoIssues').and.returnValue(Observable.of(mockListIssue));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call ListIssuesService', () => {
        component.visualiseListIssues();
        expect(spy.calls.any()).toBeTruthy();
    });

    it('should set dataSource.data', () => {
        component.visualiseListIssues();
        expect(component.dataSource.data).toEqual(mockListIssue.items);
    });

    it('should render cell with title of issue', () => {
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('strong').textContent)
            .toContain('Optimise_Image');
    });

});
