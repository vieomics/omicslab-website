import Contact from "@/components/Contact";
import { Dictionary } from "@/i18n";

export default function ContactView({ dict }: { dict: Dictionary }) {
  return (
    <>
      <Contact dict={dict} fullHeight={true} />
    </>
  );
}
