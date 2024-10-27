"use client";
import MapPage from "@/components/ui/map/map";
import { getSituations } from "@/lib/actions";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { Situation } from "../../db/schema";

export default function SituationMap() {
  const [situations, setSituations] = useState<Situation[]>([]);

  useEffect(() => {
    const get = async () => {
      const res = await getSituations();
      setSituations(res);
    };
    get();
  }, []);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}>
      <MapPage situations={situations} />
    </APIProvider>
  );
}
