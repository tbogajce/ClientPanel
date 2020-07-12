import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        // Navigate to dashboard if we're logged in
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    this.authService
      .login(this.email, this.password)
      .then((res) => {
        this.flashMessage.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 4000,
        });
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger',
          timeout: 4000,
        });
      });
  }
}
