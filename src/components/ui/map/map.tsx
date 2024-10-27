"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Layers, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { Situation } from "@/lib/types";

export default function MapPage({ situations }: { situations: Situation[] }) {
  const [isHeatmap, setIsHeatmap] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 to-sky-50">
      <main className="flex-grow container mx-auto p-8">
        <Card className="bg-white/50 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl flex items-center">
                {isHeatmap ? (
                  <Layers className="w-6 h-6 mr-2 text-red-500" />
                ) : (
                  <MapPin className="w-6 h-6 mr-2 text-blue-500" />
                )}
                {isHeatmap ? "Severity Heatmap" : "Resource Request Map"}
              </CardTitle>
              <div className="flex rounded-md shadow-sm" role="group">
                <Button
                  variant={isHeatmap ? "outline" : "default"}
                  className={`rounded-l-md ${
                    !isHeatmap ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setIsHeatmap(false)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Requests
                </Button>
                <Button
                  variant={isHeatmap ? "default" : "outline"}
                  className={`rounded-r-md ${
                    isHeatmap ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => setIsHeatmap(true)}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Severity
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Placeholder for the map component */}
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              {isHeatmap ? (
                "Severity Heatmap"
              ) : (
                <APIProvider
                  apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ""}
                >
                  <Map
                    style={{ width: "100%", height: "100%" }}
                    defaultCenter={{
                      lat: 29.6469297097701,
                      lng: -82.353240760785,
                    }}
                    defaultZoom={12.5}
                    gestureHandling={"greedy"}
                    disableDefaultUI={true}
                  >
                    {situations.map((situation: Situation) => {
                      return (
                        <Marker
                          key={situation.id}
                          position={{
                            lat: parseFloat(situation.lat),
                            lng: parseFloat(situation.lon),
                          }}
                        />
                      );
                    })}
                  </Map>
                </APIProvider>
              )}
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                {isHeatmap
                  ? "The heatmap shows severity levels based on reported incidents."
                  : "This map displays current resource requests from users in the affected areas"}
              </p>
            </div>
          </CardContent>
        </Card>

        {isHeatmap && (
          <Card className="mt-6 bg-white/50 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg">Severity Legend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                  <span>No Severity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                  <span>Low Severity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                  <span>Medium Severity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                  <span>High Severity</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Resource Aid Link. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
