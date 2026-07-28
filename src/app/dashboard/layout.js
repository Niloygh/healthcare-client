
import AnimatedWrapper from '@/component/dashboard/AnimatedWrapper';
import DashboardAllChildren from '@/component/dashboard/DashboardAllChildren';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardAllChildren>
        <AnimatedWrapper >
          {children}
        </AnimatedWrapper>
      </DashboardAllChildren>
    </div>
  );
}