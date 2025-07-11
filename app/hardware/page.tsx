import { SystemArchitecture } from "@/components/system-architecture"

export default function HardwarePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Hardware Specifications</h1>
          <p className="text-gray-600 mt-1">Detailed technical specifications for EV-SOAR implementation</p>
        </div>
        <SystemArchitecture />
      </div>
    </div>
  )
}
