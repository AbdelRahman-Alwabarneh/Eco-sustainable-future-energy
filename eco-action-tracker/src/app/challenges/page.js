import EnhancedInteractiveText from "../../components/EnhancedInteractiveText";
import KineticEnergyDashboard from "../../components/KineticEnergyDashboard";

export default function Home() {
  return (
    <div>
      {/* Enhanced Interactive Text Component */}
      <EnhancedInteractiveText />

      {/* Challenge Progress Component */}
      <KineticEnergyDashboard />
    </div>
  );
}
