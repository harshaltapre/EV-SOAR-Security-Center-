import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 pb-4 text-center space-y-3">
          <Skeleton className="h-10 w-10 mx-auto rounded-full" />
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
        <div className="p-6 pt-0 space-y-6">
          <div className="space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-11 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-11 w-full" />
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
          <div className="text-center text-sm space-y-2">
            <Skeleton className="h-4 w-1/3 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  )
}
