import { lazy, Suspense } from "react";
import Loader from "../../components/Loader/Loader";
const Hero = lazy(() => import("./Hero"));
function Home() {
  return (
    <div className="px-5 md:px-12 lg:px-20">
      <Suspense fallback={<Loader />}>
        <Hero />
      </Suspense>
    </div>
  );
}

export default Home;
