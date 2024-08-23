import { ChevronRightIcon, CalendarIcon, EyeIcon, FilePenIcon, TrashIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from "@/lib/utils"

const statuses:any = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments:any = {
  Preview: 'text-yellow-400 bg-yellow-400/10 ring-yellow-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments:any = [
  {
    id: 1,
    href: '#',
    projectName: 'Custom design cladding sheet',
    teamName: 'Job ID: 12233',
    status: 'offline',
    statusText: 'Added 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  {
    id: 2,
    href: '#',
    projectName: 'mobile-api',
    teamName: 'Planetaria',
    status: 'online',
    statusText: 'Deployed 3m ago',
    description: 'Deploys from GitHub',
    environment: 'Production',
  },
]

export const JobListItem = () => {
  return (
    <ul role="list" className="divide-y divide-white/5">
      {deployments.map((deployment: any) => (
        <li key={deployment.id} className="relative flex items-center space-x-4 p-4 hover:bg-muted">
          <div className="min-w-0 flex-auto">
            <div className="flex items-center gap-x-3">
              <div className={cn(statuses[deployment.status], 'flex-none rounded-full p-1')}>
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
              <h2 className="min-w-0 text-sm font-semibold leading-6 text-white">
                <a href={deployment.href} className="flex gap-x-2">
                  <span className="truncate">{deployment.teamName}</span>
                  <span className="text-gray-400">/</span>
                  <span className="whitespace-nowrap">{deployment.projectName}</span>
                  <span className="absolute inset-0" />
                </a>
              </h2>
            </div>
            <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 text-gray-400">
              <p className="truncate">Gold Hairline .8mm</p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="whitespace-nowrap">CNC</p>
              <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
                <circle r={1} cx={1} cy={1} />
              </svg>
              <p className="whitespace-nowrap">{deployment.statusText}</p>
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-end gap-2">
                <Button variant="outline" size="sm">
                  <EyeIcon className="w-4 h-4" />
                  <span className="sr-only">View</span>
                </Button>
                <Button variant="outline" size="sm">
                  <FilePenIcon className="w-4 h-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button variant="outline" size="sm">
                  <TrashIcon className="w-4 h-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
          <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
        </li>
      ))}
    </ul>
  )
}
