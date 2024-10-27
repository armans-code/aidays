"use client";
import MapPage from "@/components/ui/map/map";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Want, Wants } from "../../lib/actions";

export default function SituationMap({
  wants,
  want,
  setWant,
}: {
  wants: Wants;
  want: Want | null;
  setWant: (want: Want) => void;
}) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}>
      <MapPage wants={wants} want={want} setWant={setWant} />
    </APIProvider>
  );
}
