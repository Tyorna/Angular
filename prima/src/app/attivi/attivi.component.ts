import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-attivi',
  templateUrl: './attivi.component.html',
  styleUrls: ['./attivi.component.scss']
})
export class AttiviComponent implements OnInit {
  posts: Post[] = [];
  constructor(private servizio: PostService) {
    this.servizio.recupera().then((data) => {
      this.posts = data;
    })
   }

  ngOnInit(): void {
  }


}
