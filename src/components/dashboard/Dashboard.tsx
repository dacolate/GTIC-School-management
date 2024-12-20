import { SearchBar } from "./SearchBar";
import { QuickStats } from "./QuickStats";
import { PendingTasks } from "./PendingTasks";
import { RecentActivities } from "./RecentActivities";
import { QuickActions } from "./QuickActions";
import prisma from "@/lib/prisma";

export default async function Dashboard() {
  const classes = await prisma.class.findMany({
    select:{
      name: true,
    }
  })
  const classNames = classes.map((classs) => (classs.name))
  return (
    <div className="mx-auto pl-4 py-4">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <QuickStats />
          <RecentActivities />
        </div>
        <div>
        <PendingTasks />
        <QuickActions classList={classNames} />
      </div>
      </div>
      
    </div>
  );
}
