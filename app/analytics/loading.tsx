import { RefreshCw } from "lucide-react"

export default function AnalyticsLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 bg-gray-50 dark:bg-gray-950">
      <RefreshCw className="h-12 w-12 text-blue-500 animate-spin" />
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Loading analytics data...</p>

      {/* <header className="mb-6">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-5 w-96" />
      </header> */}

      {/* <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-5 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-20 mb-1" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </section> */}

      {/* <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="shadow-md">
            <CardHeader>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[250px] w-full" />
            </CardContent>
          </Card>
        ))}
      </section> */}

      {/* <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i} className="shadow-md">
            <CardHeader>
              <Skeleton className="h-5 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[...Array(3)].map((_, j) => (
                <div key={j}>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-2 w-full" />
                  <Skeleton className="h-3 w-24 mt-1" />
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </section> */}
    </div>
  )
}
