'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Layers, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function MapPage() {
  const [isHeatmap, setIsHeatmap] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 to-sky-50">
      <header className="bg-primary text-primary-foreground p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Aid Link Map</h1>
          <Button variant="outline" className="text-black border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Link>
          </Button>
        </div>
      </header>

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
                {isHeatmap ? 'Severity Heatmap' : 'Resource Request Map'}
              </CardTitle>
              <div className="flex rounded-md shadow-sm" role="group">
                <Button
                  variant={isHeatmap ? "outline" : "default"}
                  className={`rounded-l-md ${!isHeatmap ? 'bg-primary text-primary-foreground' : ''}`}
                  onClick={() => setIsHeatmap(false)}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Requests
                </Button>
                <Button
                  variant={isHeatmap ? "default" : "outline"}
                  className={`rounded-r-md ${isHeatmap ? 'bg-primary text-primary-foreground' : ''}`}
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
              <p className="text-gray-500 text-lg">
                {isHeatmap ? 'Severity Heatmap' : 'Resource Request Map'} will be displayed here
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>
                {isHeatmap
                  ? 'The heatmap shows severity levels based on reported incidents.'
                  : 'This map displays current resource requests from users in the affected areas'}
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
  )
}