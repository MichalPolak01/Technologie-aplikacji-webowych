import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
// import jwt_decode from 'jwt_decode';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-blog-add-comment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [CommentService, AuthService],
  templateUrl: './blog-add-comment.component.html',
  styleUrl: './blog-add-comment.component.scss'
})
export class BlogAddCommentComponent implements OnInit {
  @Input() postId: string = '';
  @Output() commentAdded = new EventEmitter<void>();
  commentForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.formBuilder.group({
      text: ['', Validators.required],
    });
  }
  ngOnInit(): void {  }

  onSubmit() {
    if (this.commentForm.valid) {
      const token = localStorage.getItem('token');
      if (token) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        const userId = decodedToken.userId;
      
        const comment = { ...this.commentForm.value, userId, postId: this.postId };
        this.commentService.createComment(comment).subscribe(response => {
          this.commentForm.reset();
          this.commentAdded.emit();
        }, error => {
          console.error('Error creating comment', error);
        });
      } else {
        console.error('No token found!');
      }
    }
  }
}
