"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Trophy,
  Users,
  ArrowUpRight,
  Loader2,
  UserRound,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";
import { SiLudwig } from "react-icons/si";

const LIMIT = 12;

export default function ContestantsPage() {
  const [contestants, setContestants] = useState([]);
  const [search, setSearch] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchContestants = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = {
        page,
        limit: LIMIT,
      };

      if (activeSearch.trim()) {
        params.search = activeSearch.trim();
      }

      const response = await api.get("/contestants/public", {
        params,
      });

      const result = response.data;

      if (!result.success) {
        throw new Error(result.message || "Failed to load contestants.");
      }

      const data = result.data;

      setContestants(data?.contestants || []);
      setTotal(data?.total || 0);
      setPages(data?.pages || 1);
    } catch (err) {
      console.error("Contestants fetch error:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to load contestants right now.",
      );

      setContestants([]);
    } finally {
      setLoading(false);
    }
  }, [page, activeSearch]);

  useEffect(() => {
    fetchContestants();
  }, [fetchContestants]);

  const handleSearch = (e) => {
    e.preventDefault();

    setPage(1);
    setActiveSearch(search.trim());
  };

  const clearSearch = () => {
    setSearch("");
    setActiveSearch("");
    setPage(1);
  };

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > pages || nextPage === page) {
      return;
    }

    setPage(nextPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-250px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/10 blur-[150px]" />

        <div className="absolute right-[-150px] top-[35%] h-[350px] w-[350px] rounded-full bg-red-900/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <section className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="h-[1px] w-8 bg-red-600" />

              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-red-500 sm:text-xs">
                Border-Bound
              </span>
            </div>

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                  The
                  <span className="block text-red-600">Contestants</span>
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                  Meet the fighters stepping into the Border-Bound arena.
                  Discover their stories, profiles and journey.
                </p>
              </div>

              <div className="flex items-center gap-3 border border-zinc-800 bg-zinc-950/80 px-4 py-3 backdrop-blur-xl">
                <div className="flex h-9 w-9 items-center justify-center bg-red-600/10 text-red-500">
                  <Users size={18} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                    Live Contestants
                  </p>

                  <p className="text-xl font-black">{total}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative flex w-full items-center border border-zinc-800 bg-[#0b0b0b] transition-colors focus-within:border-red-600/70">
            <Search size={19} className="ml-4 shrink-0 text-zinc-600" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contestant by name..."
              className="h-14 w-full bg-transparent px-4 text-sm text-white outline-none placeholder:text-zinc-700 sm:h-16 sm:text-base"
            />

            {search && (
              <button
                type="button"
                onClick={clearSearch}
                className="mr-2 flex h-9 w-9 shrink-0 items-center justify-center text-zinc-600 transition hover:text-white"
              >
                <X size={17} />
              </button>
            )}

            <button
              type="submit"
              className="mr-2 hidden h-11 bg-red-600 px-6 text-xs font-black uppercase tracking-widest transition hover:bg-red-500 sm:block"
            >
              Search
            </button>
          </div>

          <button
            type="submit"
            className="mt-2 flex h-12 w-full items-center justify-center gap-2 bg-red-600 text-xs font-black uppercase tracking-[0.2em] transition hover:bg-red-500 sm:hidden"
          >
            <Search size={15} />
            Search Contestants
          </button>

          {activeSearch && (
            <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
              <span>Showing results for</span>

              <span className="font-bold text-red-500">"{activeSearch}"</span>

              <button
                type="button"
                onClick={clearSearch}
                className="ml-1 text-zinc-700 transition hover:text-white"
              >
                Clear
              </button>
            </div>
          )}
        </motion.form>

        {/* Content */}
        {loading ? (
          <ContestantSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={fetchContestants} />
        ) : contestants.length === 0 ? (
          <EmptyState search={activeSearch} onClear={clearSearch} />
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between border-b border-zinc-900 pb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600 sm:text-xs">
                {activeSearch
                  ? `${total} Result${total !== 1 ? "s" : ""}`
                  : "All Contestants"}
              </p>

              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-700">
                Page {page} / {pages}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {contestants.map((contestant, index) => (
                  <ContestantCard
                    key={contestant._id}
                    contestant={contestant}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </div>

            {pages > 1 && (
              <Pagination page={page} pages={pages} onPageChange={goToPage} />
            )}
          </>
        )}
      </section>
    </main>
  );
}

function ContestantCard({ contestant, index }) {
  const {
    _id,
    applicationId,
    fullName,
    age,
    city,
    state,
    profilePhotoUrl,
    bio,
    totalValidVotes,
    rank,
    selectionStatus,
    slug
  } = contestant;

  const isSelected =
    selectionStatus === "top_32" || selectionStatus === "wildcard";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.04, 0.25),
      }}
      className="group"
    >
      <Link href={`/contestant/${ slug|| _id}`}>
        <article className="relative overflow-hidden border border-zinc-900 bg-[#0b0b0b] transition-all duration-300 hover:border-red-600/50 hover:bg-[#0e0e0e]">
          <div className="relative aspect-[4/4.5] overflow-hidden bg-zinc-950">
            {profilePhotoUrl ? (
              <div className="flex h-full w-full items-center justify-center">
                <div className="relative h-48 w-48 overflow-hidden rounded-full border-2 border-red-600/60 bg-zinc-900 shadow-[0_0_40px_rgba(220,38,38,0.15)] sm:h-56 sm:w-56">
                  <img
                    src={profilePhotoUrl}
                    alt={fullName}
                    className="h-full w-full object-cover grayscale-[20%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <div className="flex h-48 w-48 items-center justify-center rounded-full border-2 border-zinc-800 bg-zinc-900 sm:h-56 sm:w-56">
                  <UserRound
                    size={60}
                    strokeWidth={1}
                    className="text-zinc-700"
                  />
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

            {rank > 0 && (
              <div className="absolute left-3 top-3 flex items-center gap-2 border border-white/10 bg-black/70 px-3 py-2 backdrop-blur-md">
                <Trophy size={13} className="text-red-500" />

                <span className="text-[10px] font-black uppercase tracking-wider">
                  Rank #{rank}
                </span>
              </div>
            )}

            {isSelected && (
              <div className="absolute right-3 top-3 bg-red-600 px-3 py-2 text-[9px] font-black uppercase tracking-widest">
                {selectionStatus === "wildcard" ? "Wildcard" : "Top 32"}
              </div>
            )}

            <div className="absolute  -bottom-3 left-0 right-0 p-4 ">
             

              <h2 className="truncate text-xl font-black uppercase tracking-tight text-white ">
                {fullName}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                <MapPin size={13} className="text-red-500" />

                <span className="truncate">
                  {city}, {state}
                </span>

                <span className="text-zinc-700">•</span>

                <span>{age}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-900 p-4">
            <p className="line-clamp-2 min-h-[40px] text-xs leading-5 text-zinc-500">
              {bio || "Contestant profile available."}
            </p>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-900 pt-3">
              <div>
                <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-700">
                  Valid Votes
                </p>

                <p className="mt-0.5 text-sm font-black text-white">
                  {Number(totalValidVotes || 0).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="flex h-9 w-9 items-center justify-center border border-zinc-800 text-zinc-600 transition-all group-hover:border-red-600 group-hover:bg-red-600 group-hover:text-white">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red-600 transition-all duration-500 group-hover:w-full" />
        </article>
      </Link>
    </motion.div>
  );
}

function Pagination({ page, pages, onPageChange }) {
  const getPages = () => {
    if (pages <= 5) {
      return Array.from({ length: pages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", pages];
    }

    if (page >= pages - 2) {
      return [1, "...", pages - 3, pages - 2, pages - 1, pages];
    }

    return [1, "...", page - 1, page, page + 1, "...", pages];
  };

  return (
    <div className="mt-10 flex items-center justify-center gap-1.5 sm:gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center border border-zinc-800 bg-[#0b0b0b] text-zinc-500 transition hover:border-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronLeft size={17} />
      </button>

      {getPages().map((item, index) =>
        item === "..." ? (
          <span
            key={`dots-${index}`}
            className="flex h-10 w-7 items-center justify-center text-zinc-700"
          >
            •••
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`h-10 min-w-10 border px-3 text-xs font-bold transition ${
              page === item
                ? "border-red-600 bg-red-600 text-white"
                : "border-zinc-800 bg-[#0b0b0b] text-zinc-500 hover:border-red-600 hover:text-white"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === pages}
        className="flex h-10 w-10 items-center justify-center border border-zinc-800 bg-[#0b0b0b] text-zinc-500 transition hover:border-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
      >
        <ChevronRight size={17} />
      </button>
    </div>
  );
}

function ContestantSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden border border-zinc-900 bg-[#0b0b0b]"
        >
          <div className="aspect-[4/4.5] animate-pulse bg-zinc-900" />

          <div className="space-y-3 p-4">
            <div className="h-3 w-24 animate-pulse bg-zinc-900" />
            <div className="h-5 w-40 animate-pulse bg-zinc-900" />
            <div className="h-8 w-full animate-pulse bg-zinc-900" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({ search, onClear }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[380px] flex-col items-center justify-center border border-dashed border-zinc-900 bg-[#080808] px-6 text-center"
    >
      <div className="mb-5 flex h-16 w-16 items-center justify-center border border-red-600/20 bg-red-600/5 text-red-600">
        <Search size={25} />
      </div>

      <h2 className="text-xl font-black uppercase">No Contestants Found</h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-600">
        {search
          ? `We couldn't find any contestant matching "${search}".`
          : "There are currently no live contestants available."}
      </p>

      {search && (
        <button
          onClick={onClear}
          className="mt-6 bg-red-600 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition hover:bg-red-500"
        >
          Clear Search
        </button>
      )}
    </motion.div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center border border-red-900/30 bg-red-950/5 px-6 text-center">
      <div className="mb-5 h-2 w-2 bg-red-600 shadow-[0_0_20px_rgba(220,38,38,0.8)]" />

      <h2 className="text-xl font-black uppercase">Something Went Wrong</h2>

      <p className="mt-2 max-w-md text-sm text-zinc-600">{message}</p>

      <button
        onClick={onRetry}
        className="mt-6 flex items-center gap-2 bg-red-600 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition hover:bg-red-500"
      >
        <Loader2 size={14} />
        Try Again
      </button>
    </div>
  );
}
