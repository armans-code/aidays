import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, FileText, MessageCircle, Info } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 to-sky-50">
      <main className="flex-grow container mx-auto p-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Dashboard
        </h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <MapPin className="w-16 h-16 mx-auto text-blue-500 mb-4" />
              <CardTitle className="text-2xl">Aid Link Map</CardTitle>
              <CardDescription>
                View resource distribution and heatmap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg" asChild>
                <Link href="/map">Open Map</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <FileText className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <CardTitle className="text-2xl">Submit Request</CardTitle>
              <CardDescription>Request resources or assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg" asChild>
                <Link href="/submit-request">New Resource Request</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-12 bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow max-w-4xl mx-auto">
          <CardHeader className="text-center">
            <Info className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <CardTitle className="text-2xl">Quick Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>
                  Use the Aid Link Map to view current resource requests from
                  other users, power statuses, and areas of high severity.
                </span>
              </li>
              <li className="flex items-start">
                <FileText className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                <span>
                  Submit a new request if you need resources or assistance in
                  your area.
                </span>
              </li>
              <li className="flex items-start">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>
                  Use the chat feature for immediate support or questions about
                  the platform.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Resource Aid Link. All rights reserved.</p>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg"
        size="icon"
      >
        <MessageCircle className="w-8 h-8" />
        <span className="sr-only">Open Chatbot</span>
      </Button>
    </div>
  );
}
