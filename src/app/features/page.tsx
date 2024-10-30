"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  Globe,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import Footer from "@/components/footer";
import Link from "next/link";

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("ai");

  return (
    <>
      <div className="container mx-auto py-6 md:py-12 lg:py-12 xl:py-24">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Features</h1>
          <p className="text-xl text-muted-foreground">
            Discover how our app is revolutionizing emergency response and
            communication.
          </p>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="ai">AI Communication</TabsTrigger>
            <TabsTrigger value="alerts">Real-time Alerts</TabsTrigger>
            <TabsTrigger value="resources">Resource Management</TabsTrigger>
            <TabsTrigger value="community">Community Support</TabsTrigger>
          </TabsList>
          <TabsContent value="ai" className="p-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  AI-Powered Communication
                </CardTitle>
                <CardDescription className="text-md">
                  Our advanced AI system enables efficient and accurate
                  communication during emergencies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Call our AI assistant using your phone or app.</li>
                  <li>Explain your situation in natural language.</li>
                  <li>AI transcribes and analyzes your message.</li>
                  <li>Key information is extracted and categorized.</li>
                  <li>
                    AI responds with relevant instructions or information.
                  </li>
                  <li>Your request is logged for emergency responders.</li>
                  <li>Data contributes to real-time emergency mapping.</li>
                </ol>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="alerts" className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Real-time Alerts and Mapping
                  </CardTitle>
                  <CardDescription className="text-md">
                    Stay informed with instant updates and visual
                    representations of emergency situations.
                  </CardDescription>
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
                  <CardTitle className="text-xl">Interactive Maps</CardTitle>
                  <CardDescription className="text-md">
                    Real-time maps that highlight resource requests and
                    emergency situations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Real-time resource and situation visibility</li>
                    <li>Interactive map with filters</li>
                    <li>Live situation status updates</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="resources" className="p-5">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Resource Management</CardTitle>
                <CardDescription className="text-md">
                  Efficiently request, locate, and distribute essential
                  resources during emergencies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Request specific resources (water, food, medical supplies)
                  </li>
                  <li>
                    Locate nearest emergency situations and resource requests
                  </li>
                  <li>Prioritize resource allocation based on severity</li>
                  <li>
                    Real-time updates on emergency situations and resource
                    requests
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="community" className="p-5">
            <FeatureSection
              title="Community Support Network"
              description="Foster community resilience by connecting those in need with local helpers and resources."
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>For Those in Need</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Report emergency situations to first responders</li>
                      <li>Request resources you need</li>
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
                      <li>Coordinate with official response teams</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </FeatureSection>
          </TabsContent>
        </Tabs>
        <section className="text-center mt-12">
          <h2 className="text-3xl font-semibold mb-6">
            Experience These Features Today
          </h2>
          <Link
            href="/register"
            className={buttonVariants({ variant: "default" })}
          >
            Get Started
          </Link>
        </section>
      </div>
      <Footer />
    </>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function FeatureSection({
  title,
  description,
  icon,
  children,
}: FeatureCardProps) {
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
  );
}
