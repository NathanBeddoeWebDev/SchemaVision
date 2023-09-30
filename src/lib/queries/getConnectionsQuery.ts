import rspc from "@/lib/rspc.ts";

export default function useConnectionsQuery() {
    return rspc.useQuery(["connections"]);
}