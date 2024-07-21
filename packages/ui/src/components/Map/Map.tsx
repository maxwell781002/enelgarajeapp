"use client"

// https://andresprieto-25116.medium.com/how-to-use-react-leaflet-in-nextjs-with-typescript-surviving-it-21a3379d4d18

import { MapContainer, TileLayer, MapContainerProps } from "react-leaflet";
import { LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import LocationMarker, { LocationMarkerProps } from "./LocationMarker";

const HABANA: LatLngTuple = [23.102639551820147, -82.37307390774875];

export type MapProps = {
  height: number,
  center?: LatLngTuple,
  zoom?: number,
  point?: LatLngTuple,
} & MapContainerProps & LocationMarkerProps

const Map = ({ zoom = 9, center, point, ...props }: MapProps) => {
  center = point || HABANA;

  return (
    <MapContainer
      {...props}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={point} {...props} />
    </MapContainer>
  )
}

export default Map
