import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = 'http://localhost:3100';

  constructor(private http: HttpClient) { }

  createComment(comment: any): Observable<any> {
    return this.http.post(this.url + '/api/post/comment/' + comment.postId, comment);
  }

  getCommentsByPostId(postId: string): Observable<any[]> {
    return this.http.get<any[]>(this.url + `/api/post/comments/${postId}`)
  }
}
