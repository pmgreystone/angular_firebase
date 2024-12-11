import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const loginService: LoginService = inject(LoginService)
  const router: Router = inject(Router)
  const profile = loginService.loggedInProfile
  const result = profile != null && loginService.isAdmin().valueOf()
  if (!result) router.navigateByUrl('/')
  return result
};
