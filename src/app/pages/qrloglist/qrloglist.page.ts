import { QrofflinelogService } from './../../services/qrofflinelog.service';
import { Component, OnInit } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-qrloglist',
  templateUrl: './qrloglist.page.html',
  styleUrls: ['./qrloglist.page.scss'],
})
export class QrloglistPage implements OnInit {

  constructor(
    private qrofflinelogsvc: QrofflinelogService,
    private plt: Platform,
    private toastController: ToastController
    ) { }
  public items: any[] = [];
  public pagenumber: number;
  public pagesize: number;
  queryText = "";


  ngOnInit() {
    this.plt.ready().then(() => {
      this.pagesize = 25;
      this.pagenumber = 1;
      this.loadLogs(null);
    });
  }

  loadLogs(event) {
    if (event) {
      setTimeout(() => {
        this.qrofflinelogsvc.getItems().then(items => {
          if (!items) {
            this.items = [];
          } else {
            items = items.map(i => {
              let ts = new Date(i.txndatetime);
              return {...i, txndatetime: ts.toDateString() + '-' + ts.toLocaleTimeString()};
            });
            this.pagenumber += 1;
            const sorteditems = items.sort((a, b) =>
              a.timestamp < b.timestamp ? 1 : -1
            );
            this.items = this.items.concat(
              this.paginate(
                sorteditems,
                this.pagesize,
                this.pagenumber)
            );
          }
        });
        event.target.complete();
        if (this.items.length === 100000) {
          event.target.disabled = true;
        }
      }, 500);
    } else {
      this.qrofflinelogsvc.getItems().then(items => {
        console.log(items);
        if (!items) {
          this.items = [];
        } else {
          items = items.map(i => {
            let ts = new Date(i.txndatetime);
            return {...i, txndatetime: ts.toDateString() + '-' + ts.toLocaleTimeString()};
          });
          const sorteditems = items.sort((a, b) =>
            a.timestamp < b.timestamp ? 1 : -1
          );
          this.items = this.paginate(
            sorteditems,
            this.pagesize,
            this.pagenumber
          );
        }
      });
    }
  }


  private paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });

    toast.present();
  }

}
