import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'maps',
    loadChildren: () => import('./pages/maps/maps.module').then( m => m.MapsPageModule)
  },
  {
    path: 'advisories',
    loadChildren: () => import('./pages/advisories/advisories.module').then( m => m.AdvisoriesPageModule)
  },
  {
    path: 'cases',
    loadChildren: () => import('./pages/cases/cases.module').then( m => m.CasesPageModule)
  },
  {
    path: 'muncitydashboard',
    loadChildren: () => import('./pages/muncitydashboard/muncitydashboard.module').then( m => m.MuncitydashboardPageModule)
  },
  {
    path: 'mapportal',
    loadChildren: () => import('./pages/mapportal/mapportal.module').then( m => m.MapportalPageModule)
  },
  {
    path: 'qrgenerator',
    loadChildren: () => import('./pages/qrgenerator/qrgenerator.module').then( m => m.QrgeneratorPageModule)
  },
  {
    path: 'scanqr',
    loadChildren: () => import('./pages/scanqr/scanqr.module').then( m => m.ScanqrPageModule)
  },
  {
    path: 'tracking',
    loadChildren: () => import('./pages/tracking/tracking.module').then( m => m.TrackingPageModule)
  },
  {
    path: 'qrprofilelist',
    loadChildren: () => import('./pages/qrprofilelist/qrprofilelist.module').then( m => m.QrprofilelistPageModule)
  },
  {
    path: 'qrprofile',
    loadChildren: () => import('./pages/qrprofile/qrprofile.module').then( m => m.QrprofilePageModule)
  },
  {
    path: 'qrprofile/:objid',
    loadChildren: () => import('./pages/qrprofile/qrprofile.module').then( m => m.QrprofilePageModule)
  },
  {
    path: 'qrprofiledetail',
    loadChildren: () => import('./pages/qrprofiledetail/qrprofiledetail.module').then( m => m.QrprofiledetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
