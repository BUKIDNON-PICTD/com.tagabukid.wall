import { Component, OnInit } from '@angular/core';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { CoviddataService } from 'src/app/services/coviddata.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.page.html',
  styleUrls: ['./cases.page.scss'],
})
export class CasesPage implements OnInit {

  constructor(
    private coviddatasvc: CoviddataService,
    private plt: Platform,
    private alertController: AlertController,
    private toastController: ToastController
    ) { }
  public cases: any[] = [];
  public pagenumber: number;
  public pagesize: number;
  queryText = "";


  ngOnInit() {
    this.plt.ready().then(() => {
      this.pagesize = 25;
      this.pagenumber = 1;
      this.loadCases(null);
    });
  }

  loadCases(event) {
    this.queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, " ");
    const queryWords = this.queryText.split(" ").filter(w => !!w.trim().length);
    if (event) {
      setTimeout(() => {
        this.coviddatasvc.getCases().then(items => {
          if (!items) {
            this.cases = [];
          } else {
            this.pagenumber += 1;
            items.forEach( item => {
              this.filterCases( item, queryWords);
            });
            items = items.filter(i => i.hide === false);
            // const sorteditems = items.sort((a, b) =>
            //   a.properties['address_muncity'] > a.properties['address_muncity'] ? 1 : -1
            // );
            this.cases = this.cases.concat(
              this.paginate(items, this.pagesize, this.pagenumber)
            );
          }
        });
        event.target.complete();
        if (this.cases.length === 100000) {
          event.target.disabled = true;
        }
      }, 500);
    } else {
      this.coviddatasvc.getCases().then(items => {
        if (!items) {
          this.cases = [];
        } else {
          items.forEach(item => {
            this.filterCases(item, queryWords);
          });
          items = items.filter(i => i.hide === false);
          // const sorteditems = items.sort((a, b) =>
          //   a.properties['address_muncity'] > a.properties['address_muncity'] ? 1 : -1
          // );
          this.cases = this.paginate(
            items,
            this.pagesize,
            this.pagenumber
          );
        }
      });
    }
  }

  
  filterCases(item: any, queryWords: string[]) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the session name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (item.properties['address_muncity'].name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the sessions tracks are not in the
    // exclude tracks then this session passes the track test
    // let matchesTracks = false;
    // farmer.tracks.forEach((trackName: string) => {
    //   if (excludeTracks.indexOf(trackName) === -1) {
    //     matchesTracks = true;
    //   }
    // });

    // if the segment is 'favorites', but session is not a user favorite
    // then this session does not pass the segment test
    // let matchesSegment = false;
    // if (segment === 'favorites') {
    //   if (this.user.hasFavorite(session.name)) {
    //     matchesSegment = true;
    //   }
    // } else {
    //   matchesSegment = true;
    // }

    // all tests must be true if it should not be hidden
    item.hide = !matchesQueryText;
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
