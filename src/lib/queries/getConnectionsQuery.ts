import rspc from "@/lib/rspc.ts";

export default function useConnectionsQuery(id: number | null) {
    return rspc.useQuery(["connections", id]);
}