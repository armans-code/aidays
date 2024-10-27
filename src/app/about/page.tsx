import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, MapPin, Phone, Shield, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Our Emergency Response App</h1>
        <p className="text-xl text-muted-foreground">
          Revolutionizing disaster response through real-time communication and AI-powered assistance.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={<AlertCircle className="h-6 w-6" />}
            title="Real-time Alerts"
            description="Instant communication between responders and civilians during emergencies."
          />
          <FeatureCard
            icon={<Phone className="h-6 w-6" />}
            title="AI-powered Assistance"
            description="Call our AI for help in multiple languages, providing crucial information to responders."
          />
          <FeatureCard
            icon={<MapPin className="h-6 w-6" />}
            title="Interactive Maps"
            description="Live heatmaps of affected areas, resource requests, and responder locations."
          />
          <FeatureCard
            icon={<Users className="h-6 w-6" />}
            title="Community Support"
            description="Connect with nearby shelters or volunteers who can offer assistance."
          />
          <FeatureCard
            icon={<Shield className="h-6 w-6" />}
            title="Resource Management"
            description="Request and locate essential resources like water, power, and medical supplies."
          />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">How It Works: AI-Powered Calls</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>Call our AI assistant using your phone.</li>
          <li>Explain your situation, location, and needs in your preferred language.</li>
          <li>The AI listens and transcribes your message using advanced speech-to-text technology.</li>
          <li>Your information is processed by our language model to extract key details.</li>
          <li>The AI responds with relevant information or instructions using natural text-to-speech.</li>
          <li>Your request is logged and displayed on the emergency responders' dashboard.</li>
          <li>The information contributes to our real-time heatmaps and resource allocation systems.</li>
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>For Civilians</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Easy access to help through AI-powered phone calls</li>
                <li>Real-time updates on emergency situations</li>
                <li>Locate nearby shelters and resources quickly</li>
                <li>Request specific resources and connect with helpers</li>
                <li>Multi-language support for diverse communities</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>For Emergency Responders</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2">
                <li>Comprehensive dashboard with real-time information</li>
                <li>Heatmaps of affected areas and resource needs</li>
                <li>Efficient resource allocation based on AI-collected data</li>
                <li>Improved response times and decision-making</li>
                <li>Better coordination between different response teams</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-6">Ready to Revolutionize Emergency Response?</h2>
        <Button size="lg" className="text-lg px-8">
          Get Started
        </Button>
      </section>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}