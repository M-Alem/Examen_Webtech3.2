import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '@angular/http';

@Injectable()
export class PostService {

   constructor(private http: HttpClient) {}

   // get all posts
   getAllPosts(): Observable<Post[]> {}

   // get comments based on the index
   getCommentsForPost(index: number): Observable<Comment[]> {}
}
