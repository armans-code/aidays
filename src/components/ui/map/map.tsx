"use client";

import { Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { Want, Wants } from "../../../lib/actions";
import { useEffect } from "react";

export default function MapPage({
  wants,
  want,
  setWant,
}: {
  wants: Wants;
  want: Want | null;
  setWant: (want: Want) => void;
}) {
  const map = useMap("id");

  useEffect(() => {
    if (want && map) {
      map.setZoom(15);
      map.panTo({
        lat: parseFloat(want.lat),
        lng: parseFloat(want.lon),
      });
    }
  }, [map, want]);

  return (
    <Map
      style={{ width: "100%", height: "100%" }}
      defaultCenter={{
        lat: 29.6469297097701,
        lng: -82.353240760785,
      }}
      defaultZoom={12.5}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      id="id"
    >
      {wants.map((want: Want) => {
        return (
          <Marker
            key={want.id}
            position={{
              lat: parseFloat(want.lat),
              lng: parseFloat(want.lon),
            }}
            onClick={() => {
              map?.panTo({
                lat: parseFloat(want.lat),
                lng: parseFloat(want.lon),
              });
              map?.setZoom(15);
              setWant(want);
            }}
          />
        );
      })}
    </Map>
  );
}
