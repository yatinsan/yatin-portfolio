import Scene from "@/components/Three/Scene";
import MobileModel from "@/components/Three/MobileModel";
import Hero from "@/components/Sections/Hero";
import Skills from "@/components/Sections/Skills";
import Projects from "@/components/Sections/Projects";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* 3D Background & Interactive Model */}
      <Scene>
        <group position={[3.5, 0, 0]}>
          <MobileModel />
        </group>
      </Scene>

      {/* Sections */}
      <div className="relative z-10">
        <Hero />
        <Skills />
        <Projects />
        
        {/* Footer/Contact CTA */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to build something <br /> <span className="text-blue-500">extraordinary?</span></h2>
            <button className="px-10 py-5 rounded-full accent-gradient font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-blue-500/20">
              Let's Collaborate
            </button>
          </div>
        </section>
      </div>

      {/* Decorative background gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>
    </main>
  );
}
