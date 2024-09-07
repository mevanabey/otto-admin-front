import ProtectedPage from "@/components/layout/protected-page"

export default function Page({ params }: { params: { id: string } }) {
  return (
    <ProtectedPage>
      <></>
      {/* <CustomerDetails id={params.id} /> */}
    </ProtectedPage>
  )
}