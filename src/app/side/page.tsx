"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { MapPin, AlertTriangle, Menu } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import SituationMap from "../map/Map";
import {
  getNearbySituations,
  getNearbyWants,
  Request,
} from "../../lib/actions";
import { useUser } from "@clerk/nextjs";

export default function Component() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [severityFilter, setSeverityFilter] = useState<number>(1);
  const [distanceFilter, setDistanceFilter] = useState<number>(5);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const get = async () => {
      const w = await getNearbyWants(user?.id as string);
      const s = await getNearbySituations(user?.id as string);
      setRequests(w.concat(s));
    };
    if (user?.id) get();
  }, [user?.id]);

  const handleResolve = (id: number) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, resolved: true } : request
      )
    );
  };

  const filteredRequests = requests.filter(
    (request) =>
      // !request.resolved &&
      request.severity >= severityFilter && request.distance <= distanceFilter
  );

  return (
    <SidebarProvider className="w-screen">
      <div className="flex h-screen overflow-hidden w-screen">
        {/* Map Placeholder */}
        <SituationMap
          requests={requests}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />

        {/* Sidebar */}
        <Sidebar collapsible="none" className="w-[600px] border-l">
          <SidebarHeader className="h-16 flex items-center px-4 border-b">
            <h1 className="text-2xl font-bold flex-1">Resource Requests</h1>
            {/* <SidebarTrigger>
              <Menu className="h-6 w-6" />
            </SidebarTrigger> */}
          </SidebarHeader>
          <SidebarContent>
            <div className="p-4 space-y-4">
              <div>
                <label
                  htmlFor="severity-filter"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Minimum Severity: {severityFilter}
                </label>
                <Slider
                  id="severity-filter"
                  min={1}
                  max={10}
                  step={1}
                  value={[severityFilter]}
                  onValueChange={(value) => setSeverityFilter(value[0])}
                  className="w-full"
                />
              </div>

              <div>
                <label
                  htmlFor="distance-filter"
                  className="block text-sm font-medium text-gray-700"
                >
                  Maximum Distance: {distanceFilter} miles
                </label>
                <Slider
                  id="distance-filter"
                  min={0}
                  max={10}
                  step={0.1}
                  value={[distanceFilter]}
                  onValueChange={(value) => setDistanceFilter(value[0])}
                  className="w-full"
                />
              </div>
            </div>

            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="p-4 space-y-4">
                {filteredRequests.map((request) => (
                  <Card
                    key={request.id}
                    className={
                      request.id == selectedRequest?.id
                        ? "bg-gray-100 cursor-pointer"
                        : "cursor-pointer"
                    }
                    onClick={() => setSelectedRequest(request)}
                  >
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>{request.username}</span>
                        <Badge
                          variant={
                            request.severity > 7 ? "destructive" : "default"
                          }
                        >
                          <AlertTriangle className="w-4 h-4 mr-1" />
                          Severity: {request.severity}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-2">
                        {request.description}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>{request.address}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Distance: {request.distance.toFixed(2)} miles
                      </div>
                    </CardContent>
                    <CardFooter>
                      {/* <Button
                        onClick={() => handleResolve(request.id)}
                        className="w-full"
                      >
                        Resolve
                      </Button> */}
                    </CardFooter>
                  </Card>
                ))}

                {filteredRequests.length === 0 && (
                  <p className="text-center text-muted-foreground">
                    No unresolved requests match the current filters.
                  </p>
                )}
              </div>
            </ScrollArea>
          </SidebarContent>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
