import rspc, { queryClient } from "@/lib/rspc.ts";

export default function useCreateConnection() {
  return rspc.useMutation(["connections"], {
    onSuccess: (connection) => {
      queryClient.invalidateQueries(["connections"]);
    },
  });
}
