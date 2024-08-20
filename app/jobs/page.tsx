import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { JobListItem } from "@/components/jobs/job-list-item"
import { JobStats } from "@/components/jobs/job-stats"

import ProtectedPage from "@/components/layout/protected-page"

export default function Component() {
    return (
      <ProtectedPage>
        <div className="my-4 mx-2 space-y-8 sm:mx-8">
          <Card>
            <JobStats />
          </Card>
          <Tabs defaultValue="pending">
            <TabsList>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <Card>
                <JobListItem />
              </Card>
            </TabsContent>
            <TabsContent value="active">
            </TabsContent>
            <TabsContent value="completed">
            </TabsContent>
          </Tabs>
        </div>
      </ProtectedPage>
    )
  }
  