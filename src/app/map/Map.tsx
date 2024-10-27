"use client";
import MapPage from "@/components/ui/map/map";
import { APIProvider } from "@vis.gl/react-google-maps";
import { Request } from "../../lib/actions";

export default function SituationMap({
  requests,
  selectedRequest,
  setSelectedRequest,
}: {
  requests: Request[];
  selectedRequest: Request | null;
  setSelectedRequest: (request: Request) => void;
}) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY!}>
      <MapPage
        requests={requests}
        selectedRequest={selectedRequest}
        setSelectedRequest={setSelectedRequest}
      />
    </APIProvider>
  );
}
