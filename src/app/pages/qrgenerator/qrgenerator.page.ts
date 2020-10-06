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
  qrData = 'TEST';
  elementType: 'url' | 'canvas' | 'img' = 'canvas';
  value = 'Techiediaries';

  constructor(
    private toastcontroller: ToastController,
    
  ) { }

  ngOnInit() {
  }

}
