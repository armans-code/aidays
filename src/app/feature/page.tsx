'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Globe, MapPin, MessageSquare, Phone, Shield, Users } from "lucide-react"

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('ai')

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Features</h1>
        <p className="text-xl text-muted-foreground">
          Discover how our app is revolutionizing emergency response and communication.
        </p>
      </section>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="ai">AI Communication</TabsTrigger>
          <TabsTrigger value="alerts">Real-time Alerts</TabsTrigger>
          <TabsTrigger value="resources">Resource Management</TabsTrigger>
          <TabsTrigger value="language">Multi-language</TabsTrigger>
          <TabsTrigger value="community">Community Support</TabsTrigger>
        </TabsList>
        <TabsContent value="ai">
          <FeatureSection
            title="AI-Powered Communication"
            description="Our advanced AI system enables efficient and accurate communication during emergencies."
            icon={<Phone className="h-12 w-12" />}
          >
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Call our AI assistant using your phone or app.</li>
                  <li>Explain your situation in natural language.</li>
                  <li>AI transcribes and analyzes your message.</li>
                  <li>Key information is extracted and categorized.</li>
                  <li>AI responds with relevant instructions or information.</li>
                  <li>Your request is logged for emergency responders.</li>
                  <li>Data contributes to real-time emergency mapping.</li>
                </ol>
              </CardContent>
            </Card>
          </FeatureSection>
        </TabsContent>
        <TabsContent value="alerts">
          <FeatureSection
            title="Real-time Alerts and Mapping"
            description="Stay informed with instant updates and visual representations of emergency situations."
            icon={<AlertCircle className="h-12 w-12" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Alert Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Weather emergencies</li>
                    <li>Natural disasters</li>
                    <li>Public safety threats</li>
                    <li>Infrastructure issues</li>
                    <li>Health emergencies</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Maps</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Heatmaps of affected areas</li>
                    <li>Resource availability visualization</li>
                    <li>Emergency responder locations</li>
                    <li>Safe routes and evacuation paths</li>
                    <li>Real-time incident reporting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </FeatureSection>
        </TabsContent>
        <TabsContent value="resources">
          <FeatureSection
            title="Resource Management"
            description="Efficiently request, locate, and distribute essential resources during emergencies."
            icon={<Shield className="h-12 w-12" />}
          >
            <Card>
              <CardHeader>
                <CardTitle>Resource Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Request specific resources (water, food, medical supplies)</li>
                  <li>Locate nearest available resources</li>
                  <li>Track resource distribution and inventory</li>
                  <li>Coordinate volunteer efforts and donations</li>
                  <li>Prioritize resource allocation based on severity</li>
                  <li>Real-time updates on resource availability</li>
                </ul>
              </CardContent>
            </Card>
          </FeatureSection>
        </TabsContent>
        <TabsContent value="language">
          <FeatureSection
            title="Multi-language Support"
            description="Break down language barriers during emergencies with our comprehensive language support."
            icon={<Globe className="h-12 w-12" />}
          >
            <Card>
              <CardHeader>
                <CardTitle>Language Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Real-time translation for voice and text communication</li>
                  <li>Support for over 50 languages</li>
                  <li>Culturally sensitive AI responses</li>
                  <li>Localized emergency instructions and alerts</li>
                  <li>Language preference settings for users</li>
                  <li>Accessibility features for hearing and visually impaired users</li>
                </ul>
              </CardContent>
            </Card>
          </FeatureSection>
        </TabsContent>
        <TabsContent value="community">
          <FeatureSection
            title="Community Support Network"
            description="Foster community resilience by connecting those in need with local helpers and resources."
            icon={<Users className="h-12 w-12" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>For Those in Need</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request specific help from community</li>
                    <li>Find nearby shelters or safe spaces</li>
                    <li>Connect with local volunteers</li>
                    <li>Access community-shared resources</li>
                    <li>Receive real-time updates on local support</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>For Helpers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Register as a volunteer or resource provider</li>
                    <li>Respond to specific help requests</li>
                    <li>Offer shelter or transportation</li>
                    <li>Coordinate with official response teams</li>
                    <li>Receive training and safety guidelines</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </FeatureSection>
        </TabsContent>
      </Tabs>

      <section className="text-center mt-12">
        <h2 className="text-3xl font-semibold mb-6">Experience These Features Today</h2>
        <Button size="lg" className="text-lg px-8">
          Get Started
        </Button>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode
}

function FeatureSection({ title, description, icon, children }: FeatureCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </div>
  )
}