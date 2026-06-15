import { Task } from "../types/DB";
import { todayStr } from "./dateObjects";

export default function sortTasks(tasks: Task[]) {
    return [...tasks].sort((a, b) => {
            const aDeadline = a.deadline ?? null;
            const bDeadline = b.deadline ?? null;
    
            const aOverdue = aDeadline && aDeadline < todayStr;
            const bOverdue = bDeadline && bDeadline < todayStr;
    
            // Overdue tasks first
            if (aOverdue && !bOverdue) return -1;
            if (!aOverdue && bOverdue) return 1;
    
            // Otherwise sort by latest status datetime
            const aLatest = a.status?.[a.status.length - 1]?.datetime?.seconds ?? 0;
            const bLatest = b.status?.[b.status.length - 1]?.datetime?.seconds ?? 0;
    
            return bLatest - aLatest;
        });
}