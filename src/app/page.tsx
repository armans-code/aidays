import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Eye, Shield, Smartphone } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen items-center">
      <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                AI-Powered Emergency Response Platform
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Streamline emergency resource requests and empower recovery
                responders with real-time AI assistance.
              </p>
            </div>
            <div className="space-x-4">
              <Link
                href="/register"
                className={buttonVariants({ variant: "default" })}
              >
                Get Started
              </Link>
              <Link
                href="/features"
                className={buttonVariants({ variant: "outline" })}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Key Features
          </h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-6 h-6 mr-2 text-blue-500" />
                  Easy Resource Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                Just call our dedicated helpline, and our AI assistant, Alyssa,
                will be ready to assist you in real-time. With one phone call,
                you’ll receive the support you need.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-6 h-6 mr-2 text-green-500" />
                  Live Request Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                Responders gain instant access to incoming requests via an
                interactive map, allowing for real-time prioritization and
                efficient management.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-6 h-6 mr-2 text-red-500" />
                  AI-Powered Assistance
                </CardTitle>
              </CardHeader>
              <CardContent>
                Using advanced NLP, our AI analyzes your calls in real
                time—transforming speech to text and back again—to capture
                essential details instantly.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join the Emergency Response Revolution
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                AidLink is transforming how communities respond to crises. Be
                part of the change and help save lives.
              </p>
              <ul className="grid gap-2">
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-green-500" />
                  Faster response times
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-green-500" />
                  Improved resource allocation
                </li>
                <li className="flex items-center">
                  <ArrowRight className="w-4 h-4 mr-2 text-green-500" />
                  Enhanced situational awareness
                </li>
              </ul>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Stay Informed</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sign up for our newsletter to receive updates and emergency
                  preparedness tips.
                </p>
              </div>
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
