import { Hero } from "@/components/hero";
import { AnalyticsBoard } from "@/components/analytics-board"; // Gọi bảng điều khiển ra ánh sáng

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground scroll-smooth">
      {/* Phần mặt tiền Cinematic */}
      <Hero />

      {/* Khu vực hệ thống phân tích BioFresh & Econometrics */}
      <section id="dashboard" className="w-full max-w-[1400px] mx-auto py-10 px-4 md:px-8 border-t border-white/10">
        <AnalyticsBoard />
      </section>
    </main>
  );
}
