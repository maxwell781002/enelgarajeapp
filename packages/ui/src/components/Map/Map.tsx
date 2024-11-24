"use client";

import { useEffect } from "react";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

let DefaultIcon = L.icon({
  iconUrl: "/marker-icon.png",
});

const HABANA: LatLngTuple = [23.102639551820147, -82.37307390774875];

export type MapProps = {
  height: number;
  center?: LatLngTuple;
  zoom?: number;
  point?: LatLngTuple;
  textPopup?: string;
  onChange?: (position: LatLngTuple) => void;
};

export default function Map({
  zoom = 9,
  center,
  point,
  textPopup,
  height,
}: MapProps) {
  center = point || HABANA;
  useEffect(() => {
    let container: any = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }
    let map = L.map("map", {
      scrollWheelZoom: false,
      zoom,
    }).setView(center, zoom);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
      },
    ).addTo(map);
    L.Marker.prototype.options.icon = DefaultIcon;
    var marker = L.marker(center).addTo(map);
    if (textPopup) {
      marker.bindPopup(textPopup).openPopup();
    }
  }, [textPopup, zoom, center]);
  return <div id="map" style={{ height }}></div>;
}
