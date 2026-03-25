"use client";

/**
 * Admin Users Page
 *
 * Responsibilities (this file only):
 *  - Hold UI-only state: search query, filter values, detail modal
 *  - Compose reusable components & the useUsers hook
 *  - Derive the filtered list and pass it down
 *
 * Business logic  → hooks/useUsers.ts
 * UI constants    → constants.tsx
 * Shared types    → types.ts
 * Components      → components/*
 */

import { useState, useMemo } from "react";

// Hook & types
import { useUsers }              from "./hooks/useUsers";
import type { FilterRole, FilterStatus, AdminUser } from "./types";

// Components
import { UserToast }       from "./components/UserToast";
import { UserStatsBar }    from "./components/UserStatsBar";
import { UserFilters }     from "./components/UserFilters";
import { UserTable }       from "./components/UserTable";
import { UserDetailModal } from "./components/UserDetailModal";

export default function AdminUsersPage() {
  // ── Data layer (via custom hook) ──────────────────────────────────────────
  const {
    users,
    loading,
    actionLoading,
    toast,
    patchUser,
    deleteUser,
    refetch,
  } = useUsers();

  // ── UI-only state ─────────────────────────────────────────────────────────
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  const [filterRole,   setFilterRole]   = useState<FilterRole>("all");
  const [detailUser,   setDetailUser]   = useState<AdminUser | null>(null);

  // ── Derived: filtered list (memoised to avoid recomputing on every render) ─
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter((u) => {
      const matchSearch = (u.name || "").toLowerCase().includes(q) || (u.email || "").toLowerCase().includes(q);
      const matchStatus = filterStatus === "all" || u.status === filterStatus;
      const matchRole   = filterRole   === "all" || u.role   === filterRole;
      return matchSearch && matchStatus && matchRole;
    });
  }, [users, search, filterStatus, filterRole]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 md:p-8 space-y-6 min-h-full">

      {/* Toast notification */}
      <UserToast toast={toast} />

      {/* User detail modal */}
      {detailUser && (
        <UserDetailModal user={detailUser} onClose={() => setDetailUser(null)} />
      )}

      {/* Page header */}
      <div>
        <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-1">
          Manajemen
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
          Pengguna
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Kelola role dan status akses pengguna sistem.
        </p>
      </div>

      {/* Stats */}
      <UserStatsBar users={users} loading={loading} />

      {/* Filters */}
      <UserFilters
        search={search}
        filterStatus={filterStatus}
        filterRole={filterRole}
        loading={loading}
        onSearch={setSearch}
        onStatusChange={setFilterStatus}
        onRoleChange={setFilterRole}
        onRefresh={refetch}
      />

      {/* Table */}
      <UserTable
        users={filtered}
        allCount={users.length}
        loading={loading}
        actionLoading={actionLoading}
        onPatch={patchUser}
        onDelete={deleteUser}
        onViewDetail={setDetailUser}
      />
    </div>
  );
}
