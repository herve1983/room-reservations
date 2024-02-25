import { Link } from "@nextui-org/react";
import React from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex h-screen">
        <Link href="/">Home</Link>
      </div>
    </main>
  );
}
