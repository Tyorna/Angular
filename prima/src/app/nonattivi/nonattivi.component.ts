import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-nonattivi',
  templateUrl: './nonattivi.component.html',
  styleUrls: ['./nonattivi.component.scss']
})

export class NonattiviComponent implements OnInit {
    posts: Post[] = [];
    constructor(private servizio: PostService) {
      this.servizio.recupera().then((data) => {
        this.posts = data;
   })
  }

  ngOnInit(): void {
  }


}
