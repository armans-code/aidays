"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";

type HelpRequest = {
  id: string;
  username: string;
  description: string;
  severity: number;
  address: string;
  distance: number;
  resolved: boolean;
};

const initialRequests: HelpRequest[] = [
  {
    id: "1",
    username: "JohnDoe",
    description: "Trapped in flooded basement",
    severity: 9,
    address: "123 Main St",
    distance: 2.5,
    resolved: false,
  },
  {
    id: "2",
    username: "JaneSmith",
    description: "Need medical supplies",
    severity: 7,
    address: "456 Elm St",
    distance: 1.8,
    resolved: false,
  },
  {
    id: "3",
    username: "BobJohnson",
    description: "Roof collapsed",
    severity: 10,
    address: "789 Oak St",
    distance: 3.2,
    resolved: false,
  },
  {
    id: "4",
    username: "AliceWilliams",
    description: "Food shortage",
    severity: 6,
    address: "321 Pine St",
    distance: 0.9,
    resolved: false,
  },
  {
    id: "5",
    username: "CharlieBrown",
    description: "Elderly person needs evacuation",
    severity: 8,
    address: "654 Maple St",
    distance: 4.1,
    resolved: false,
  },
];

export default function Component() {
  const [requests, setRequests] = useState<HelpRequest[]>(initialRequests);
  const [severityFilter, setSeverityFilter] = useState<number>(1);
  const [distanceFilter, setDistanceFilter] = useState<number>(5);

  const handleResolve = (id: string) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, resolved: true } : request
      )
    );
  };

  const filteredRequests = requests.filter(
    (request) =>
      !request.resolved &&
      request.severity >= severityFilter &&
      request.distance <= distanceFilter
  );

  return (
    <SidebarProvider className="w-screen">
      <div className="flex h-screen overflow-hidden w-screen">
        {/* Map Placeholder */}
        <div className="flex-1 bg-muted p-4">
          <div className="h-full rounded-lg border-2 border-dashed border-muted-foreground flex items-center justify-center">
            <span className="text-2xl text-muted-foreground">
              Map Placeholder
            </span>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar collapsible="none" className="w-[400px] border-l">
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
                  Maximum Distance: {distanceFilter} km
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
                  <Card key={request.id}>
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
                        Distance: {request.distance} km
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={() => handleResolve(request.id)}
                        className="w-full"
                      >
                        Resolve
                      </Button>
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
