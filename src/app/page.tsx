import { TypewriterEffectSmoothDemo } from "../components/main2";
import { CardHoverEffectDemo } from "../components/main_mid";
import { FlipWordsDemo } from "../components/main_text";
import Navbar from "../components/Navbar";
import { Footer } from "../components/footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <FlipWordsDemo />
      <CardHoverEffectDemo />
      <TypewriterEffectSmoothDemo />
      <Footer />
    </div>
  );
}
