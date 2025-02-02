import { ScrollArea } from "@/components/ui/scroll-area";
import { RoomTable } from '@/components/table/RoomTable' 
function page() {
  return (
    <main className="dashboard flex flex-1 flex-col p-4 pt-0 ">
      <ScrollArea className="dashboard-content rounded-md px-4">
      <RoomTable/>
      </ScrollArea>
    </main>

  )
}

export default page