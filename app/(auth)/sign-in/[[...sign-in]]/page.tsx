import { SignIn } from "@clerk/nextjs";
import Header from "@/components/header";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen text-white overflow-hidden">
      <Header />

      {/* Background image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/auth-bg.jpg')" }} // change path to your image
      />

      {/* Overlay (optional for dim effect) */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* SignIn Form */}
      <div className="relative z-10">
        <div className="relative">
          <SignIn />

          {/* Custom overlay to hide "Development mode" */}
          <div className="absolute bottom-0 left-0 w-full h-20 text-black font-bold bg-white z-50 rounded-b-xl flex items-center justify-center text-xl">
            SpotWave
          </div>
        </div>
      </div>
    </div>
  );
}
