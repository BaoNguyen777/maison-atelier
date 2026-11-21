"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronLeft, ChevronRight,
  Minus, Plus, ShoppingBag, Sparkles, X,
} from "lucide-react";

type Product = {
  id: string; name: string; category: string; group: "Trang phục" | "Phụ kiện";
  price: number; material: string; color: string; badge?: string; image: string;
  description: string;
};

const products: Product[] = [
  { id: "01", name: "Áo lụa dáng relaxed", category: "TRANG PHỤC", group: "Trang phục", price: 1890000, material: "Lụa tơ tằm · mẫu màu champagne", color: "Champagne", badge: "BÁN CHẠY", image: "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=1000&q=88&fit=crop", description: "Phom dáng thoải mái, dễ phối cùng quần âu hoặc denim. Một thiết kế tối giản cho tủ đồ hằng ngày." },
  { id: "02", name: "Khăn lụa Botanical", category: "PHỤ KIỆN", group: "Phụ kiện", price: 890000, material: "Lụa · họa tiết botanical", color: "Botanical", badge: "SIGNATURE", image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1000&q=88&fit=crop", description: "Chiếc khăn vuông tạo điểm nhấn linh hoạt: quàng cổ, buộc tóc hoặc tô điểm cho túi xách." },
  { id: "03", name: "Quần lụa ống rộng", category: "TRANG PHỤC", group: "Trang phục", price: 2150000, material: "Lụa pha · xanh olive", color: "Olive", badge: "NEW", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1000&q=88&fit=crop", description: "Đường rủ mềm và phom ống rộng tạo cảm giác phóng khoáng, phù hợp cả ngày làm việc lẫn dịp cuối tuần." },
  { id: "04", name: "Set lụa Evening", category: "BỘ SƯU TẬP", group: "Trang phục", price: 3490000, material: "Lụa · xanh midnight", color: "Midnight", badge: "LIMITED", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1000&q=88&fit=crop", description: "Bộ đôi thanh lịch dành cho những buổi tối đặc biệt. Có thể mặc cùng nhau hoặc tách riêng để phối đồ." },
  { id: "05", name: "Áo lụa cổ đổ", category: "TRANG PHỤC", group: "Trang phục", price: 1690000, material: "Lụa · màu ivory", color: "Ivory", image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1000&q=88&fit=crop", description: "Chi tiết cổ đổ nhẹ nhàng kết hợp phom áo gọn gàng, tạo nét mềm mại mà không cầu kỳ." },
  { id: "06", name: "Khăn lụa Heritage", category: "PHỤ KIỆN", group: "Phụ kiện", price: 990000, material: "Lụa · họa tiết di sản", color: "Heritage", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&q=88&fit=crop", description: "Phụ kiện điểm xuyết sắc màu và cá tính cho những bộ trang phục tối giản." },
];

const money = (value: number) => new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);

export default function MaisonAtelierPage() {
  const [filter, setFilter] = useState("Tất cả");
  const [selected, setSelected] = useState<Product | null>(null);
  const [bag, setBag] = useState<Record<string, number>>({});
  const [bagOpen, setBagOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(
    () => filter === "Tất cả" ? products : products.filter((product) => product.group === filter),
    [filter],
  );
  const bagItems = products.filter((product) => (bag[product.id] ?? 0) > 0);
  const itemCount = Object.values(bag).reduce((sum, quantity) => sum + quantity, 0);
  const subtotal = bagItems.reduce((sum, product) => sum + product.price * bag[product.id], 0);

  function addToBag(product: Product) {
    setBag((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    setNotice(`${product.name} đã được thêm vào túi.`);
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
      ...bagItems.map((product) => `${product.name} × ${bag[product.id]} — ${money(product.price * bag[product.id])}`),
      `Tạm tính: ${money(subtotal)}`,
      "Vui lòng xác nhận tồn kho, kích cỡ và phí vận chuyển.",
    ].join("\n");
    try {
      await navigator.clipboard.writeText(summary);
      setNotice("Đã sao chép đơn hàng. Hãy gửi nội dung này cho Maison Atelier để xác nhận.");
    } catch {
      setNotice("Trình duyệt chưa cấp quyền sao chép. Vui lòng thử lại hoặc sao chép thông tin thủ công.");
    }
  }

  return (
    <main id="top" className="min-h-screen overflow-hidden bg-[#f7f5f0] text-[#28241f]">
      <div className="bg-[#29251f] px-4 py-2.5 text-center text-[9px] tracking-[.12em] text-white sm:text-[10px]">
        ƯU ĐÃI GIAO HÀNG TOÀN QUỐC CHO ĐƠN TỪ 1.500.000₫ <span className="mx-2 text-white/40">·</span> TINH THẦN LỤA VIỆT
      </div>

      <header className="sticky top-0 z-40 border-b border-[#e8e2d8] bg-[#f7f5f0]/95 backdrop-blur">
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-5 sm:h-[78px] sm:px-8 lg:px-14">
          <nav aria-label="Điều hướng chính" className="flex items-center gap-4 text-[9px] tracking-[.12em] sm:gap-7 sm:text-[10px]">
            <a href="#shop" className="transition hover:text-[#9b7756]">CỬA HÀNG</a>
            <a href="#story" className="hidden transition hover:text-[#9b7756] sm:inline">CÂU CHUYỆN</a>
          </nav>
          <a href="#top" aria-label="Maison Atelier - về đầu trang" className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-serif text-[19px] tracking-[.12em] sm:text-2xl">MAISON ATELIER</a>
          <button type="button" onClick={() => setBagOpen(true)} className="relative inline-flex min-h-10 items-center gap-2 text-[9px] tracking-[.12em] transition hover:text-[#9b7756] sm:text-[10px]" aria-label={`Mở túi hàng, ${itemCount} sản phẩm`}>
            <ShoppingBag size={17} strokeWidth={1.5} /><span className="hidden sm:inline">TÚI HÀNG</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#29251f] px-1 text-[9px] text-white">{itemCount}</span>
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-[1440px] lg:min-h-[690px] lg:grid-cols-[.82fr_1.18fr]">
        <div className="flex flex-col justify-center px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
          <p className="text-[9px] tracking-[.2em] text-[#9b7756] sm:text-[10px]">BỘ SƯU TẬP MỚI · THE SILK EDIT</p>
          <h1 className="mt-6 font-serif text-[clamp(3.4rem,6.5vw,6.4rem)] leading-[.91] tracking-[-.055em]">Chạm vào<br/><em className="font-normal">chất lụa.</em><br/>Sống tinh tế.</h1>
          <p className="mt-7 max-w-[390px] text-[13px] leading-7 text-[#777066]">Những thiết kế lấy cảm hứng từ vẻ mềm mại của lụa Việt — phom dáng hiện đại, dễ ứng dụng và đủ tinh tế để đồng hành mỗi ngày.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a href="#shop" className="inline-flex min-h-12 items-center gap-7 bg-[#29251f] px-6 py-4 text-[9px] tracking-[.13em] text-white transition hover:bg-[#80674f]">KHÁM PHÁ BỘ SƯU TẬP <ArrowRight size={14}/></a>
            <span className="text-[9px] tracking-[.1em] text-[#8d857a]">THIẾT KẾ ĐƯƠNG ĐẠI · CẢM HỨNG VIỆT</span>
          </div>
          <div className="mt-12 grid max-w-[410px] grid-cols-3 gap-4 border-t border-[#ded7cc] pt-5">
            <div><p className="font-serif text-2xl">Mềm mại</p><p className="mt-1 text-[8px] tracking-[.12em] text-[#8d857a]">CẢM GIÁC</p></div>
            <div><p className="font-serif text-2xl">Tinh giản</p><p className="mt-1 text-[8px] tracking-[.12em] text-[#8d857a]">THIẾT KẾ</p></div>
            <div><p className="font-serif text-2xl">Bền dáng</p><p className="mt-1 text-[8px] tracking-[.12em] text-[#8d857a]">PHONG CÁCH</p></div>
          </div>
        </div>
        <div className="relative min-h-[460px] bg-[#ded5c8] sm:min-h-[620px] lg:min-h-[740px]">
          <Image src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1800&q=90&fit=crop" alt="Ảnh thời trang phong cách tối giản trong bộ sưu tập Maison Atelier" fill priority unoptimized sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover object-[50%_32%]"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"/>
          <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white sm:bottom-10 sm:left-10 sm:right-10">
            <div><p className="text-[8px] tracking-[.2em]">MAISON ATELIER · 01</p><p className="mt-2 font-serif text-3xl sm:text-4xl">Đẹp từ những điều giản dị.</p></div>
            <a href="#shop" aria-label="Khám phá sản phẩm" className="grid h-11 w-11 place-items-center rounded-full border border-white/70 transition hover:bg-white hover:text-[#29251f]"><ArrowUpRight size={18}/></a>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e7e0d6] bg-[#efebe3]">
        <div className="mx-auto grid max-w-[1320px] gap-6 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-14">
          <div className="flex items-start gap-4"><Sparkles size={18} strokeWidth={1.4} className="mt-1 text-[#9b7756]"/><div><h2 className="text-[10px] tracking-[.1em]">CHỌN LỌC CHẤT LIỆU</h2><p className="mt-1 text-[11px] leading-5 text-[#82796e]">Ưu tiên cảm giác chạm, độ rủ và sự thoải mái khi mặc.</p></div></div>
          <div className="flex items-start gap-4"><Check size={18} strokeWidth={1.4} className="mt-1 text-[#9b7756]"/><div><h2 className="text-[10px] tracking-[.1em]">THIẾT KẾ DỄ ỨNG DỤNG</h2><p className="mt-1 text-[11px] leading-5 text-[#82796e]">Phối đồ linh hoạt từ ngày thường đến những dịp đặc biệt.</p></div></div>
          <div className="flex items-start gap-4"><ArrowRight size={18} strokeWidth={1.4} className="mt-1 text-[#9b7756]"/><div><h2 className="text-[10px] tracking-[.1em]">TƯ VẤN TẬN TÂM</h2><p className="mt-1 text-[11px] leading-5 text-[#82796e]">Hỗ trợ chọn kiểu dáng và hướng dẫn chăm sóc sản phẩm.</p></div></div>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-16 sm:px-8 lg:px-14 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="text-[9px] tracking-[.2em] text-[#9b7756]">MAISON SELECTION · 2026</p><h2 className="mt-3 font-serif text-4xl tracking-[-.045em] sm:text-6xl">Chọn món đồ của bạn.</h2><p className="mt-3 text-[12px] text-[#81786e]">Những thiết kế được tuyển chọn cho tủ đồ tinh giản.</p></div>
          <span className="text-[9px] tracking-[.12em] text-[#8b8278]">{visibleProducts.length} SẢN PHẨM</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#e2dbd1] py-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc sản phẩm">
            {["Tất cả", "Trang phục", "Phụ kiện"].map((item) => <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`min-h-10 px-4 text-[9px] tracking-[.1em] transition ${filter === item ? "bg-[#29251f] text-white" : "border border-[#ded7cc] text-[#746c62] hover:border-[#29251f]"}`}>{item.toUpperCase()}</button>)}
          </div>
          <span className="text-[9px] tracking-[.1em] text-[#8b8278]">THIẾT KẾ LẤY CẢM HỨNG TỪ LỤA VIỆT</span>
        </div>
        <div className="mt-7 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <article key={product.id} className="group">
              <button type="button" onClick={() => setSelected(product)} className="block w-full text-left" aria-label={`Xem chi tiết ${product.name}`}>
                <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e3da]">
                  <Image src={product.image} alt={product.name} fill unoptimized sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-[1.04]"/>
                  {product.badge && <span className="absolute left-3 top-3 bg-[#f7f5f0] px-3 py-2 text-[8px] tracking-[.12em]">{product.badge}</span>}
                  <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-[#f7f5f0] transition group-hover:bg-[#29251f] group-hover:text-white"><ArrowUpRight size={16}/></span>
                </div>
                <div className="flex items-start justify-between gap-3 pt-4"><div><p className="text-[8px] tracking-[.14em] text-[#9b7756]">{product.category}</p><h3 className="mt-2 font-serif text-[21px]">{product.name}</h3><p className="mt-1 text-[10px] text-[#8b8278]">{product.material}</p></div><span className="pt-5 text-[11px] whitespace-nowrap">{money(product.price)}</span></div>
              </button>
              <button type="button" onClick={() => addToBag(product)} className="mt-4 inline-flex min-h-11 w-full items-center justify-between border border-[#d9d1c6] px-4 py-3 text-[9px] tracking-[.13em] transition hover:border-[#29251f] hover:bg-[#29251f] hover:text-white">THÊM VÀO TÚI <Plus size={14}/></button>
            </article>
          ))}
        </div>
        <p className="mt-8 text-[10px] leading-5 text-[#9a9186]">* Hình ảnh, mô tả, chất liệu và giá trong bản demo mang tính minh họa; cần thay bằng thông tin sản phẩm thực tế trước khi kinh doanh.</p>
      </section>

      <section id="story" className="scroll-mt-24 bg-[#e9e2d7]">
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-2">
          <div className="relative min-h-[390px] sm:min-h-[560px]"><Image src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1400&q=88&fit=crop" alt="Phong cách thời trang đương đại lấy cảm hứng từ chất liệu tự nhiên" fill unoptimized sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/></div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20">
            <p className="text-[9px] tracking-[.2em] text-[#9b7756]">CÂU CHUYỆN MAISON</p>
            <h2 className="mt-5 max-w-lg font-serif text-5xl leading-[.98] tracking-[-.04em] sm:text-7xl">Di sản chất liệu.<br/><em className="font-normal">Ngôn ngữ hôm nay.</em></h2>
            <p className="mt-7 max-w-md text-[13px] leading-7 text-[#766e64]">Maison Atelier tôn vinh vẻ đẹp của lụa qua góc nhìn hiện đại. Chúng tôi tin một món đồ đẹp không cần phô trương — chất liệu, phom dáng và cảm giác khi mặc đã đủ tạo nên dấu ấn.</p>
            <div className="mt-8 space-y-3 text-[10px] tracking-[.08em] text-[#5f584f]"><p>— Tập trung vào chất liệu và trải nghiệm chạm</p><p>— Phom dáng tinh giản, dễ phối</p><p>— Tôn trọng vẻ đẹp thủ công và bản sắc Việt</p></div>
            <a href="#shop" className="mt-9 inline-flex items-center gap-4 text-[9px] tracking-[.15em]">TÌM THIẾT KẾ PHÙ HỢP <ArrowRight size={14}/></a>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 text-center sm:px-8 lg:px-14 lg:py-20">
        <p className="text-[9px] tracking-[.2em] text-[#9b7756]">CHĂM SÓC MÓN ĐỒ LỤA</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">Giữ nét mềm mại qua thời gian.</h2>
        <p className="mx-auto mt-4 max-w-xl text-[12px] leading-6 text-[#82796e]">Đọc kỹ hướng dẫn trên nhãn sản phẩm. Ưu tiên giặt nhẹ theo khuyến nghị của nhà sản xuất, tránh vắt mạnh và bảo quản nơi khô thoáng.</p>
        <a href="#shop" className="mt-7 inline-flex min-h-12 items-center gap-7 bg-[#29251f] px-7 py-4 text-[9px] tracking-[.14em] text-white transition hover:bg-[#80674f]">TIẾP TỤC KHÁM PHÁ <ArrowRight size={14}/></a>
      </section>

      <footer className="bg-[#29251f] px-5 py-10 text-[#f7f5f0] sm:px-8 lg:px-14">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-7">
          <div><p className="font-serif text-xl tracking-[.14em]">MAISON ATELIER</p><p className="mt-2 text-[8px] tracking-[.16em] text-white/50">CONTEMPORARY SILK · VIETNAM</p></div>
          <div className="flex gap-6 text-[9px] tracking-[.12em] text-white/65"><a href="#shop" className="hover:text-white">CỬA HÀNG</a><a href="#story" className="hover:text-white">CÂU CHUYỆN</a><a href="#top" className="hover:text-white">ĐẦU TRANG</a></div>
          <span className="text-[8px] tracking-[.14em] text-white/40">© 2026 MAISON ATELIER</span>
        </div>
      </footer>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-[70] flex max-w-[calc(100%-2rem)] -translate-x-1/2 items-center gap-3 bg-[#29251f] px-5 py-3 text-[11px] text-white shadow-xl"><Check size={15}/>{notice}<button type="button" onClick={() => setNotice("")} aria-label="Đóng thông báo"><X size={14}/></button></div>}

      {selected && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-3 sm:p-6" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <div role="dialog" aria-modal="true" aria-labelledby="product-title" className="relative grid max-h-[92vh] w-full max-w-4xl overflow-auto bg-[#f7f5f0] sm:grid-cols-2">
          <button type="button" onClick={() => setSelected(null)} aria-label="Đóng chi tiết sản phẩm" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-[#f7f5f0]"><X size={18}/></button>
          <div className="relative min-h-[300px] bg-[#e9e3da] sm:min-h-[570px]"><Image src={selected.image} alt={selected.name} fill unoptimized sizes="(max-width: 640px) 100vw, 50vw" className="object-cover"/></div>
          <div className="flex flex-col justify-center p-6 sm:p-10">
            <p className="text-[9px] tracking-[.18em] text-[#9b7756]">{selected.category}</p>
            <h2 id="product-title" className="mt-3 font-serif text-4xl leading-tight">{selected.name}</h2>
            <p className="mt-4 text-lg">{money(selected.price)}</p>
            <p className="mt-6 text-[12px] leading-7 text-[#766e64]">{selected.description}</p>
            <div className="mt-7 border-y border-[#ded7cc] py-4 text-[11px] leading-6"><p><span className="text-[#9b7756]">Chất liệu:</span> {selected.material}</p><p><span className="text-[#9b7756]">Màu sắc:</span> {selected.color}</p></div>
            <p className="mt-5 text-[10px] leading-5 text-[#8b8278]">Kích cỡ và tình trạng hàng sẽ được xác nhận khi tư vấn đơn hàng.</p>
            <button type="button" onClick={() => addToBag(selected)} className="mt-7 inline-flex min-h-12 items-center justify-between bg-[#29251f] px-5 text-[9px] tracking-[.13em] text-white transition hover:bg-[#80674f]">THÊM VÀO TÚI <ShoppingBag size={16}/></button>
          </div>
        </div>
      </div>}

      {bagOpen && <div className="fixed inset-0 z-[60] bg-black/45" onMouseDown={(event) => { if (event.target === event.currentTarget) setBagOpen(false); }}>
        <aside role="dialog" aria-modal="true" aria-labelledby="bag-title" className="absolute right-0 top-0 flex h-full w-full max-w-[460px] flex-col bg-[#f7f5f0] shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#ded7cc] px-6 py-5"><div><p className="text-[9px] tracking-[.16em] text-[#9b7756]">MAISON ATELIER</p><h2 id="bag-title" className="mt-1 font-serif text-3xl">Túi hàng ({itemCount})</h2></div><button type="button" onClick={() => setBagOpen(false)} aria-label="Đóng túi hàng" className="grid h-10 w-10 place-items-center"><X size={19}/></button></div>
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {bagItems.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag size={30} strokeWidth={1}/><p className="mt-5 font-serif text-2xl">Túi hàng đang trống.</p><p className="mt-2 text-[11px] text-[#82796e]">Hãy chọn một thiết kế bạn yêu thích.</p><button type="button" onClick={() => { setBagOpen(false); document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-6 border-b border-[#29251f] pb-1 text-[9px] tracking-[.13em]">KHÁM PHÁ SẢN PHẨM</button></div> :
              <div className="space-y-6">{bagItems.map((product) => <div key={product.id} className="flex gap-4 border-b border-[#e4ddd3] pb-6"><div className="relative h-28 w-24 shrink-0 bg-[#e9e3da]"><Image src={product.image} alt={product.name} fill unoptimized sizes="96px" className="object-cover"/></div><div className="min-w-0 flex-1"><p className="font-serif text-lg">{product.name}</p><p className="mt-1 text-[10px] text-[#82796e]">{product.color}</p><p className="mt-2 text-[11px]">{money(product.price)}</p><div className="mt-3 inline-flex items-center border border-[#ded7cc]"><button type="button" onClick={() => changeQuantity(product.id, -1)} aria-label={`Giảm số lượng ${product.name}`} className="grid h-8 w-8 place-items-center"><Minus size={12}/></button><span className="w-7 text-center text-[11px]">{bag[product.id]}</span><button type="button" onClick={() => changeQuantity(product.id, 1)} aria-label={`Tăng số lượng ${product.name}`} className="grid h-8 w-8 place-items-center"><Plus size={12}/></button></div></div><button type="button" onClick={() => changeQuantity(product.id, -bag[product.id])} aria-label={`Xóa ${product.name} khỏi túi`} className="self-start p-2 text-[#8b8278] hover:text-[#29251f]"><X size={15}/></button></div>)}</div>}
          </div>
          {bagItems.length > 0 && <div className="border-t border-[#ded7cc] px-6 py-6"><div className="flex items-center justify-between text-[11px]"><span>Tạm tính</span><strong>{money(subtotal)}</strong></div><p className="mt-2 text-[10px] leading-5 text-[#8b8278]">Phí vận chuyển và tình trạng sản phẩm sẽ được xác nhận trước khi thanh toán.</p><button type="button" onClick={copyOrder} className="mt-5 flex min-h-12 w-full items-center justify-between bg-[#29251f] px-5 text-[9px] tracking-[.13em] text-white transition hover:bg-[#80674f]">SAO CHÉP YÊU CẦU ĐẶT HÀNG <ArrowRight size={15}/></button><button type="button" onClick={() => setBagOpen(false)} className="mt-3 min-h-10 w-full text-[9px] tracking-[.12em] text-[#746c62]">TIẾP TỤC MUA SẮM</button></div>}
        </aside>
      </div>}
    </main>
  );
}
