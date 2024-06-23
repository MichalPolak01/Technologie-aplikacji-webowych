import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-blog-comment-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [CommentService],
  templateUrl: './blog-comment-list.component.html',
  styleUrl: './blog-comment-list.component.scss'
})
export class BlogCommentListComponent implements OnInit{
  @Input() postId: string = '';
  comments: any[] = [];

  constructor(private commentService: CommentService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments() {
    this.commentService.getCommentsByPostId(this.postId).subscribe((res: any) => {
      this.comments = res.sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    }, error => {
      console.error('Error fetching comments', error);
    });
  }
}
