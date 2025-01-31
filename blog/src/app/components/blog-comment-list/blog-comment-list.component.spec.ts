import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCommentListComponent } from './blog-comment-list.component';

describe('BlogCommentListComponent', () => {
  let component: BlogCommentListComponent;
  let fixture: ComponentFixture<BlogCommentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogCommentListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlogCommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
