import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'tcs-user-profile',
  templateUrl: 'profile.component.html'
})

export class ProfileComponent implements OnInit {

  user$: Observable<User>;

  constructor(private usersService: UsersService) {
    this.user$ = usersService.user;
  }

  ngOnInit() { }
}
