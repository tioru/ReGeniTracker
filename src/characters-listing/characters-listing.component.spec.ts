import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersListingComponent } from './characters-listing.component';

describe('CharactersListingComponent', () => {
  let component: CharactersListingComponent;
  let fixture: ComponentFixture<CharactersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
