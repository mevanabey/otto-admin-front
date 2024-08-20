import { LoaderIcon, LoaderCircle } from "lucide-react"

export function Loader() {
    return (
      <div className="w-full h-full min-h-44 my-12 flex items-center justify-center">
        <LoaderCircle className="h-10 w-10 animate-spin" />
      </div>
    )
  }