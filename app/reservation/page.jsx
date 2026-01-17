import ReservationHero from "@/components/ReservationHero";
import InteractiveFloorPlan from "@/components/InteractiveFloorPlan";

export default function ReservationPage() {
  return (
    <main className="min-h-screen">
      <ReservationHero />
      <InteractiveFloorPlan />
    </main>
  );
}