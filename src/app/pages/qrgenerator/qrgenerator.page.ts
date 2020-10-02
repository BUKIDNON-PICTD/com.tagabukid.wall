import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-qrgenerator',
  templateUrl: './qrgenerator.page.html',
  styleUrls: ['./qrgenerator.page.scss'],
})
export class QrgeneratorPage implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private platform: Platform,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

}
