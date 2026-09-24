import About from "@/components/About";
import Team from "@/components/Team";
import { Dictionary } from "@/i18n";

export default function AboutView({ dict }: { dict: Dictionary }) {
  return (
    <main>
      <About dict={dict} />
      <Team dict={dict} />
    </main>
  );
}
