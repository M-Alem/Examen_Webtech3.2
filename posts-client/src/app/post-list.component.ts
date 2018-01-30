import { Component, Output, EventEmitter } from '@angular/core';

@Component({
   selector: 'post-list',
   templateUrl: './post-list.component.html'
})

export class PostListComponent  {

   @Output() commentsFound = new EventEmitter();

   constructor(private postService: PostService) {}

   ngOnInit(): void {}

   getComments(index: number): void {}

   printComments(comments: Comment[]): void {}
}
