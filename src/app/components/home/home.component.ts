import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
  }

  tryLogout() {
    this.loginService.tryLogout()
    this.router.navigateByUrl('/')
  }

  getUsername(): String {
    return this.loginService.loggedInProfile?.username ?? "guest"
  }
}