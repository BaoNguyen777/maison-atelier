import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, ShieldCheck, Truck } from "lucide-react";

const products = [
  { id: "01", name: "Silk Everyday Shirt", category: "READY TO WEAR", price: "₫1.890.000", note: "Mulberry silk · Sand", badge: "BESTSELLER", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1000&q=88&fit=crop" },
  { id: "02", name: "The Heritage Scarf", category: "SILK ACCESSORIES", price: "₫890.000", note: "100% silk · Botanical print", badge: "SIGNATURE", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1000&q=88&fit=crop" },
  { id: "03", name: "Fluid Wide-Leg Trousers", category: "READY TO WEAR", price: "₫2.150.000", note: "Silk blend · Deep olive", badge: "NEW", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&q=88&fit=crop" },
  { id: "04", name: "Evening Silk Set", category: "THE OCCASION EDIT", price: "₫3.490.000", note: "Pure silk · Midnight", badge: "LIMITED", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=88&fit=crop" },
];

const benefits = [
  { icon: ShieldCheck, title: "Quality, considered", copy: "Thoughtful materials and carefully finished details." },
  { icon: Truck, title: "Complimentary delivery", copy: "Free nationwide shipping on orders over ₫1.500.000." },
  { icon: Check, title: "Made to last", copy: "Timeless pieces designed to be worn, cared for and kept." },
];

export default function MaisonAtelierPage() {
  return (
    <main id="top" className="min-h-screen bg-[#f7f5f0] text-[#24221e]">
      <div className="bg-[#29251f] px-4 py-2.5 text-center text-[9px] tracking-[.16em] text-white">COMPLIMENTARY SHIPPING ON ORDERS OVER ₫1.500.000 <span className="mx-2 text-white/40">·</span> MADE IN VIETNAM</div>
      <header className="sticky top-0 z-40 border-b border-[#e8e2d8] bg-[#f7f5f0]/95 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-14">
          
          <nav className="flex items-center gap-3 text-[8px] tracking-[.1em] sm:gap-6 sm:text-[10px]"><a href="#shop" className="hover:text-[#9b7756]">SHOP</a><a href="#story" className="hover:text-[#9b7756]">OUR STORY</a></nav>
          <a href="#top" className="absolute left-1/2 -translate-x-1/2 font-serif text-[21px] tracking-[.14em] sm:text-2xl">MAISON ATELIER</a>
          <a href="#shop" className="inline-flex items-center gap-2 text-[9px] tracking-[.13em]">DISCOVER <ArrowUpRight size={13}/></a>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] lg:min-h-[650px] lg:grid-cols-[.82fr_1.18fr]">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
          <p className="text-[9px] tracking-[.22em] text-[#9b7756]">THE NEW SILK WARDROBE · COLLECTION 01</p>
          <h1 className="mt-7 font-serif text-[clamp(3.7rem,6.5vw,6.7rem)] leading-[.91] tracking-[-.055em]">Everyday<br/><em className="font-normal">silk.</em><br/>Made special.</h1>
          <p className="mt-7 max-w-[390px] text-[13px] leading-7 text-[#777066]">Modern Vietnamese silk essentials. Easy silhouettes, considered details and natural texture made for the way you live now.</p>
          <div className="mt-9 flex flex-wrap items-center gap-5"><a href="#shop" className="inline-flex items-center gap-8 bg-[#29251f] px-6 py-4 text-[9px] tracking-[.14em] text-white transition hover:bg-[#80674f]">SHOP THE COLLECTION <ArrowRight size={14}/></a><span className="text-[9px] tracking-[.1em] text-[#8d857a]">01 — 04 / NEW ARRIVALS</span></div>
          <div className="mt-12 grid max-w-[410px] grid-cols-3 gap-4 border-t border-[#ded7cc] pt-5"><div><p className="font-serif text-2xl">100%</p><p className="mt-1 text-[8px] tracking-[.12em] text-[#8d857a]">SILK FEEL</p></div><div><p className="font-serif text-2xl">Local</p><p className="mt-1 text-[8px] tracking-[.12em] text-[#8d857a]">CRAFTED</p></div><div><p className="font-serif text-2xl">Timeless</p><p className="mt-1 text-[8px] tracking-[.12em] text-[#8d857a]">DESIGN</p></div></div>
        </div>
        <div className="relative min-h-[470px] bg-[#ded5c8] sm:min-h-[620px] lg:min-h-[720px]"><Image src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800&q=90&fit=crop" alt="Modern silk fashion editorial" fill priority unoptimized sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-[50%_32%]"/><div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"/><div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white sm:bottom-10 sm:left-10 sm:right-10"><div><p className="text-[8px] tracking-[.2em]">THE NEW SEASON</p><p className="mt-2 font-serif text-3xl">A softer statement.</p></div><span className="text-[9px] tracking-[.14em]">EXPLORE ↗</span></div></div>
      </section>

      <section className="border-y border-[#e7e0d6] bg-[#efebe3]"><div className="mx-auto grid max-w-[1320px] gap-6 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-14">{benefits.map(({icon: Icon,title,copy})=><div key={title} className="flex items-start gap-4"><Icon size={18} strokeWidth={1.4} className="mt-1 text-[#9b7756]"/><div><h2 className="text-[10px] tracking-[.1em]">{title}</h2><p className="mt-1 text-[11px] leading-5 text-[#82796e]">{copy}</p></div></div>)}</div></section>

      <section id="shop" className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="text-[9px] tracking-[.2em] text-[#9b7756]">CURATED FOR YOUR EVERYDAY</p><h2 className="mt-3 font-serif text-4xl tracking-[-.045em] sm:text-6xl">Shop the collection.</h2><p className="mt-3 text-[12px] text-[#81786e]">Pieces to wear on repeat, made with a lighter touch.</p></div><a href="#story" className="inline-flex items-center gap-3 border-b border-[#29251f] pb-2 text-[9px] tracking-[.12em]">DISCOVER OUR SILK <ArrowUpRight size={13}/></a></div>
        <div className="mt-8 flex items-center justify-between border-t border-[#e2dbd1] pt-4 text-[9px] tracking-[.12em]"><span>THE EDIT / 01—04</span><span className="text-[#8b8278]">DESIGNED IN VIETNAM</span></div>
        <div className="mt-7 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{products.map((product)=><article key={product.id} className="group"><a href="#contact" className="block"><div className="relative aspect-[4/5] overflow-hidden bg-[#e9e3da]"><Image src={product.image} alt={product.name} fill unoptimized sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-700 group-hover:scale-[1.04]"/><span className="absolute left-3 top-3 bg-[#f7f5f0] px-3 py-2 text-[8px] tracking-[.12em]">{product.badge}</span><span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-[#f7f5f0] transition group-hover:bg-[#29251f] group-hover:text-white"><ArrowUpRight size={16}/></span></div><div className="flex items-start justify-between gap-3 pt-4"><div><p className="text-[8px] tracking-[.14em] text-[#9b7756]">{product.category}</p><h3 className="mt-2 font-serif text-[20px]">{product.name}</h3><p className="mt-1 text-[10px] text-[#8b8278]">{product.note}</p></div><span className="pt-5 text-[10px] whitespace-nowrap">{product.price}</span></div></a><a href="#contact" className="mt-4 inline-flex w-full items-center justify-between border border-[#d9d1c6] px-4 py-3 text-[8px] tracking-[.13em] transition hover:border-[#29251f] hover:bg-[#29251f] hover:text-white">VIEW PRODUCT <ArrowUpRight size={13}/></a></article>)}</div>
      </section>

      <section id="story" className="bg-[#e9e2d7]"><div className="mx-auto grid max-w-[1440px] lg:grid-cols-2"><div className="relative min-h-[380px] sm:min-h-[540px]"><Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1400&q=88&fit=crop" alt="Silk-inspired contemporary fashion and craftsmanship" fill unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/></div><div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20"><p className="text-[9px] tracking-[.2em] text-[#9b7756]">THE MAISON POINT OF VIEW</p><h2 className="mt-5 max-w-lg font-serif text-5xl leading-[.98] tracking-[-.04em] sm:text-7xl">A natural feel.<br/><em className="font-normal">A modern form.</em></h2><p className="mt-7 max-w-md text-[13px] leading-7 text-[#766e64]">We bring the character of silk into pieces that feel effortless to wear. A focus on touch, movement and thoughtful construction — designed in Vietnam for a wardrobe that feels like your own.</p><div className="mt-8 space-y-3 text-[10px] tracking-[.08em] text-[#5f584f]"><p>— Carefully selected fabrics</p><p>— Considered cuts and finishing</p><p>— Small collections, made with intention</p></div><a href="#shop" className="mt-9 inline-flex items-center gap-4 text-[9px] tracking-[.15em]">FIND YOUR PIECE <ArrowRight size={14}/></a></div></div></section>

      <section id="contact" className="px-5 py-16 text-center sm:px-8 lg:px-14 lg:py-20"><p className="text-[9px] tracking-[.2em] text-[#9b7756]">NEED A LITTLE HELP?</p><h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Find the piece that feels like you.</h2><p className="mx-auto mt-4 max-w-lg text-[12px] leading-6 text-[#82796e]">Explore the collection and discover considered essentials for everyday dressing.</p><a href="#shop" className="mt-7 inline-flex items-center gap-7 bg-[#29251f] px-7 py-4 text-[9px] tracking-[.14em] text-white hover:bg-[#80674f]">CONTINUE SHOPPING <ArrowRight size={14}/></a></section>
      <footer className="bg-[#29251f] px-5 py-10 text-[#f7f5f0] sm:px-8 lg:px-14"><div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-7"><div><p className="font-serif text-xl tracking-[.14em]">MAISON ATELIER</p><p className="mt-2 text-[8px] tracking-[.16em] text-white/50">CONTEMPORARY SILK · VIETNAM</p></div><div className="flex gap-6 text-[9px] tracking-[.12em] text-white/65"><a href="#shop">SHOP</a><a href="#story">OUR STORY</a><a href="#contact">CONTACT</a></div><span className="text-[8px] tracking-[.14em] text-white/40">© 2026 MAISON ATELIER</span></div></footer>
    </main>
  );
}
