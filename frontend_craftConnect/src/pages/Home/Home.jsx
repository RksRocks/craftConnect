const Hero = lazy(() => import("./Hero"));
function Home() {
  return (
    <div className="px-5 md:px-12 lg:px-20">
      <Hero />
    </div>
  );
}

export default Home;
