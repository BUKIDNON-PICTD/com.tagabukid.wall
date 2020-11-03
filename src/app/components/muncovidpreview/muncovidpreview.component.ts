import { MapService } from "./../../services/map.service";
import {
  Component,
  OnInit
} from "@angular/core";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { ZoomSlider} from "ol/control";
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
  constructor(
    private mapservice: MapService,
    private coviddatasvc: CoviddataService
  ) {}

  ngOnInit() {
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
        color: "rgba(255, 0, 0, 0.40)",
      }),
      stroke: new Stroke({
        color: "#fcf403",
        width: 1,
      }),
    });

    var muncitystylefillgreen = new Style({
      fill: new Fill({
        color: "rgba(0, 255, 0, 0.40)",
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

    
    //add barangay boundaries
    this.mapservice.getMunicipalBrdy().then(async (feature) => {
      await this.coviddatasvc.getCovidDataByMunicipality().then((items) => {
        items
          .map((a) => a.properties["address_muncity"])
          .forEach((muncity) => {
            feature["features"] = feature["features"].map((a) => {
              if (a.properties["mun_city"] === muncity) {
                let muncityfeature = items.find(
                  (a) => a.properties["address_muncity"] === muncity
                );
                a.properties["totalactive"] =
                  muncityfeature.properties["totalactive"];
                return a;
              } else {
                return a;
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

        if (feature.get("totalactive") === 0){
          return muncitystylegreen;
        }
        return muncitystyle;
      });
      console.log("TEST");
      await this.initMap();
    });

    // setTimeout((_) => , 10000);
  }

  initMap() {
    

    //draw map
    this.map = new Map({
      layers: [this.basemap, this.muncityvector],
      target: "munmappreview",
      view: new View({
        zoom: 15,
        maxZoom: 20,
      }),
    });


    var zoomslider = new ZoomSlider();
    this.map.addControl(zoomslider);
    this.map.getView().fit([13784343.025655, 814368.207926, 14048821.648763, 978738.393527]);


  }
}