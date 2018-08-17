import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatCardModule, MatTableModule } from '@angular/material';
import { FeaturesComponent } from './features.component';

describe('FeaturesComponent', () => {
  let component: FeaturesComponent;
  let fixture: ComponentFixture<FeaturesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [MatCardModule, MatIconModule],
        declarations: [FeaturesComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
