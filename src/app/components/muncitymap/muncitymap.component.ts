import { CoviddataService } from 'src/app/services/coviddata.service';
import { MapService } from './../../services/map.service';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2,
  SimpleChanges,
  EventEmitter,
  Output,
} from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import { Draw, Modify, Snap, Select, Extent } from "ol/interaction";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { ZoomSlider, OverviewMap } from "ol/control";
import { OSM, Vector as VectorSource, XYZ } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import GeometryType from "ol/geom/GeometryType";
import Projection from "ol/proj/Projection";
import GeoJSON from "ol/format/GeoJSON";
import Polygon from "ol/geom/Polygon";
import LineString from "ol/geom/LineString";
import Overlay from "ol/Overlay";
import { getCenter } from "ol/extent";

import { getArea } from "ol/sphere";
import { Observable } from "rxjs";
import OverlayPositioning from "ol/OverlayPositioning";
import { unByKey } from "ol/Observable";

@Component({
  selector: 'app-muncitymap',
  templateUrl: './muncitymap.component.html',
  styleUrls: ['./muncitymap.component.scss'],
})
export class MuncitymapComponent implements OnInit {
  map: Map;
  raster: TileLayer;
  source: VectorSource;
  vector: VectorLayer;
  muncitysource: VectorSource;
  muncityvector: VectorLayer;
  projection: Projection;
  basemap: TileLayer;
  mapsloaded: boolean;

  constructor(
    private mapservice : MapService,
    private coviddatasvc : CoviddataService,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit() {
    setTimeout((_) => this.initMap(), 2000);
  }

  initMap() {
    this.mapsloaded = false;
    var muncitylabelStyle = new Style({
      text: new Text({
        font: "18px Calibri,sans-serif",
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
        color: 'rgba(255, 0, 0, 0.40)'
      }),
      stroke: new Stroke({
        color: "#319FD3",
        width: 1,
      }),
    });
    var muncitystyle = [muncitystylefill, muncitylabelStyle];

    //base map
    this.basemap = new TileLayer({
      source: new XYZ({
        maxZoom: 17,
        attributions:
          'Google Hybrid',
        url:
          "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}"
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

    //draw map
    this.map = new Map({
      layers: [this.basemap, this.muncityvector],
      target: "mapmuncity",
      view: new View({
        zoom: 15,
        maxZoom: 20,
      }),
    });

    var zoomslider = new ZoomSlider();
    this.map.addControl(zoomslider);
    this.map
      .getView()
      .fit([13784343.025655, 814368.207926, 14048821.648763, 978738.393527]);

  
    //add barangay boundaries
    this.mapservice.getMunicipalBrdy().then(async feature => {
    await this.coviddatasvc.getCovidDataByMunicipality().then(items => {
      items.map(a => a.properties['address_muncity']).forEach(muncity => {
        feature['features'] = feature['features'].map(a => {
          if (a.properties['mun_city'] === muncity) {
            let muncityfeature = items.find( a => a.properties['address_muncity'] === muncity);
            a.properties['totalactive'] = muncityfeature.properties['totalactive'];
            return a;
          } else {
            return a;
          }
        });
      });
    });
    await this.muncitysource.addFeatures(
      new GeoJSON().readFeatures(feature)
    );
    await this.muncityvector.setStyle((feature, resolution) => {
      muncitylabelStyle.getText().setText(feature.get('mun_city')  +  ' - ' + feature.get('totalactive'));
      return muncitystyle;
    });
    this.mapsloaded = true;
  });

  }

}
