import { Component, OnInit } from '@angular/core';

import { AuthD } from '../auth/auth-d.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user!: AuthD | null;

  constructor(private authSrv: AuthService) {}

  ngOnInit(): void {
      this.authSrv.user$.subscribe((_user) => {
          this.user = _user;
      });
  }

}
