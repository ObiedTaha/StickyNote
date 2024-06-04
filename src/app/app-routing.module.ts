import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', loadComponent: () => import('./layouts/blanklayout/blanklayout.component').then((m) => m.BlanklayoutComponent), children: [
      { path: '', redirectTo: 'note', pathMatch: 'full' },
      { path: 'sidebar', loadComponent: () => import('./components/sidebar/sidebar.component').then((m) => m.SidebarComponent), title: 'Side Bar' },
      { path: 'note', loadComponent: () => import('./components/notes/notes.component').then((m) => m.NotesComponent), title: 'Notes' },
    ]
  },
  {
    path: '', loadComponent: () => import('./layouts/authlayout/authlayout.component').then((m) => m.AuthlayoutComponent), children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full' },
      { path: 'signin', loadComponent: () => import('./components/signin/signin.component').then((m) => m.SigninComponent), title: 'Signin' },
      { path: 'signup', loadComponent: () => import('./components/signup/signup.component').then((m) => m.SignupComponent), title: 'Signup' },
    ]
  },

  { path: '**', loadComponent: () => import('./components/notfound/notfound.component').then((m) => m.NotfoundComponent), title: 'Not found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
