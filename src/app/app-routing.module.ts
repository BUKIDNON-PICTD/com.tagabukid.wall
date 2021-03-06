import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'dashboard/:mode',
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
    path: 'scanqr',
    loadChildren: () => import('./pages/scanqr/scanqr.module').then( m => m.ScanqrPageModule)
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
  },
  {
    path: 'qrloglist',
    loadChildren: () => import('./pages/qrloglist/qrloglist.module').then( m => m.QrloglistPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'reportlist',
    loadChildren: () => import('./reports/reportlist/reportlist.module').then( m => m.ReportlistPageModule)
  },
  {
    path: 'prevac',
    loadChildren: () => import('./pages/prevac/prevac.module').then( m => m.PrevacPageModule)
  }

  // {
  //   path: 'vaccinesurvey',
  //   loadChildren: () => import('./pages/vaccinesurvey/vaccinesurvey.module').then( m => m.VaccinesurveyPageModule)
  // },
  // {
  //   path: 'vaccinesurveydashboard',
  //   loadChildren: () => import('./pages/vaccinesurveydashboard/vaccinesurveydashboard.module').then( m => m.VaccinesurveydashboardPageModule)
  // }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
