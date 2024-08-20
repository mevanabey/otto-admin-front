import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ProtectedPage from "@/components/layout/protected-page"
import MaterialsTable from './components/materials-table'
import TipsTalble from './components/tips-table'
import ProductsTable from './components/products-table'

export default function Component() {
    return (
      <ProtectedPage>
        <Tabs defaultValue="materials">
          <TabsList className="mt-8 ml-8">
            <TabsTrigger value="materials">Materials</TabsTrigger>
            <TabsTrigger value="tips">Tips</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
          </TabsList>
          <TabsContent value="materials">
            <MaterialsTable />
          </TabsContent>
          <TabsContent value="tips">
            <TipsTalble />
          </TabsContent>
          <TabsContent value="products">
            <ProductsTable />
          </TabsContent>
        </Tabs>
      </ProtectedPage>
    )
  }
  