import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZonesComponent } from './components/zones/zones.component';

const routes: Routes = [
  { path: 'zones', component: ZonesComponent },
  { path: '**', redirectTo: 'zones', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
