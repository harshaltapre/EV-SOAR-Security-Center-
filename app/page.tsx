import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Zap, BatteryCharging, BarChart } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link href="#" className="flex items-center justify-center gap-2" prefetch={false}>
          <Shield className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-gray-50">EV-SOAR</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="/login"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            prefetch={false}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            prefetch={false}
          >
            Register
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center text-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl/none text-gray-900 dark:text-gray-50 animate-fade-in-up">
                  Secure Your EV Charging Infrastructure
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300 animate-fade-in-up delay-200">
                  EV-SOAR provides advanced security operations, automation, and response for electric vehicle charging
                  networks.
                </p>
              </div>
              <div className="space-x-4 animate-fade-in-up delay-400">
                <Link href="/register" prefetch={false}>
                  <Button className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-lg font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700">
                    Get Started
                  </Button>
                </Link>
                <Link href="/login" prefetch={false}>
                  <Button
                    variant="outline"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-blue-600 bg-transparent px-8 text-lg font-medium text-blue-600 shadow-sm transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50">
                  Comprehensive Security Features
                </h2>
                <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-300">
                  From real-time threat detection to automated incident response, EV-SOAR ensures your charging
                  infrastructure is protected 24/7.
                </p>
                <ul className="grid gap-4 py-4">
                  <li className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <span className="text-gray-800 dark:text-gray-200">Real-time Threat Monitoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Zap className="h-6 w-6 text-yellow-600" />
                    <span className="text-gray-800 dark:text-gray-200">Automated Incident Response</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BatteryCharging className="h-6 w-6 text-green-600" />
                    <span className="text-gray-800 dark:text-gray-200">Secure Charging Sessions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <BarChart className="h-6 w-6 text-purple-600" />
                    <span className="text-gray-800 dark:text-gray-200">Advanced Analytics & Reporting</span>
                  </li>
                </ul>
              </div>
              <img
                src="/placeholder.svg?height=400&width=600"
                width="600"
                height="400"
                alt="Security Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-black">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-gray-50 mb-8">
              Why Choose EV-SOAR?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <Shield className="h-12 w-12 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Unmatched Security</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Protect your charging stations from cyber threats and unauthorized access.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <Zap className="h-12 w-12 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Operational Efficiency</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Streamline security operations with automated workflows and real-time alerts.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <BarChart className="h-12 w-12 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">Actionable Insights</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Gain deep insights into security posture and charging network performance.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-100 dark:bg-gray-900">
        <p className="text-xs text-gray-600 dark:text-gray-400">&copy; 2024 EV-SOAR. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400"
            prefetch={false}
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400"
            prefetch={false}
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
