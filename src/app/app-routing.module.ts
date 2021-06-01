import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingsComponent} from './settings/settings.component';
import {PostsComponent} from './posts/posts.component';
import {AccountComponent} from './modules/account/account.component';

// {path: 'account', component: AccountComponent, children: [
//   {path: 'overview', component: AccountOverviewComponent},
//   {path: 'settings', component: AccountSettingsComponent},
//   {path: 'security', component: AccountSecurityComponent},
//   {path: '', redirectTo: 'overview', pathMatch: 'full'}
// ]
// }

const routes: Routes = [
  // {path: 'threads', component: ThreadListComponent},
  // {path: 'thread/:id', component: ThreadComponent},
  // {path: 'thread/compose', component: ThreadComposeComponent},
  {path: 'thread', loadChildren: () => import('./modules/thread/thread.module').then(m => m.ThreadModule)},
  {path: 'account', loadChildren: () => import('./modules/account/account.module').then(m => m.AccountModule)},
  {path: 'user', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
  {path: 'settings', component: SettingsComponent},
  {path: 'posts', component: PostsComponent},

  {path: '**', redirectTo: 'thread', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
