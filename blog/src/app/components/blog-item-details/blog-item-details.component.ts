import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { BlogAddCommentComponent } from '../blog-add-comment/blog-add-comment.component';
import { BlogCommentListComponent } from '../blog-comment-list/blog-comment-list.component';

@Component({
  selector: 'app-blog-item-details',
  standalone: true,
  imports: [HttpClientModule, CommonModule, BlogAddCommentComponent, BlogCommentListComponent],
  providers: [DataService, AuthService],
  templateUrl: './blog-item-details.component.html',
  styleUrl: './blog-item-details.component.scss'
})
export class BlogItemDetailsComponent implements OnInit {
  public image: string = '';
  public text: string = '';
  public title: string = '';
  public postId: string = '';

  @ViewChild(BlogCommentListComponent) commentList!: BlogCommentListComponent;

  constructor(private service: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: any) => { 
      this.postId = params.get('id');
      this.fetchPostDetails(this.postId);
    });
    
  }

  fetchPostDetails(id: string) {
    this.service.getById(id).subscribe((res: any) => {
      if (Array.isArray(res) && res.length > 0) {
        const post = res[0];
        this.image = post.image;
        this.text = post.text;
        this.title = post.title;
      } else {
        console.error('Unexpected response structure:', res);
      }
    }, (error) => {
      console.error('Error fetching post details:', error);
    });
  }

  refreshComments() {
    this.commentList.fetchComments();
  }
}
