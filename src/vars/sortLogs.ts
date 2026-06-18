import { Log } from "../types/DB";

export default function sortLogs(logs: Log[]) {
    return [...logs].sort((a, b) =>
        b.date.localeCompare(a.date)
    );
}