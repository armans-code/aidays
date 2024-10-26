import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCog, Phone } from "lucide-react"

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-sky-100 to-sky-50">
      <header className="bg-primary text-primary-foreground p-6 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Resource Aid Link</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Welcome to Resource Aid Link (RAL)</h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Users className="w-16 h-16 mx-auto text-blue-500 mb-4" />
              <CardTitle className="text-2xl">Civilian Portal</CardTitle>
              <CardDescription>Access civilian features and request assistance</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Enter as Civilian
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/50 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <UserCog className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <CardTitle className="text-2xl">Responder Portal</CardTitle>
              <CardDescription>Access responder features and manage emergencies</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Enter as Responder
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <section className="bg-white/70 backdrop-blur-sm py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">About Resource Aid Link (RAL)</h2>
          <p className="max-w-2xl mx-auto mb-4">
            RAL is dedicated to connecting those in need with vital resources during natural disasters. 
            Our platform facilitates rapid response and efficient resource allocation to help communities in crisis.
          </p>
          <div className="flex items-center justify-center text-primary">
            <Phone className="w-5 h-5 mr-2" />
            <span className="font-medium">+1 (646) 755-9372</span>
          </div>
        </div>
      </section>
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Resource Aid Link. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}