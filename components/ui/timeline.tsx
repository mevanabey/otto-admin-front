export type TimelineDataType = {
  timelineData: { date: string, time: string, description: string }[]
}

export function Timeline({ timelineData }: TimelineDataType ) {
  return (
    <div className="p-6 sm:p-10">
      <div className="mb-6 sm:mb-10">
        <h2 className="text-2xl font-bold">Order Updates</h2>
      </div>
      <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-muted-foreground/20 grid gap-6 sm:gap-10">
        {timelineSampleData.map((update, index) => (
          <div key={index} className="grid gap-1 text-sm relative">
            <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
            <div className="font-medium">
              {update.date} - {update.time}
            </div>
            <div className="text-muted-foreground">{update.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

const timelineSampleData = [
  {
    date: "2023-06-01",
    time: "10:30 AM",
    description: "Sample time 1: Data Structure ",
  },
  {
    date: "2023-06-02",
    time: "2:15 PM",
    description: "Order shipped",
  },
  {
    date: "2023-06-03",
    time: "9:45 AM",
    description: "Order delivered",
  },
  {
    date: "2023-06-04",
    time: "4:20 PM",
    description: "Customer left a review",
  },
  {
    date: "2023-06-05",
    time: "11:00 AM",
    description: "Refund processed",
  },
]