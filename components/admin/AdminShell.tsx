"use client";

import { useState } from "react";
import { AdminSidebar, AdminTopbar } from "@/components/admin/AdminNav";

export function AdminShell({ children, user }: { children: React.ReactNode; user: any }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-neutral-100 dark:bg-[#0d0d0d] text-neutral-900 dark:text-white font-sans overflow-hidden transition-colors">
      <AdminSidebar open={sidebarOpen} user={user} />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminTopbar
          user={user}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((p) => !p)}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
