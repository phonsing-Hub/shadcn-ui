import { ChangePassword } from "@/components/profile/ChangePassword"
function page() {
  return (
    <main className="dashboard flex flex-1 flex-col gap-4 p-4 pt-0 ">
      <ChangePassword/>
    </main>
  )
}

export default page