"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ChartRadar } from "@/components/chart/ChartRadar";
import { ChartLine } from "@/components/chart/ChartLine";
import { ChartBar } from "@/components/chart/ChartBar";
import { ChartArea } from "@/components/chart/ChartArea";
export default function Page() {
  return (
    <main className="dashboard flex flex-1 flex-col p-4 pt-0">
      <ScrollArea className="dashboard-content rounded-md px-4">
        <div className="flex flex-col gap-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <ChartBar />
            <ChartRadar />
            <ChartLine />
          </div>
          <ChartArea />
        </div>
      </ScrollArea>
    </main>
  );
}
