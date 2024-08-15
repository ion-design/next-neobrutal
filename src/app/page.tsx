'use client';
import CommentSection from "@/components/CommentSection";
import AIModelStatsCard from "@/components/ModelInfoCard";
import NBAPlayerPropsTable from "@/components/NBATable";
import PricingPage from "@/components/PricingPage";
import Button from "@/components/ui/Button";
import WeatherCard from "@/components/WeatherCard";
import ProfileForm from "@/components/FormComponent";

export default function Home() {
  return (
    <div className="font-base flex flex-col gap-8">
      <ProfileForm />
    </div>
  )
}