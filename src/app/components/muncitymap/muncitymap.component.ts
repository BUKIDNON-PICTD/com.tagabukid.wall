import { CoviddataService } from "src/app/services/coviddata.service";
import { MapService } from "./../../services/map.service";
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
import ImageLayer from "ol/layer/Image";
import { ZoomSlider, OverviewMap } from "ol/control";
import { OSM, Vector as VectorSource, XYZ, ImageWMS } from "ol/source";
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
  selector: "app-muncitymap",
  templateUrl: "./muncitymap.component.html",
  styleUrls: ["./muncitymap.component.scss"],
})
export class MuncitymapComponent implements OnInit {
  map: Map;
  covidcasemap: Map;
  raster: TileLayer;
  source: VectorSource;
  vector: VectorLayer;
  muncitysource: VectorSource;
  muncityvector: VectorLayer;
  muncitysource2: VectorSource;
  muncityvector2: VectorLayer;
  covidcasessource: ImageWMS;
  covidcasesvector: ImageLayer;
  projection: Projection;
  basemap: TileLayer;
  basemap2: TileLayer;

  @ViewChild("popup") popup: ElementRef;
  @ViewChild("popupcontent") popupcontent: ElementRef;
  popupoverlay: Overlay;
  imagesource: any;
  constructor(
    private mapservice: MapService,
    private coviddatasvc: CoviddataService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    setTimeout((_) => this.initMap(), 2000);
  }

