import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Profile } from '../../services/login.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  tryLogout() {
    this.loginService.tryLogout()
    this.router.navigateByUrl('/')
  }

  getProfiles(): Profile[] {
    return this.loginService.profiles
  }
}
