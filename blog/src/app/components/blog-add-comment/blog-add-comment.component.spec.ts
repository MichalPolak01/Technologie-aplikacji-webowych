import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAddCommentComponent } from './blog-add-comment.component';

describe('BlogAddCommentComponent', () => {
  let component: BlogAddCommentComponent;
  let fixture: ComponentFixture<BlogAddCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogAddCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogAddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
