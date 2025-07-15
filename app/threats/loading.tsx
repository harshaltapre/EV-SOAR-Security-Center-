import { RefreshCw } from "lucide-react"

export default function ThreatsLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 bg-gray-50 dark:bg-gray-950">
      <RefreshCw className="h-12 w-12 text-blue-500 animate-spin" />
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading threats data...</p>
    </div>
  )
}
