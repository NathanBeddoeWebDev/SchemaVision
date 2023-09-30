// Import necessary modules
import { type Procedures } from "../bindings";
import { createClient } from "@rspc/client";
import { TauriTransport } from "@rspc/tauri";
import {atom} from "nanostores";

export const client = atom(createClient<Procedures>({
  transport: new TauriTransport(),
}))