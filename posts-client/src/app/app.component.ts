import { Component } from '@angular/core';

import { Comment } from './comment';

@Component({
   selector: 'my-app',
   templateUrl: './app.component.html'
})

export class AppComponent  {

 constructor() {}

 handlecommentsFound(data: Comment[]): void {
      for (var i = 0; i < data.length; i++) {
         console.log(data[i].name);
      }
 }
}
