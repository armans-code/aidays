"use client";

import { Map, Marker, useMap } from "@vis.gl/react-google-maps";
import { Request } from "../../../lib/actions";
import { useEffect } from "react";

export default function MapPage({
  requests,
  selectedRequest,
  setSelectedRequest,
}: {
  requests: Request[];
  selectedRequest: Request | null;
  setSelectedRequest: (want: Request) => void;
}) {
  const map = useMap("id");

  useEffect(() => {
    if (selectedRequest && map) {
      map.setZoom(15);
      map.panTo({
        lat: parseFloat(selectedRequest.lat),
        lng: parseFloat(selectedRequest.lon),
      });
    }
  }, [map, selectedRequest]);

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
      {requests.map((want: Request) => {
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
              setSelectedRequest(want);
            }}
          />
        );
      })}
    </Map>
  );
}
