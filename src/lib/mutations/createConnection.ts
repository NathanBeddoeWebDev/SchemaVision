import rspc from "@/lib/rspc.ts";

export default function useCreateConnection() {
    return rspc.useMutation(["connections"]);
}