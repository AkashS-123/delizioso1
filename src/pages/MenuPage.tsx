import { Footer, MenuSection, Navbar } from "../components/site";

export default function MenuPage() {
  return (
    <div className="overflow-x-hidden bg-white font-sans text-cocoa transition-colors dark:bg-night dark:text-stone-100">
      <Navbar active="Menu" />
      <MenuSection title="Menu" page />
      <Footer />
    </div>
  );
}
