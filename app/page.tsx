import Image from "next/image";
import { ArrowUpRight, Menu, Plus } from "lucide-react";

const editorial = [
  { name: "The silk scarf", note: "A quiet statement", price: "₫890.000", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=85&fit=crop" },
  { name: "The everyday set", note: "Made for movement", price: "₫1.450.000", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=85&fit=crop" },
  { name: "The evening edit", note: "An occasion, reimagined", price: "₫1.190.000", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=85&fit=crop" },
];

const craft = [
  { n: "01", title: "A considered beginning", copy: "Every piece starts with a clear idea: fewer things, made with greater intention." },
  { n: "02", title: "The hand of the maker", copy: "We work with skilled Vietnamese artisans who understand the character of natural silk." },
  { n: "03", title: "Made to be lived in", copy: "Soft structure, thoughtful details and pieces that become more personal over time." },
];

export default function MaisonAtelierPage() {
  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#f3efe7] text-[#29251f]">
      <div className="flex items-center justify-center bg-[#29251f] px-4 py-2.5 text-center text-[9px] tracking-[.2em] text-[#f3efe7] sm:text-[10px]">COMPLIMENTARY DELIVERY ON ORDERS OVER ₫1.500.000</div>
      <header className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 sm:px-10 lg:px-16">
        <a href="#collection" className="text-[9px] tracking-[.16em] text-[#8d8376]">VIETNAM · SILK HOUSE</a>
        <a href="#top" className="font-serif text-xl tracking-[.14em] sm:text-2xl">MAISON ATELIER</a>
        <nav className="hidden items-center gap-8 text-[9px] tracking-[.15em] md:flex"><a href="#collection">COLLECTION</a><a href="#atelier">OUR ATELIER</a><a href="#journal">JOURNAL</a><a href="#collection" className="border-b border-[#29251f] pb-1">SHOP THE EDIT ↗</a></nav>
        <button aria-label="Open menu" className="md:hidden"><Menu size={19}/></button>
      </header>

      <section className="mx-auto grid max-w-[1440px] gap-8 px-5 pb-16 sm:px-10 lg:grid-cols-[.78fr_1.22fr] lg:items-center lg:gap-14 lg:px-16 lg:pb-24">
        <div className="relative z-10 py-8 lg:py-16">
          <p className="text-[9px] tracking-[.25em] text-[#9c7654]">OBJECTS OF QUIET BEAUTY · EST. 2024</p>
          <h1 className="mt-7 max-w-[650px] font-serif text-[clamp(3.6rem,7.5vw,7.5rem)] leading-[.88] tracking-[-.055em]">The art of<br/><em className="font-normal">wearing</em><br/>less.</h1>
          <p className="mt-8 max-w-[330px] text-[13px] leading-7 text-[#746b60]">A modern expression of Vietnamese silk. Considered silhouettes, tactile textures and pieces made to stay in your wardrobe.</p>
          <div className="mt-9 flex flex-wrap items-center gap-6"><a href="#collection" className="inline-flex items-center gap-7 border border-[#29251f] px-6 py-4 text-[9px] tracking-[.17em] transition hover:bg-[#29251f] hover:text-[#f3efe7]">DISCOVER THE COLLECTION <ArrowUpRight size={14}/></a><span className="text-[9px] tracking-[.13em] text-[#8b8175]">01 / 03 — THE SILK EDIT</span></div>
        </div>
        <div className="relative min-h-[480px] overflow-hidden bg-[#d8cbb9] sm:min-h-[650px] lg:min-h-[760px]">
          <Image src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800&q=90&fit=crop" alt="Editorial fashion portrait in a sculptural neutral outfit" fill priority unoptimized sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-[50%_35%]"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#211c17]/35 via-transparent to-transparent"/>
          <div className="absolute bottom-6 left-6 flex items-end justify-between text-white sm:bottom-9 sm:left-9 sm:right-9"><div><p className="text-[8px] tracking-[.22em]">THE SPRING / SUMMER STORY</p><p className="mt-2 font-serif text-2xl sm:text-3xl">Softness, in form.</p></div><span className="text-[9px] tracking-[.18em]">VIEW STORY ↗</span></div>
          <span className="absolute right-5 top-5 border border-white/60 px-3 py-2 text-[8px] tracking-[.18em] text-white">MADE IN VIETNAM</span>
        </div>
      </section>

      <section id="collection" className="border-y border-[#d9d1c5] px-5 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[1312px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="text-[9px] tracking-[.23em] text-[#9c7654]">THE MAISON SELECTION</p><h2 className="mt-3 font-serif text-4xl tracking-[-.04em] sm:text-6xl">Pieces with presence.</h2></div><a href="#atelier" className="inline-flex items-center gap-3 text-[9px] tracking-[.15em]">EXPLORE OUR APPROACH <ArrowUpRight size={13}/></a></div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">{editorial.map((item, i) => <article key={item.name} className={i === 1 ? "lg:mt-14" : ""}><div className="group relative aspect-[4/5] overflow-hidden bg-[#e4ddd2]"><Image src={item.image} alt={item.name} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.045]"/><span className="absolute left-4 top-4 bg-[#f3efe7] px-3 py-2 text-[8px] tracking-[.16em]">0{i+1} / MAISON</span><button aria-label={`Explore ${item.name}`} className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-[#f3efe7] transition hover:bg-[#29251f] hover:text-white"><Plus size={17}/></button></div><div className="flex items-start justify-between gap-3 py-4"><div><h3 className="font-serif text-xl">{item.name}</h3><p className="mt-1 text-[10px] text-[#8a8176]">{item.note}</p></div><span className="pt-1 text-[10px] tracking-[.08em]">{item.price}</span></div></article>)}</div>
        </div>
      </section>

      <section id="atelier" className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:px-16 lg:py-28">
        <div><p className="text-[9px] tracking-[.23em] text-[#9c7654]">A NOTE ON CRAFT</p><h2 className="mt-5 max-w-lg font-serif text-5xl leading-[.98] tracking-[-.045em] sm:text-7xl">Tradition,<br/><em className="font-normal">without</em><br/>nostalgia.</h2><p className="mt-7 max-w-sm text-[13px] leading-7 text-[#746b60]">We believe heritage should be felt, not simply displayed. Our approach brings the soul of silk into a contemporary everyday language.</p><a href="mailto:hello@maisonatelier.example" className="mt-8 inline-flex items-center gap-4 border-b border-[#29251f] pb-2 text-[9px] tracking-[.17em]">MEET THE ATELIER <ArrowUpRight size={13}/></a></div>
        <div className="grid content-center">{craft.map((item) => <div key={item.n} className="grid grid-cols-[50px_1fr] gap-5 border-t border-[#d9d1c5] py-7"><span className="pt-1 text-[9px] tracking-[.18em] text-[#a27c58]">{item.n}</span><div><h3 className="font-serif text-2xl">{item.title}</h3><p className="mt-2 max-w-md text-[12px] leading-6 text-[#81776c]">{item.copy}</p></div></div>)}</div>
      </section>
      <section id="journal" className="bg-[#e7dfd3] px-5 py-12 text-center sm:px-10 lg:px-16"><p className="text-[9px] tracking-[.22em] text-[#9c7654]">LETTERS FROM THE ATELIER</p><p className="mx-auto mt-4 max-w-2xl font-serif text-3xl leading-tight sm:text-5xl">“The things we keep should mean something.”</p><a href="mailto:hello@maisonatelier.example" className="mt-7 inline-flex items-center gap-3 border-b border-[#29251f] pb-2 text-[9px] tracking-[.17em]">JOIN OUR NOTES <ArrowUpRight size={13}/></a></section>
      <footer className="bg-[#29251f] px-5 py-10 text-[#f3efe7] sm:px-10 lg:px-16"><div className="mx-auto flex max-w-[1312px] flex-wrap items-center justify-between gap-6"><div><p className="font-serif text-xl tracking-[.14em]">MAISON ATELIER</p><p className="mt-2 text-[8px] tracking-[.18em] text-white/50">A CONTEMPORARY SILK HOUSE · VIETNAM</p></div><span className="text-[9px] tracking-[.15em] text-white/60">MADE WITH INTENTION · VIETNAM</span><span className="text-[8px] tracking-[.16em] text-white/40">© 2026 MAISON ATELIER</span></div></footer>
    </main>
  );
}
