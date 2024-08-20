import { Separator } from "@/components/ui/separator"

export default function Component() {
  return (
    <div className="bg-background p-8 sm:p-12">
      <div className="mx-auto max-w-[800px]">
        <div className="flex items-center justify-between">
          <div>
            <img src="/placeholder.svg" alt="Company Logo" width={150} height={50} className="h-auto" />
          </div>
          <div className="space-y-2 text-right">
            <h2 className="text-2xl font-bold">Invoice</h2>
            <p className="text-muted-foreground">Invoice #123456</p>
            <p className="text-muted-foreground">Issued: June 1, 2023</p>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-medium">From:</h3>
            <div className="space-y-1 text-muted-foreground">
              <p>Acme Inc.</p>
              <p>123 Main St.</p>
              <p>Anytown, CA 12345</p>
              <p>USA</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium">To:</h3>
            <div className="space-y-1 text-muted-foreground">
              <p>John Doe</p>
              <p>456 Oak Rd.</p>
              <p>Somewhere, NY 54321</p>
              <p>USA</p>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="py-3 px-4 text-left">Item</th>
                <th className="py-3 px-4 text-right">Quantity</th>
                <th className="py-3 px-4 text-right">Unit Price</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4">Acme Widget</td>
                <td className="py-3 px-4 text-right">2</td>
                <td className="py-3 px-4 text-right">$50.00</td>
                <td className="py-3 px-4 text-right">$100.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Acme Gadget</td>
                <td className="py-3 px-4 text-right">1</td>
                <td className="py-3 px-4 text-right">$75.00</td>
                <td className="py-3 px-4 text-right">$75.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Acme Thingamajig</td>
                <td className="py-3 px-4 text-right">3</td>
                <td className="py-3 px-4 text-right">$25.00</td>
                <td className="py-3 px-4 text-right">$75.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-8 flex justify-end">
          <div className="w-full max-w-[300px] space-y-2">
            <div className="flex justify-between">
              <p className="font-medium">Subtotal:</p>
              <p>$250.00</p>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Tax (10%):</p>
              <p>$25.00</p>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total Due:</p>
              <p className="text-lg font-bold">$275.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}