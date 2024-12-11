import { Routes } from '@angular/router';

import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { adminAuthGuard } from './guards/admin-auth.guard';
import { homeAuthGuard } from './guards/home-auth.guard';

/*
import { FeedComponent } from './components/home/feed/feed.component';
import { ReelComponent } from './components/home/reel/reel.component';
import { SearchComponent } from './components/home/search/search.component';

const homeRoutes: Routes = [
    { path: 'feed', component: FeedComponent },
    { path: 'reel', component: ReelComponent },
    { path: 'search', component: SearchComponent }
];
*/
export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [adminAuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, /*children: homeRoutes,*/ canActivate: [homeAuthGuard], canActivateChild: [homeAuthGuard] },
    { path: '**', component: PageNotFoundComponent },
    // { path: 'home', component: HomeComponent, children: homeRoutes, canActivate: [homeAuthGuard], canActivateChild: [homeAuthGuard] },
];
