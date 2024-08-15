'use client';
import WeatherCard from "@/components/WeatherCard";

export default function Home() {
  return (
    <div className="font-base flex flex-col gap-8">
      <WeatherCard />
    </div>
  )
}