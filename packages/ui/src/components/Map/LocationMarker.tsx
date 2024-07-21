'use client'

import { Icon, LatLngTuple } from "leaflet";
import { memo, useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

export type LocationMarkerProps = {
  textPopup?: string,
  position?: LatLngTuple,
  onChange?: (position: LatLngTuple,) => void
}

const LocationMarker = ({ textPopup, position, onChange }: LocationMarkerProps) => {
  const map = useMapEvents({
    click(e) {
      onChange?.([e.latlng.lat, e.latlng.lng])
      map.locate()
    },
  })
  useEffect(() => {
    if (position) {
      map.panTo({ lat: position[0], lng: position[1] })
    }
  }, [map, position?.[0], position?.[1]])
  return position === undefined ? null : (
    <Marker position={position} icon={new Icon({ iconUrl: '/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}>
      {!!textPopup && <Popup>{textPopup}</Popup>}
    </Marker>
  )
};

export default memo(LocationMarker);
