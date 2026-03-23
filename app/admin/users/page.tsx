"use client";

import { useEffect, useState } from "react";
import {
  Users,
  ShieldCheck,
  Clock,
  Ban,
  CheckCircle2,
  Trash2,
  ChevronDown,
  Search,
  UserCheck,
  AlertCircle,
} from "lucide-react";

type UserRole   = "admin" | "uploader";
type UserStatus = "pending" | "active" | "banned";

type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

type ActionLoading = { id: string; field: "role" | "status" | "delete" } | null;

const STATUS_COLOR: Record<UserStatus, string> = {
  active:  "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  pending: "text-amber-400  bg-amber-400/10  border-amber-400/20",
  banned:  "text-red-400    bg-red-400/10    border-red-400/20",
};

const STATUS_ICON: Record<UserStatus, React.ReactNode> = {
  active:  <CheckCircle2 className="w-3 h-3" />,
  pending: <Clock        className="w-3 h-3" />,
  banned:  <Ban          className="w-3 h-3" />,
};

const ROLE_COLOR: Record<UserRole, string> = {
  admin:    "text-blue-400  bg-blue-400/10  border-blue-400/20",
  uploader: "text-violet-400 bg-violet-400/10 border-violet-400/20",
};

export default function AdminUsersPage() {
  const [users, setUsers]         = useState<User[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState<UserStatus | "all">("all");
  const [filterRole, setFilterRole]     = useState<UserRole | "all">("all");
  const [actionLoading, setActionLoading] = useState<ActionLoading>(null);
  const [toast, setToast]         = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/users");
      const data = await res.json();
      if (Array.isArray(data)) setUsers(data);
      else showToast("err", data.error ?? "Gagal memuat pengguna");
    } catch {
      showToast("err", "Koneksi gagal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const patchUser = async (id: string, payload: Partial<{role: UserRole; status: UserStatus}>, field: "role" | "status") => {
    setActionLoading({ id, field });
    try {
      const res  = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => prev.map((u) => u.id === id ? { ...u, ...payload } : u));
        showToast("ok", "Berhasil diperbarui");
      } else {
        showToast("err", data.error ?? "Gagal memperbarui");
      }
    } catch {
      showToast("err", "Koneksi gagal");
    } finally {
      setActionLoading(null);
    }
  };

  const deleteUser = async (id: string, name: string) => {
    if (!confirm(`Hapus pengguna "${name}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setActionLoading({ id, field: "delete" });
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
        showToast("ok", `Pengguna dihapus`);
      } else {
        const data = await res.json();
        showToast("err", data.error ?? "Gagal menghapus");
      }
    } catch {
      showToast("err", "Koneksi gagal");
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    const matchRole   = filterRole === "all"   || u.role   === filterRole;
    return matchSearch && matchStatus && matchRole;
  });

  const counts = {
    total:   users.length,
    active:  users.filter((u) => u.status === "active").length,
    pending: users.filter((u) => u.status === "pending").length,
    banned:  users.filter((u) => u.status === "banned").length,
  };

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date(iso));

  const initials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const avatarColor = (id: string) => {
    const colors = ["bg-blue-600","bg-violet-600","bg-emerald-600","bg-amber-600","bg-rose-600","bg-cyan-600"];
    return colors[id.charCodeAt(0) % colors.length];
  };

  return (
    <div className="p-6 md:p-8 space-y-6 min-h-full">

      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium animate-in slide-in-from-top-2 duration-200 ${
          toast.type === "ok"
            ? "bg-[#1a1a1a] border-emerald-500/30 text-emerald-400"
            : "bg-[#1a1a1a] border-red-500/30 text-red-400"
        }`}>
          {toast.type === "ok"
            ? <CheckCircle2 className="w-4 h-4" />
            : <AlertCircle  className="w-4 h-4" />}
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div>
        <p className="text-neutral-500 text-xs font-mono uppercase tracking-widest mb-1">Manajemen</p>
        <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">Pengguna</h1>
        <p className="text-neutral-500 text-sm mt-1">Kelola role dan status akses pengguna sistem.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total",   value: counts.total,   icon: <Users className="w-4 h-4" />,       color: "text-neutral-500 dark:text-white/60",    bg: "bg-neutral-100 dark:bg-white/5"           },
          { label: "Aktif",   value: counts.active,  icon: <UserCheck className="w-4 h-4" />,    color: "text-emerald-500 dark:text-emerald-400", bg: "bg-emerald-500/10 dark:bg-emerald-400/8"     },
          { label: "Pending", value: counts.pending, icon: <Clock className="w-4 h-4" />,        color: "text-amber-500 dark:text-amber-400",   bg: "bg-amber-500/10 dark:bg-amber-400/8"       },
          { label: "Banned",  value: counts.banned,  icon: <Ban className="w-4 h-4" />,          color: "text-red-500 dark:text-red-400",     bg: "bg-red-500/10 dark:bg-red-400/8"         },
        ].map((s) => (
          <div key={s.label} className="bg-white dark:bg-white/4 border border-neutral-200 dark:border-white/6 rounded-2xl p-4 flex items-center gap-3 shadow-sm dark:shadow-none">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.color} ${s.bg}`}>
              {s.icon}
            </div>
            <div>
              <p className="text-xl font-bold text-neutral-900 dark:text-white tabular-nums">{loading ? "—" : s.value}</p>
              <p className="text-[11px] text-neutral-500 font-medium">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 dark:text-white/25" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau email..."
            className="w-full h-9 pl-9 pr-4 rounded-xl border border-neutral-200 dark:border-white/8 bg-white dark:bg-white/4 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/40 transition-all shadow-sm dark:shadow-none"
          />
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as UserStatus | "all")}
            className="h-9 pl-3 pr-8 rounded-xl border border-neutral-200 dark:border-white/8 bg-white dark:bg-white/4 text-sm text-neutral-600 dark:text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none cursor-pointer shadow-sm dark:shadow-none"
          >
            <option value="all"     className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Semua Status</option>
            <option value="active"  className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Aktif</option>
            <option value="pending" className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Pending</option>
            <option value="banned"  className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Banned</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-white/30 pointer-events-none" />
        </div>

        {/* Role filter */}
        <div className="relative">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value as UserRole | "all")}
            className="h-9 pl-3 pr-8 rounded-xl border border-neutral-200 dark:border-white/8 bg-white dark:bg-white/4 text-sm text-neutral-600 dark:text-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 appearance-none cursor-pointer shadow-sm dark:shadow-none"
          >
            <option value="all"      className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Semua Role</option>
            <option value="admin"    className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Admin</option>
            <option value="uploader" className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Uploader</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 dark:text-white/30 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-white/4 border border-neutral-200 dark:border-white/6 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-neutral-200 dark:border-white/5 text-[11px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-white/25">
          <span>Pengguna</span>
          <span className="hidden sm:block">Bergabung</span>
          <span>Role</span>
          <span>Status</span>
          <span></span>
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-6 h-6 border-2 border-neutral-200 dark:border-white/10 border-t-blue-500 rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-neutral-400 dark:text-white/25">
            <Users className="w-10 h-10 opacity-30" />
            <p className="text-sm font-medium">
              {users.length === 0 ? "Belum ada pengguna" : "Tidak ada yang cocok dengan filter"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100 dark:divide-white/4">
            {filtered.map((user) => {
              const isActing = actionLoading?.id === user.id;
              return (
                <div
                  key={user.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-3.5 hover:bg-neutral-50 dark:hover:bg-white/2 transition-colors group"
                >
                  {/* Identity */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-inner ${avatarColor(user.id)}`}>
                      {user.image
                        ? <img src={user.image} alt="" className="w-full h-full rounded-full object-cover" />
                        : initials(user.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white/85 truncate">{user.name}</p>
                      <p className="text-[11px] text-neutral-500 dark:text-white/30 truncate">{user.email}</p>
                    </div>
                  </div>

                  {/* Join date */}
                  <span className="hidden sm:block text-xs text-neutral-400 dark:text-white/35">{formatDate(user.createdAt)}</span>

                  {/* Role selector */}
                  <div className="relative">
                    <select
                      value={user.role}
                      disabled={isActing && actionLoading?.field === "role"}
                      onChange={(e) => patchUser(user.id, { role: e.target.value as UserRole }, "role")}
                      className={`w-full text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none appearance-none transition-all ${ROLE_COLOR[user.role]} bg-transparent`}
                    >
                      <option value="admin"    className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Admin</option>
                      <option value="uploader" className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Uploader</option>
                    </select>
                    {isActing && actionLoading?.field === "role" && (
                      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 border border-current/40 border-t-current rounded-full animate-spin" />
                    )}
                  </div>

                  {/* Status selector */}
                  <div className="relative">
                    <select
                      value={user.status}
                      disabled={isActing && actionLoading?.field === "status"}
                      onChange={(e) => patchUser(user.id, { status: e.target.value as UserStatus }, "status")}
                      className={`w-full text-xs font-semibold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-none appearance-none transition-all ${STATUS_COLOR[user.status]} bg-transparent`}
                    >
                      <option value="active"  className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Aktif</option>
                      <option value="pending" className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Pending</option>
                      <option value="banned"  className="bg-white text-neutral-900 dark:bg-[#1a1a1a] dark:text-white">Banned</option>
                    </select>
                    {isActing && actionLoading?.field === "status" && (
                      <div className="absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 border border-current/40 border-t-current rounded-full animate-spin" />
                    )}
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteUser(user.id, user.name)}
                    disabled={isActing && actionLoading?.field === "delete"}
                    className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg text-neutral-400 dark:text-white/30 hover:text-red-500 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-400/10 transition-all disabled:opacity-30"
                    title="Hapus pengguna"
                  >
                    {isActing && actionLoading?.field === "delete"
                      ? <div className="w-3.5 h-3.5 border border-red-500/40 border-t-red-500 dark:border-red-400/40 dark:border-t-red-400 rounded-full animate-spin" />
                      : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-neutral-100 dark:border-white/5 flex items-center justify-between">
            <p className="text-[11px] text-neutral-500 dark:text-white/40">
              Menampilkan {filtered.length} dari {users.length} pengguna
            </p>
            <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-white/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Data langsung dari database
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
