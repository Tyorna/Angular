import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  constructor(private servizio: PostService) {
    this.servizio.recupera().then((data) => {
      this.posts = data;
    })
  }

  ngOnInit(): void {
  }

}
