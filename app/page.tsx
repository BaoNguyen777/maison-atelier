"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, Minus, Plus, ShoppingBag,
  Sparkles, X, Menu, Leaf, Shirt, Scissors,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  category: string;
  group: "Trang phục" | "Phụ kiện";
  price: number;
  material: string;
  color: string;
  badge?: string;
  image: string;
  description: string;
};

const products: Product[] = [
  { id: "01", name: "Áo lụa dáng relaxed", category: "TRANG PHỤC", group: "Trang phục", price: 1890000, material: "Lụa tơ tằm · mẫu màu champagne", color: "Champagne", badge: "BESTSELLER", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1000&q=88&fit=crop", description: "Phom dáng thoải mái, dễ phối cùng quần âu hoặc denim. Một thiết kế tối giản cho tủ đồ hằng ngày." },
  { id: "02", name: "Khăn lụa Botanical", category: "PHỤ KIỆN", group: "Phụ kiện", price: 890000, material: "Lụa · họa tiết botanical", color: "Botanical", badge: "SIGNATURE", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1000&q=88&fit=crop", description: "Chiếc khăn vuông tạo điểm nhấn linh hoạt: quàng cổ, buộc tóc hoặc tô điểm cho túi xách." },
  { id: "03", name: "Quần lụa ống rộng", category: "TRANG PHỤC", group: "Trang phục", price: 2150000, material: "Lụa pha · xanh olive", color: "Olive", badge: "NEW SEASON", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&q=88&fit=crop", description: "Đường rủ mềm và phom ống rộng tạo cảm giác phóng khoáng, phù hợp cả ngày làm việc lẫn dịp cuối tuần." },
  { id: "04", name: "Set lụa Evening", category: "TRANG PHỤC", group: "Trang phục", price: 3490000, material: "Lụa · xanh midnight", color: "Midnight", badge: "LIMITED", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=88&fit=crop", description: "Bộ đôi thanh lịch dành cho những buổi tối đặc biệt. Có thể mặc cùng nhau hoặc tách riêng để phối đồ." },
  { id: "05", name: "Áo lụa cổ đổ", category: "TRANG PHỤC", group: "Trang phục", price: 1690000, material: "Lụa · màu ivory", color: "Ivory", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=88&fit=crop", description: "Chi tiết cổ đổ nhẹ nhàng kết hợp phom áo gọn gàng, tạo nét mềm mại mà không cầu kỳ." },
  { id: "06", name: "Khăn lụa Heritage", category: "PHỤ KIỆN", group: "Phụ kiện", price: 990000, material: "Lụa · họa tiết di sản", color: "Heritage", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=88&fit=crop", description: "Phụ kiện điểm xuyết sắc màu và cá tính cho những bộ trang phục tối giản." },
];

const money = (value: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

export default function MaisonAtelierPage() {
  const [filter, setFilter] = useState("Tất cả");
  const [selected, setSelected] = useState<Product | null>(null);
  const [bag, setBag] = useState<Record<string, number>>({});
  const [bagOpen, setBagOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!selected && !bagOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        setBagOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selected, bagOpen]);

  const visibleProducts = useMemo(
    () => filter === "Tất cả" ? products : products.filter((product) => product.group === filter),
    [filter],
  );
  const bagItems = products.filter((product) => (bag[product.id] ?? 0) > 0);
  const itemCount = Object.values(bag).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = bagItems.reduce((sum, product) => sum + product.price * bag[product.id], 0);

  function addToBag(product: Product) {
    setBag((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    setNotice(product.name + " đã được thêm vào túi.");
    setSelected(null);
    setBagOpen(true);
  }

  function changeQuantity(id: string, delta: number) {
    setBag((current) => {
      const next = { ...current, [id]: Math.max(0, (current[id] ?? 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  }

  async function copyOrder() {
    const summary = [
      "MAISON ATELIER — YÊU CẦU ĐẶT HÀNG",
      ...bagItems.map((product) => product.name + " × " + bag[product.id] + " — " + money(product.price * bag[product.id])),
      "Tạm tính: " + money(subtotal),
      "Vui lòng xác nhận tồn kho, kích cỡ và phí vận chuyển.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      setNotice("Đã sao chép yêu cầu đặt hàng. Hãy gửi nội dung này cho Maison Atelier để xác nhận.");
    } catch {
      setNotice("Trình duyệt chưa cấp quyền sao chép. Vui lòng thử lại hoặc sao chép thông tin thủ công.");
    }
  }

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#f1f1eb] text-[#1c211b] selection:bg-[#c9f36a] selection:text-[#1c211b]">
      <div className="bg-[#1c211b] px-4 py-2.5 text-center text-[8px] tracking-[.2em] text-white/75 sm:text-[9px]">
        MAISON ATELIER <span className="mx-2 text-[#c9f36a]">/</span> LỤA VIỆT · NGÔN NGỮ ĐƯƠNG ĐẠI
      </div>

      <header className="sticky top-0 z-40 border-b border-[#d9dcd1] bg-[#f1f1eb]/95 backdrop-blur">
        <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-14">
          <a href="#top" className="text-[12px] font-black tracking-[-.055em]">MAISON ATELIER<span className="text-[#829d3c]">®</span></a>
          <nav className="hidden items-center gap-8 text-[9px] tracking-[.15em] md:flex">
            <a href="#shop" className="transition hover:text-[#829d3c]">BỘ SƯU TẬP</a>
            <a href="#story" className="transition hover:text-[#829d3c]">CÂU CHUYỆN</a>
            <a href="#craft" className="transition hover:text-[#829d3c]">CHẤT LIỆU & CHĂM SÓC</a>
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setBagOpen(true)} className="inline-flex min-h-10 items-center gap-3 border border-[#cbd0c2] px-3 text-[9px] tracking-[.12em] transition hover:bg-[#c9f36a]">
              <ShoppingBag size={15}/> <span className="hidden sm:inline">TÚI HÀNG</span><span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#1c211b] px-1 text-[9px] text-white">{itemCount}</span>
            </button>
            <button type="button" onClick={() => setMobileMenu((value) => !value)} aria-label="Mở menu" className="grid h-10 w-10 place-items-center border border-[#cbd0c2] md:hidden"><Menu size={17}/></button>
          </div>
        </div>
        {mobileMenu && <nav className="grid gap-4 border-t border-[#d9dcd1] bg-[#f1f1eb] px-5 py-5 text-[10px] tracking-[.14em] md:hidden">
          <a href="#shop" onClick={() => setMobileMenu(false)}>BỘ SƯU TẬP</a><a href="#story" onClick={() => setMobileMenu(false)}>CÂU CHUYỆN</a><a href="#craft" onClick={() => setMobileMenu(false)}>CHẤT LIỆU & CHĂM SÓC</a>
        </nav>}
      </header>

      <section className="mx-auto max-w-[1500px] px-5 pb-14 pt-14 sm:px-8 lg:px-14 lg:pb-20 lg:pt-24">
        <div className="flex items-center gap-3 text-[8px] tracking-[.2em] text-[#6e7a5c] sm:text-[9px]"><span className="h-2 w-2 rounded-full bg-[#91ad43]"/> CONTEMPORARY SILK · VIETNAM · COLLECTION 01</div>
        <div className="mt-9 grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <h1 className="max-w-[1000px] text-[clamp(4rem,11.5vw,11.5rem)] font-semibold leading-[.78] tracking-[-.095em]">Mặc lụa<br/>theo cách<br/><span className="font-serif font-normal italic text-[#829d3c]">của bạn.</span></h1>
          <div className="max-w-md pb-2 lg:justify-self-end">
            <p className="text-[14px] leading-7 text-[#687064]">Vẻ mềm mại của lụa Việt, được diễn giải bằng phom dáng đương đại. Ít phô trương hơn. Nhiều cá tính hơn. Dành cho nhịp sống hôm nay.</p>
            <a href="#shop" className="mt-8 inline-flex items-center gap-8 border-b border-[#1c211b] pb-3 text-[9px] tracking-[.15em] transition hover:text-[#829d3c]">KHÁM PHÁ BỘ SƯU TẬP <ArrowRight size={14}/></a>
          </div>
        </div>
        <div className="mt-14 grid gap-5 border-t border-[#c9cdc1] pt-5 sm:grid-cols-3">
          <div><p className="text-[8px] tracking-[.18em] text-[#84934f]">01 / FEEL</p><p className="mt-2 text-[11px] text-[#6c7468]">Tôn trọng cảm giác tự nhiên của chất liệu.</p></div>
          <div><p className="text-[8px] tracking-[.18em] text-[#84934f]">02 / FORM</p><p className="mt-2 text-[11px] text-[#6c7468]">Phom dáng linh hoạt, không lỗi nhịp sống.</p></div>
          <div><p className="text-[8px] tracking-[.18em] text-[#84934f]">03 / LIVE</p><p className="mt-2 text-[11px] text-[#6c7468]">Mặc đẹp theo cách rất riêng của bạn.</p></div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-0 px-5 sm:px-8 lg:grid-cols-[.78fr_1.22fr] lg:px-14">
        <div className="relative min-h-[420px] overflow-hidden bg-[#d8dbd0] sm:min-h-[600px]">
          <Image src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1400&q=90&fit=crop" alt="Editorial thời trang lụa với phom dáng mềm mại" fill priority unoptimized sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover object-[50%_30%] transition duration-700 hover:scale-[1.02]"/>
          <span className="absolute left-5 top-5 bg-[#f1f1eb] px-3 py-2 text-[8px] tracking-[.16em]">THE SILK EDIT / 01</span>
        </div>
        <div className="flex min-h-[420px] flex-col justify-between bg-[#1c211b] p-7 text-[#f1f1eb] sm:min-h-[600px] sm:p-12 lg:p-16">
          <div className="flex items-center justify-between text-[8px] tracking-[.18em] text-[#c9f36a]"><span>THE ART OF EVERYDAY ELEGANCE</span><Sparkles size={17}/></div>
          <div className="py-12">
            <p className="max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-.04em] sm:text-6xl">“Sự tinh tế không nằm ở việc gây chú ý, mà ở cảm giác bạn mang theo.”</p>
            <p className="mt-7 max-w-sm text-[11px] leading-6 text-white/55">Một lựa chọn chất liệu, một đường cắt vừa vặn, một chuyển động tự nhiên — những điều nhỏ tạo nên phong cách bền lâu.</p>
          </div>
          <div className="flex items-end justify-between border-t border-white/20 pt-5"><span className="text-[8px] tracking-[.16em] text-white/45">MAISON ATELIER · OUR POINT OF VIEW</span><a href="#story" aria-label="Đọc câu chuyện Maison" className="grid h-11 w-11 place-items-center rounded-full bg-[#c9f36a] text-[#1c211b] transition hover:rotate-45"><ArrowUpRight size={17}/></a></div>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5 border-b border-[#c9cdc1] pb-5">
          <div><p className="text-[8px] tracking-[.2em] text-[#84934f]">MAISON SELECTION / 2026</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.065em] sm:text-6xl">Những món đồ có lý do.</h2></div>
          <p className="max-w-xs text-[11px] leading-6 text-[#6c7468]">Thiết kế được tuyển chọn để đi cùng bạn qua nhiều khoảnh khắc — không chỉ một mùa.</p>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc sản phẩm">
            {["Tất cả", "Trang phục", "Phụ kiện"].map((item) => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={"min-h-10 px-4 text-[9px] tracking-[.12em] transition " + (filter === item ? "bg-[#1c211b] text-[#c9f36a]" : "border border-[#cbd0c2] text-[#687064] hover:border-[#1c211b]")}>{item.toUpperCase()}</button>)}
          </div>
          <span className="text-[8px] tracking-[.16em] text-[#7b8377]">{visibleProducts.length.toString().padStart(2, "0")} SELECTED PIECES</span>
        </div>
        <div className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-12">
          {visibleProducts.map((product, index) => <article key={product.id} className={"group " + (index % 3 === 1 ? "lg:col-span-5 lg:mt-20" : "lg:col-span-7")}>
            <button type="button" onClick={() => setSelected(product)} className="block w-full text-left" aria-label={"Xem chi tiết " + product.name}>
              <div className="relative aspect-[1.05/1] overflow-hidden bg-[#dfe1d8]">
                <Image src={product.image} alt={product.name} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 60vw" className="object-cover transition duration-700 group-hover:scale-[1.035]"/>
                {product.badge && <span className="absolute left-4 top-4 bg-[#f1f1eb] px-3 py-2 text-[8px] tracking-[.15em]">{product.badge}</span>}
                <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-[#c9f36a] text-[#1c211b] transition group-hover:rotate-45"><ArrowUpRight size={17}/></span>
              </div>
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#c9cdc1] py-4">
                <div><p className="text-[8px] tracking-[.18em] text-[#82934a]">{product.category} / {product.color.toUpperCase()}</p><h3 className="mt-2 font-serif text-2xl sm:text-3xl">{product.name}</h3><p className="mt-2 text-[10px] text-[#737b70]">{product.material}</p></div>
                <span className="pt-1 text-[11px] whitespace-nowrap">{money(product.price)}</span>
              </div>
            </button>
            <button type="button" onClick={() => addToBag(product)} className="mt-3 inline-flex min-h-11 w-full items-center justify-between border border-[#cbd0c2] px-4 py-3 text-[9px] tracking-[.14em] transition hover:border-[#1c211b] hover:bg-[#1c211b] hover:text-[#c9f36a]">THÊM VÀO TÚI <Plus size={14}/></button>
          </article>)}
        </div>
        <p className="mt-8 text-[9px] leading-5 text-[#8a9185]">* Hình ảnh, mô tả, chất liệu và giá trong bản demo mang tính minh họa; cần thay bằng thông tin sản phẩm thực tế trước khi kinh doanh.</p>
      </section>

      <section id="story" className="scroll-mt-24 bg-[#e5e8dd] px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
        <div className="mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-[8px] tracking-[.2em] text-[#82934a]">A MATERIAL WITH A MEMORY</p><h2 className="mt-4 max-w-lg text-5xl font-semibold leading-[.9] tracking-[-.075em] sm:text-7xl">Di sản<br/>chất liệu.<br/><span className="font-serif font-normal italic text-[#829d3c]">Ngôn ngữ mới.</span></h2><p className="mt-7 max-w-sm text-[12px] leading-6 text-[#6b7467]">Maison Atelier nhìn lụa như một chất liệu sống — mềm, có chuyển động và thay đổi theo cách người mặc lựa chọn.</p></div>
          <div className="grid sm:grid-cols-2">
            <div className="relative min-h-[300px] bg-[#d4d9ce] sm:row-span-2 sm:min-h-[480px]"><Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=88&fit=crop" alt="Trang phục có độ rủ mềm lấy cảm hứng từ lụa" fill unoptimized sizes="(max-width: 640px) 100vw, 40vw" className="object-cover"/></div>
            <div className="border-t border-[#c5cbbd] py-6 sm:px-6"><span className="text-[8px] tracking-[.18em] text-[#82934a]">01 / MATERIAL</span><h3 className="mt-4 font-serif text-3xl">Chạm vào cảm giác.</h3><p className="mt-3 text-[11px] leading-6 text-[#6e776b]">Đề cao bề mặt, độ rủ và sự thoải mái — những yếu tố tạo nên trải nghiệm mặc.</p></div>
            <div className="border-t border-[#c5cbbd] py-6 sm:px-6"><span className="text-[8px] tracking-[.18em] text-[#82934a]">02 / FORM</span><h3 className="mt-4 font-serif text-3xl">Tự do trong phom.</h3><p className="mt-3 text-[11px] leading-6 text-[#6e776b]">Thiết kế tinh giản, dễ kết hợp và đủ linh hoạt cho nhiều hoàn cảnh.</p></div>
          </div>
        </div>
      </section>

      <section id="craft" className="bg-[#1c211b] px-5 py-16 text-[#f1f1eb] sm:px-8 lg:px-14 lg:py-24">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-[8px] tracking-[.2em] text-[#c9f36a]">THOUGHTFUL BY DESIGN</p><h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-[.95] tracking-[-.06em] sm:text-6xl">Đẹp hơn khi<br/><span className="font-serif font-normal italic text-[#c9f36a]">được chăm chút.</span></h2></div><p className="max-w-xs text-[11px] leading-6 text-white/55">Một món đồ tốt xứng đáng được sử dụng lâu dài. Bắt đầu từ cách chọn, mặc và bảo quản chất liệu.</p></div>
          <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-3">
            <article className="bg-[#1c211b] p-6 sm:p-8"><Leaf size={20} className="text-[#c9f36a]"/><p className="mt-7 text-[8px] tracking-[.17em] text-[#c9f36a]">01 / CHẤT LIỆU</p><h3 className="mt-3 font-serif text-3xl">Hiểu món đồ.</h3><p className="mt-3 text-[11px] leading-6 text-white/55">Kiểm tra nhãn thành phần và hướng dẫn chăm sóc riêng của từng sản phẩm trước khi sử dụng.</p></article>
            <article className="bg-[#1c211b] p-6 sm:p-8"><Shirt size={20} className="text-[#c9f36a]"/><p className="mt-7 text-[8px] tracking-[.17em] text-[#c9f36a]">02 / SỬ DỤNG</p><h3 className="mt-3 font-serif text-3xl">Mặc tự nhiên.</h3><p className="mt-3 text-[11px] leading-6 text-white/55">Ưu tiên thao tác nhẹ nhàng, tránh ma sát mạnh và làm theo khuyến nghị trên nhãn.</p></article>
            <article className="bg-[#1c211b] p-6 sm:p-8"><Scissors size={20} className="text-[#c9f36a]"/><p className="mt-7 text-[8px] tracking-[.17em] text-[#c9f36a]">03 / BẢO QUẢN</p><h3 className="mt-3 font-serif text-3xl">Giữ nét mềm.</h3><p className="mt-3 text-[11px] leading-6 text-white/55">Cất giữ nơi khô thoáng, tránh ánh nắng trực tiếp kéo dài và không vắt xoắn mạnh.</p></article>
          </div>
        </div>
      </section>

      <section className="bg-[#c9f36a] px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <div className="mx-auto max-w-[1380px]">
          <div className="flex items-center gap-3 text-[8px] tracking-[.2em]"><Sparkles size={16}/> FIND YOUR OWN WAY TO WEAR SILK</div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="max-w-4xl text-[clamp(3.8rem,9vw,9rem)] font-semibold leading-[.82] tracking-[-.09em]">Chọn lụa.<br/>Chọn chính mình.</h2><p className="mt-7 max-w-lg text-[12px] leading-6 text-[#465238]">Khám phá những thiết kế có thể trở thành một phần tự nhiên trong phong cách mỗi ngày.</p></div><a href="#shop" className="inline-flex items-center gap-5 border-b border-[#1c211b] pb-3 text-[10px] tracking-[.14em]">KHÁM PHÁ SẢN PHẨM <ArrowUpRight size={17}/></a></div>
        </div>
      </section>

      <footer className="bg-[#1c211b] px-5 py-9 text-[8px] tracking-[.16em] text-white/50 sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1380px] flex-wrap items-center justify-between gap-5"><span className="text-[11px] font-black tracking-[-.04em] text-white">MAISON ATELIER®</span><span>CONTEMPORARY SILK · VIETNAM</span><div className="flex gap-5"><a href="#shop" className="hover:text-white">COLLECTION</a><a href="#story" className="hover:text-white">STORY</a><a href="#top" className="hover:text-white">BACK TO TOP</a></div><span>© 2026</span></div>
      </footer>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[70] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-3 bg-[#1c211b] px-5 py-3 text-[11px] text-white shadow-xl"><Check size={15} className="shrink-0 text-[#c9f36a]"/>{notice}<button type="button" onClick={() => setNotice("")} aria-label="Đóng thông báo"><X size={14}/></button></div>}

      {selected && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <div role="dialog" aria-modal="true" aria-labelledby="product-title" className="relative grid max-h-[92vh] w-full max-w-4xl overflow-auto bg-[#f1f1eb] sm:grid-cols-2">
          <button type="button" onClick={() => setSelected(null)} aria-label="Đóng chi tiết sản phẩm" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#f1f1eb]"><X size={18}/></button>
          <div className="relative min-h-[300px] bg-[#dfe1d8] sm:min-h-[570px]"><Image src={selected.image} alt={selected.name} fill unoptimized sizes="(max-width: 640px) 100vw, 50vw" className="object-cover"/></div>
          <div className="flex flex-col justify-center p-6 sm:p-10"><p className="text-[9px] tracking-[.18em] text-[#82934a]">{selected.category}</p><h2 id="product-title" className="mt-3 font-serif text-4xl leading-tight">{selected.name}</h2><p className="mt-4 text-lg">{money(selected.price)}</p><p className="mt-6 text-[12px] leading-7 text-[#687064]">{selected.description}</p><div className="mt-7 border-y border-[#cbd0c2] py-4 text-[11px] leading-6"><p><span className="text-[#82934a]">Chất liệu:</span> {selected.material}</p><p><span className="text-[#82934a]">Màu sắc:</span> {selected.color}</p></div><p className="mt-5 text-[10px] leading-5 text-[#7b8377]">Kích cỡ và tình trạng hàng sẽ được xác nhận khi tư vấn đơn hàng.</p><button type="button" onClick={() => addToBag(selected)} className="mt-7 inline-flex min-h-12 items-center justify-between bg-[#1c211b] px-5 text-[9px] tracking-[.13em] text-white transition hover:bg-[#829d3c]">THÊM VÀO TÚI <ShoppingBag size={16}/></button></div>
        </div>
      </div>}

      {bagOpen && <div className="fixed inset-0 z-[60] bg-black/45" onMouseDown={(event) => { if (event.target === event.currentTarget) setBagOpen(false); }}>
        <aside role="dialog" aria-modal="true" aria-labelledby="bag-title" className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-[#f1f1eb] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#cbd0c2] px-6 py-5"><div><p className="text-[9px] tracking-[.16em] text-[#82934a]">MAISON ATELIER</p><h2 id="bag-title" className="mt-1 font-serif text-3xl">Túi hàng ({itemCount})</h2></div><button type="button" onClick={() => setBagOpen(false)} aria-label="Đóng túi hàng" className="grid h-10 w-10 place-items-center"><X size={19}/></button></div>
          <div className="flex-1 overflow-y-auto px-6 py-5">{bagItems.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag size={30} strokeWidth={1}/><p className="mt-5 font-serif text-2xl">Túi hàng đang trống.</p><p className="mt-2 text-[11px] text-[#687064]">Hãy chọn một thiết kế bạn yêu thích.</p><button type="button" onClick={() => { setBagOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-6 border-b border-[#1c211b] pb-1 text-[9px] tracking-[.13em]">KHÁM PHÁ SẢN PHẨM</button></div> :
            <div className="space-y-6">{bagItems.map((product) => <div key={product.id} className="flex gap-4 border-b border-[#d9dcd1] pb-6"><div className="relative h-28 w-24 shrink-0 bg-[#dfe1d8]"><Image src={product.image} alt={product.name} fill unoptimized sizes="96px" className="object-cover"/></div><div className="min-w-0 flex-1"><p className="font-serif text-lg">{product.name}</p><p className="mt-1 text-[10px] text-[#687064]">{product.color}</p><p className="mt-2 text-[11px]">{money(product.price)}</p><div className="mt-3 inline-flex items-center border border-[#cbd0c2]"><button type="button" onClick={() => changeQuantity(product.id, -1)} aria-label={"Giảm số lượng " + product.name} className="grid h-8 w-8 place-items-center"><Minus size={12}/></button><span className="w-7 text-center text-[11px]">{bag[product.id]}</span><button type="button" onClick={() => changeQuantity(product.id, 1)} aria-label={"Tăng số lượng " + product.name} className="grid h-8 w-8 place-items-center"><Plus size={12}/></button></div></div><button type="button" onClick={() => changeQuantity(product.id, -bag[product.id])} aria-label={"Xóa " + product.name + " khỏi túi"} className="self-start p-2 text-[#7b8377] hover:text-[#1c211b]"><X size={15}/></button></div>)}</div>}
          </div>
          {bagItems.length > 0 && <div className="border-t border-[#cbd0c2] px-6 py-6"><div className="flex items-center justify-between text-[11px]"><span>Tạm tính</span><strong>{money(subtotal)}</strong></div><p className="mt-2 text-[10px] leading-5 text-[#7b8377]">Phí vận chuyển và tình trạng sản phẩm sẽ được xác nhận trước khi thanh toán.</p><button type="button" onClick={copyOrder} className="mt-5 flex min-h-12 w-full items-center justify-between bg-[#1c211b] px-5 text-[9px] tracking-[.13em] text-white transition hover:bg-[#829d3c]">SAO CHÉP YÊU CẦU ĐẶT HÀNG <ArrowRight size={15}/></button><button type="button" onClick={() => setBagOpen(false)} className="mt-3 min-h-10 w-full text-[9px] tracking-[.12em] text-[#687064]">TIẾP TỤC MUA SẮM</button></div>}
        </aside>
      </div>}
    </main>
  );
}
