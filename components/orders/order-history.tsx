import { cn } from '@/lib/utils'

const activity:any[] = [
  { id: 1, type: 'created', person: { name: 'Mevan Abeydeera' }, date: '7d ago', dateTime: '2024-08-19T10:32' },
  { id: 2, type: 'edited', person: { name: 'Mevan Abeydeera' }, date: '6d ago', dateTime: '2024-08-19T11:03' },
  { id: 3, type: 'sent', person: { name: 'Mevan Abeydeera' }, date: '6d ago', dateTime: '2024-08-19T11:24' },
  {
    id: 4,
    type: 'commented',
    person: {
      name: 'Mevan Abeydeera',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    comment: 'Called client, they reassured me the invoice would be paid by the 25th.',
    date: '3d ago',
    dateTime: '2024-08-19T15:56',
  },
  { id: 5, type: 'viewed', person: { name: 'Alex Curren' }, date: '2d ago', dateTime: '2024-08-19T09:12' },
  { id: 6, type: 'paid', person: { name: 'Alex Curren' }, date: '1d ago', dateTime: '2024-08-19T09:20' },
];

export const OrderHistory = ({ order }: { order: any }) => {
  return (
    <div className="lg:col-start-3">
    {/* Activity feed */}
    <h2 className="text-sm font-semibold leading-6">Order History</h2>
    <ul role="list" className="mt-6 space-y-6">
      {activity.map((activityItem, activityItemIdx) => (
        <li key={activityItem.id} className="relative flex gap-x-4">
          <div
            className={cn(
              activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6',
              'absolute left-0 top-0 flex w-6 justify-center',
            )}
          >
            <div className="w-px bg-gray-200" />
          </div>
          {activityItem.type === 'commented' ? (
            <>
              <img
                alt=""
                src={activityItem.person.imageUrl}
                className="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50"
              />
              <div className="flex-auto rounded-md p-3 border">
                <div className="flex justify-between gap-x-4">
                  <div className="py-0.5 text-xs leading-5 text-gray-500">
                    <span className="font-medium text-muted-foreground">{activityItem.person.name}</span> commented
                  </div>
                  <time
                    dateTime={activityItem.dateTime}
                    className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                  >
                    {activityItem.date}
                  </time>
                </div>
                <p className="text-sm leading-6 text-gray-500">{activityItem.comment}</p>
              </div>
            </>
          ) : (
            <>
              <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
              </div>
              <p className="flex-auto py-0.5 text-xs leading-5 text-gray-500">
                <span className="font-medium text-muted-foreground">{activityItem.person.name}</span>{' '}
                {activityItem.type} the invoice.
              </p>
              <time
                dateTime={activityItem.dateTime}
                className="flex-none py-0.5 text-xs leading-5 text-gray-500"
              >
                {activityItem.date}
              </time>
            </>
          )}
        </li>
      ))}
    </ul>

    {/* New comment form */}
    <div className="mt-6 flex gap-x-3">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        className="h-6 w-6 flex-none rounded-full bg-gray-50"
      />
      <form action="#" className="relative flex-auto">
        <div className="overflow-hidden rounded-lg pb-12 shadow-sm border">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={2}
            placeholder="Add a comment..."
            className="block w-full resize-none border-0 bg-transparent py-1.5 placeholder:text-muted-foreground focus:ring-0 sm:text-sm sm:leading-6"
            defaultValue={''}
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex items-center space-x-5">

          </div>
          <button
            type="submit"
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Comment
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}