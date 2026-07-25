"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Search } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import type { Destination } from "@/types";

export function SearchWidget({ destinations }: { destinations: Destination[] }) {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (guests) params.set("guests", guests);
    router.push(`/hotels?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur sm:grid-cols-2 sm:p-5 lg:grid-cols-5 lg:items-end"
    >
      <Select
        label="Destination"
        name="destination"
        placeholder="Anywhere in India"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        options={destinations.map((d) => ({ value: d.slug, label: `${d.name}, ${d.state ?? ""}`.trim() }))}
      />
      <Input
        label="Check-in"
        name="checkin"
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
      />
      <Input
        label="Check-out"
        name="checkout"
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
      />
      <Input
        label="Guests"
        name="guests"
        type="number"
        min={1}
        value={guests}
        onChange={(e) => setGuests(e.target.value)}
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90"
      >
        <Search size={16} />
        Search
      </button>
    </form>
  );
}