  initMap() {
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

    var muncitylabelStyle2 = new Style({
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
    var muncitystylefill2 = new Style({
      fill: new Fill({
        color: "rgba(255, 0, 0, 00)",
      }),
      stroke: new Stroke({
        color: "#fcf403",
        width: 1,
      }),
    });
    var muncitystyle2 = [muncitystylefill2, muncitylabelStyle2];

    //base map
    this.basemap = new TileLayer({
      source: new XYZ({
        maxZoom: 17,
        attributions: "Google Hybrid",
        url: "http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
      }),
    });

    this.basemap2 = new TileLayer({
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

    //muncity map
    this.muncitysource2 = new VectorSource({
      format: new GeoJSON(),
    });

    this.muncityvector2 = new VectorLayer({
      declutter: true,
      source: this.muncitysource2,
    });

    this.covidcasessource = new ImageWMS({
      ratio: 1,
      url: "https://geoserver.bukidnon.gov.ph/geoserver/covid19/wms",
      params: {
        FORMAT: "image/png",
        VERSION: "1.1.1",
        LAYERS: "covid19:bukidnoncovid19_view",
        exceptions: "application/vnd.ogc.se_inimage",
      },
    });

   

    this.covidcasesvector = new ImageLayer({
      declutter: true,
      source: this.covidcasessource,
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

    //draw map
    this.covidcasemap = new Map({
      layers: [this.basemap2, this.muncityvector2, this.covidcasesvector],
      target: "covidcasemap",
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

    var zoomslider2 = new ZoomSlider();
    this.covidcasemap.addControl(zoomslider2);
    this.covidcasemap
      .getView()
      .fit([13784343.025655, 814368.207926, 14048821.648763, 978738.393527]);

    //add barangay boundaries
    this.mapservice.MunicipalBdry().then(async (feature) => {
      await this.coviddatasvc.bukidnoncovid19_view_by_municipality_summary().then((items) => {
        items
          .map((a) => a.address_muncity)
          .forEach((muncity) => {
            feature["features"] = feature["features"].map((a) => {
              if (a.properties["mun_city"].toUpperCase() === muncity.toUpperCase()) {
                let muncityfeature = items.find(
                  (a) => a.address_muncity === muncity
                );
                a.properties["totalactive"] =
                  muncityfeature.totalactive;
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
    });

    //add barangay boundaries
    this.mapservice.MunicipalBdry().then(async (feature) => {
      await this.muncitysource2.addFeatures(
        new GeoJSON().readFeatures(feature)
      );
      await this.muncityvector2.setStyle((feature, resolution) => {
        muncitylabelStyle2.getText().setText(feature.get("mun_city"));
        return muncitystyle2;
      });
    });

    var resolution = this.covidcasemap.getView().getResolution();
    this.udpateLegend(resolution);

    // this.covidcasemap.getView().on('change:resolution', function (event) {
    //   var resolution = event.target.getResolution();
    //   this.updateLegend(resolution);
    // });
    // this.createpopup();
  }

  udpateLegend(resolution) {
    var graphicUrl = this.covidcasessource.getLegendUrl(resolution);
    this.imagesource = graphicUrl;
  }

  // closepopup() {
  //   this.popupoverlay.setPosition(undefined);
  // }

  // createpopup() {
  //   this.popupoverlay = new Overlay({
  //     element: this.popup.nativeElement,
  //     autoPan: true,
  //     autoPanAnimation: {
  //       duration: 250,
  //     },
  //   });
  //   this.covidcasemap.addOverlay(this.popupoverlay);

  //   var selectSingleClick = new Select({
  //     layers : [this.covidcasesvector]
  //     // layers: function(layer) {
  //     //   console.log(layer);
  //     //   return true;
  //     // },
  //     // filter: function(feature, layer) {
  //     //     console.log(layer);
  //     //     return true;
  //     // },
  //   });
  //   this.covidcasemap.addInteraction(selectSingleClick);
  //   selectSingleClick.on("select", (e) => {
  //     console.log(e.selected[0]);
  //     // if (e.selected[0]) {
  //     //   let selecteditem = e.selected[0];
  //     //   let extent = selecteditem.getGeometry().getExtent();
  //     //   let objid = selecteditem.get("objid");
  //     //   let classification = selecteditem.get("classification");
  //     //   let dateconfirmed = selecteditem.get("dateconfirmed");
  //     //   let person_age = selecteditem.get("person_age");
  //     //   let person_gender = selecteditem.get("person_gender");

  //     //   let content = "";
  //     //   content +=
  //     //     "<h5><strong>Class</strong> : " + classification + "</h5>";
  //     //   // if (itemtype === "commodity") {
  //     //   //   let commodity = item.commodities.find((o) => o.objid === itemid);
  //     //   //   console.log(commodity);
  //     //   //   if (commodity) {
  //     //   //     content +=
  //     //   //       " <h5>" +
  //     //   //       commodity.variety.commoditytype.commodity.name +
  //     //   //       "</h5>";
  //     //   //     content +=
  //     //   //       "<p>" +
  //     //   //       commodity.variety.commoditytype.unit +
  //     //   //       " : " +
  //     //   //       commodity.quantity;
  //     //   //     content +=
  //     //   //       "<br>Commodity Type : " + commodity.variety.commoditytype.name;
  //     //   //     content += "<br>Variety : " + commodity.variety.name;
  //     //   //     content +=
  //     //   //       "<br>Sruvey Period : " + commodity.surveyperiod.name + "</p>";
  //     //   //     this.renderer.setProperty(
  //     //   //       this.popupcontent.nativeElement,
  //     //   //       "innerHTML",
  //     //   //       content
  //     //   //     );
  //     //   //   } else {
  //     //   //     this.renderer.setProperty(
  //     //   //       this.popupcontent.nativeElement,
  //     //   //       "innerHTML",
  //     //   //       "No Farmer Data"
  //     //   //     );
  //     //   //   }
  //     //   // } else {
  //     //   //   let livestock = item.livestocks.find((o) => o.objid === itemid);
  //     //   //   if (livestock) {
  //     //   //     content += " <h5>" + livestock.breed.species.name + "</h5>";
  //     //   //     content += "<p>" + "Sruvey Period : " + livestock.surveyperiod.name;
  //     //   //     this.renderer.setProperty(
  //     //   //       this.popupcontent.nativeElement,
  //     //   //       "innerHTML",
  //     //   //       content
  //     //   //     );
  //     //   //   } else {
  //     //   //     this.renderer.setProperty(
  //     //   //       this.popupcontent.nativeElement,
  //     //   //       "innerHTML",
  //     //   //       "No Farmer Data"
  //     //   //     );
  //     //   //   }
  //     //   // }

  //     //   this.popupoverlay.setPosition(getCenter(extent));
  //     // }
  //   });
  // }
}
