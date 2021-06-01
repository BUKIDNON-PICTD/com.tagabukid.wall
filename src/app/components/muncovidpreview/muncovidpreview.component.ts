import { MapService } from "./../../services/map.service";
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2
} from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { ZoomSlider } from "ol/control";
import { Vector as VectorSource, XYZ } from "ol/source";
import { Fill, Stroke, Style, Text } from "ol/style";
import Projection from "ol/proj/Projection";
import GeoJSON from "ol/format/GeoJSON";
import { CoviddataService } from 'src/app/services/coviddata.service';

@Component({
  selector: 'app-muncovidpreview',
  templateUrl: './muncovidpreview.component.html',
  styleUrls: ['./muncovidpreview.component.scss'],
})
export class MuncovidpreviewComponent implements OnInit {
  map: Map;
  raster: TileLayer;
  source: VectorSource;
  vector: VectorLayer;
  muncitysource: VectorSource;
  muncityvector: VectorLayer;
  projection: Projection;
  basemap: TileLayer;
  maploaded: boolean;

  divmapid: any;

  constructor(
    private mapservice: MapService,
    private coviddatasvc: CoviddataService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {

  }

  ngAfterViewInit() {
    setTimeout(_ => this.initMap(), 2000);
  }

  create_UUID() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  ngOnInit() {
    let divmap = this.renderer.createElement('div');
    this.renderer.addClass(divmap, 'map');
    this.divmapid = "COVIDMAP" + this.create_UUID();
    this.renderer.setAttribute(divmap, 'id', this.divmapid);
    this.renderer.appendChild(this.el.nativeElement, divmap);


    var muncitylabelStyle = new Style({
      text: new Text({
        font: "12px Calibri,sans-serif",
        overflow: true,
        fill: new Fill({
          color: "#fff",
        }),
        stroke: new Stroke({
          color: "#000",
          width: 3,
        }),
      }),
    });
    var muncitystylefill = new Style({
      fill: new Fill({
        color: "rgba(255, 0, 0)",
      }),
      stroke: new Stroke({
        color: "#fcf403",
        width: 1,
      }),
    });

    var muncitystylefillgreen = new Style({
      fill: new Fill({
        color: "rgba(0, 255, 0)",
      }),
      stroke: new Stroke({
        color: "#fcf403",
        width: 1,
      }),
    });
    var muncitystyle = [muncitystylefill, muncitylabelStyle];
    var muncitystylegreen = [muncitystylefillgreen, muncitylabelStyle];

    //base map
    this.basemap = new TileLayer({
      source: new XYZ({
        maxZoom: 17,
        attributions: "Google Hybrid",
        url: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
      }),
    });

    //muncity map
    this.muncitysource = new VectorSource({
      format: new GeoJSON(),
    });

    this.muncityvector = new VectorLayer({
      declutter: true,
      source: this.muncitysource,
    });

    // add barangay boundaries
    this.mapservice.MunicipalBdry().then(async (feature) => {
      await this.coviddatasvc.bukidnoncovid19_view_by_municipality_summary().then((items) => {
        items.map((a) => a.address_muncity).forEach((muncity) => {
          feature["features"] = feature["features"].map((fa) => {
            
            if (fa.properties["mun_city"].toUpperCase() === muncity.toUpperCase()) {
              let muncityfeature = items.find(
                (ma) => ma.address_muncity === muncity
              );
              fa.properties["totalactive"] = muncityfeature.totalactive;
              return fa;
            } else {
              return fa;
            }
          });
        });
      });
      await this.muncitysource.addFeatures(new GeoJSON().readFeatures(feature));
      await this.muncityvector.setStyle((feature, resolution) => {
        muncitylabelStyle
          .getText()
          .setText(
            feature.get("mun_city") + " - " + feature.get("totalactive")
          );
        
        if (feature.get("totalactive") === "0") {
          return muncitystylegreen;
        }
        return muncitystyle;
      });
    });
  }

  initMap() {
    //draw map
    this.map = new Map({
      layers: [this.basemap, this.muncityvector],
      target: this.divmapid,
      view: new View({
        zoom: 15,
        maxZoom: 20,
      }),
    });

    var zoomslider = new ZoomSlider();
    this.map.addControl(zoomslider);
    this.map.getView().fit([13784343.025655, 814368.207926, 14048821.648763, 978738.393527]);
    this.map.getView().setZoom(9);
  }
}
