import type { Database } from "./types.gen";

declare global {
    type users = Database["public"]["Tables"]["users"]["Row"];
}
