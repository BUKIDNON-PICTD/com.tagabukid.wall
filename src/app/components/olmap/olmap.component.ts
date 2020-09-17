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
  selector: "app-olmap",
  templateUrl: "./olmap.component.html",
  styleUrls: ["./olmap.component.scss"],
})
export class OlmapComponent implements OnInit {
  map: Map;
  raster: TileLayer;
  source: VectorSource;
  vector: VectorLayer;
  barangaysource: VectorSource;
  barangayvector: VectorLayer;
  projection: Projection;
  basemap: TileLayer;
  draw: any;
  snap: any;
  geometryType: any;
  enabledraw = true;
  enablemodify = true;
  enablesave = true;
  enableclear = true;
  sketch: any;
  helpTooltipElement: any;
  helpTooltip: any;
  measureTooltipElement: any;
  measureTooltip: any;
  continuePolygonMsg = "Click to continue drawing the polygon";
  continueLineMsg = "Click to continue drawing the line";
  helpMsg: any;
  mapsloaded: boolean = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngOnInit() {
    setTimeout((_) => this.initMap(), 2000);
  }

  initMap() {
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
    //draw map
    this.map = new Map({
      layers: [this.basemap],
      target: "map",
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
  }
}
