"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

function formatUzPhone(value) {
  // faqat raqamlarni olamiz
  let digits = String(value || "").replace(/\D/g, "");

  // 998 bo'lsa kesib tashlaymiz (biz o'zimiz qo'shamiz)
  if (digits.startsWith("998")) digits = digits.slice(3);

  // max 9 ta raqam (XX XXX XX XX)
  digits = digits.slice(0, 9);

  const p1 = digits.slice(0, 2);
  const p2 = digits.slice(2, 5);
  const p3 = digits.slice(5, 7);
  const p4 = digits.slice(7, 9);

  let out = "+998";
  if (p1) out += " " + p1;
  if (p2) out += " " + p2;
  if (p3) out += " " + p3;
  if (p4) out += " " + p4;

  return out;
}

function onlyUzDigitsCount(phoneFormatted) {
  // +998 dan keyin nechta raqam borligini tekshiradi
  const digits = String(phoneFormatted || "").replace(/\D/g, "");
  // digits = 998 + 0..9 raqam
  if (!digits.startsWith("998")) return 0;
  return digits.length - 3;
}

export default function Page() {
  const [form, setForm] = useState({
    businessType: "Barbershop",
    firstName: "",
    lastName: "",
    phone: "+998",
    businessName: "",
    branchesCount: "1",
    extra: "",
  });

  const [status, setStatus] = useState({ type: "idle", msg: "" });

  const canSubmit = useMemo(() => {
    const phoneDigits = onlyUzDigitsCount(form.phone);
    return (
      form.firstName.trim() &&
      form.lastName.trim() &&
      form.businessName.trim() &&
      form.branchesCount.trim() &&
      phoneDigits === 9
    );
  }, [form]);

  function onChange(e) {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm((p) => ({ ...p, phone: formatUzPhone(value) }));
      return;
    }

    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setStatus({ type: "loading", msg: "Yuborilmoqda..." });

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        setStatus({ type: "error", msg: "Xatolik. Qayta urinib ko‘ring." });
        return;
      }

      setStatus({ type: "success", msg: "Yuborildi. Tez orada bog‘lanamiz." });

      setForm({
        businessType: "Barbershop",
        firstName: "",
        lastName: "",
        phone: "+998",
        businessName: "",
        branchesCount: "1",
        extra: "",
      });
    } catch (err) {
      setStatus({ type: "error", msg: "Tarmoq xatosi. Qayta urinib ko‘ring." });
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500 blur-3xl" />
        <div className="absolute top-80 left-6 h-64 w-64 rounded-full bg-blue-400 blur-3xl" />
        <div className="absolute top-[540px] right-6 h-64 w-64 rounded-full bg-sky-500 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative px-5 pt-12 pb-10">
        <div className="mx-auto max-w-md text-center">
          <Image
            src="/images/zayrx.png"
            alt="ZAYRX"
            width={240}
            height={240}
            priority
            className="mx-auto"
          />
          <h1><span className="text-2xl text-blue-200">X</span></h1>
          <h1 className="mt-7 text-3xl font-semibold tracking-tight">
             Youre business
          </h1>
          <br></br>
          <br></br>
          <br></br>

          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Barbershop, beauty salon, manikyur/pedikyur, spa, tattoo, brow/lash,
            kosmetologiya — xizmat bizneslari uchun bron + CRM. 24/7 bron, mijoz
            bazasi, eslatmalar, mutaxassislar jadvali va statistika.
          </p>

          <div className="mt-7 grid gap-3">
            <a
              href="#pricing"
              className="rounded-2xl bg-blue-500 px-6 py-3 text-sm font-semibold text-black active:scale-[0.99] transition"
            >
              Narxlar va shartlar
            </a>

            <a
              href="#contact"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white active:scale-[0.99] transition"
            >
              Kontakt qoldirish
            </a>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              1 haftada tayyor
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              Shartnoma asosida
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
              To‘lov oldindan
            </span>
          </div>
        </div>
      </section>

      {/* VALUE */}
      <section className="relative px-5 py-10">
        <div className="mx-auto max-w-md">
          <h2 className="text-lg font-semibold">Sizga nima beradi</h2>

          <div className="mt-4 space-y-3">
            {[
              {
                t: "Online bron (24/7)",
                d: "Klient o‘zi vaqt tanlaydi — sizga tayyor bron keladi.",
              },
              {
                t: "No-show kamayadi",
                d: "Avtomatik eslatmalar kelmay qolishni pasaytiradi.",
              },
              {
                t: "CRM: mijoz bazasi va tarix",
                d: "Kim qachon kelgan, qaysi xizmat, qaysi mutaxassis — hammasi saqlanadi.",
              },
              {
                t: "Tartib: jadval va band vaqt",
                d: "Mutaxassislar jadvali va band vaqtlar avtomatik boshqariladi.",
              },
              {
                t: "Statik sayt ham qilamiz",
                d: "Branding bilan oddiy, chiroyli statik landing/portfolio sayt ham qo‘shib beramiz.",
              },
            ].map((x, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="text-sm font-semibold">{x.t}</div>
                <p className="mt-1 text-sm text-white/70 leading-relaxed">
                  {x.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING + TERMS */}
      <section id="pricing" className="relative px-5 py-12 bg-white/5">
        <div className="mx-auto max-w-md">
          <h2 className="text-xl font-semibold text-center">
            Narxlar va shartlar
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-blue-500/40 bg-black/60 p-6">
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold">Setup</div>
                <div className="text-base font-semibold">$300</div>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• Tizimni o‘rnatish va sozlash</li>
                <li>• Jadval va mutaxassislar konfiguratsiyasi</li>
                <li>• CRM tuzilmasi</li>
                <li>• Branding moslash</li>
                <li>• Ishga tushirish va qisqa training</li>
                <li>• Bonus: statik landing sayt</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
              <div className="flex items-center justify-between">
                <div className="text-base font-semibold">Yillik xizmat</div>
                <div className="text-base font-semibold">$100 / yil</div>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>• Server</li>
                <li>• Domen</li>
                <li>• Backup</li>
                <li>• Update & bugfix</li>
                <li>• Support</li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold">Ish tartibi</div>
              <ul className="mt-2 space-y-2 text-sm text-white/70">
                <li>
                  • Muddat:{" "}
                  <span className="text-white font-semibold">1 hafta</span>
                </li>
                <li>
                  • Hamkorlik:{" "}
                  <span className="text-white font-semibold">
                    shartnoma asosida
                  </span>
                </li>
                <li>
                  • To‘lov:{" "}
                  <span className="text-white font-semibold">oldindan</span>
                </li>
              </ul>
            </div>

            <a
              href="#contact"
              className="block rounded-2xl bg-blue-500 px-6 py-3 text-center text-sm font-semibold text-black active:scale-[0.99] transition"
            >
              Kontakt qoldirish
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="relative px-5 py-12">
        <div className="mx-auto max-w-md">
          <h2 className="text-xl font-semibold text-center">
            Kontakt qoldiring
          </h2>
          <p className="mt-2 text-center text-sm text-white/70">
            Yuborilganda ma’lumotlar darhol Telegram guruhga tushadi.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-7 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <Select
              label="Biznes turi"
              name="businessType"
              value={form.businessType}
              onChange={onChange}
              options={[
                "Barbershop",
                "Beauty salon",
                "Manikyur/Pedikyur",
                "Kosmetologiya",
                "Brow/Lash",
                "Spa/Massaj",
                "Tattoo",
                "Boshqa",
              ]}
            />

            <div className="grid grid-cols-1 gap-3">
              <Input
                label="Ism"
                name="firstName"
                value={form.firstName}
                onChange={onChange}
                placeholder="Masalan: Ozodbek"
                required
              />
              <Input
                label="Familiya"
                name="lastName"
                value={form.lastName}
                onChange={onChange}
                placeholder="Masalan: Abdullayev"
                required
              />
              <Input
                label="Telefon raqam"
                name="phone"
                value={form.phone}
                onChange={onChange}
                placeholder="+998 90 123 45 67"
                required
                inputMode="numeric"
              />

              <Input
                label="Biznes nomi"
                name="businessName"
                value={form.businessName}
                onChange={onChange}
                placeholder="Masalan: Kings Beauty"
                required
              />

              <Select
                label="Filiallar soni"
                name="branchesCount"
                value={form.branchesCount}
                onChange={onChange}
                options={["1", "2", "3", "4", "5", "6+", "10+"]}
              />

              <TextArea
                label="Qo‘shimcha"
                name="extra"
                value={form.extra}
                onChange={onChange}
                placeholder="Masalan: qaysi tumanda, nechta mutaxassis, qaysi vaqtda qo'ng'iroq qilaylik..."
              />
            </div>

            <button
              type="submit"
              disabled={!canSubmit || status.type === "loading"}
              className={[
                "mt-2 w-full rounded-2xl px-6 py-3 text-sm font-semibold transition",
                canSubmit && status.type !== "loading"
                  ? "bg-blue-500 text-black active:scale-[0.99]"
                  : "bg-white/10 text-white/40 cursor-not-allowed",
              ].join(" ")}
            >
              {status.type === "loading" ? "Yuborilmoqda..." : "Yuborish"}
            </button>

            {status.type !== "idle" ? (
              <div
                className={[
                  "rounded-2xl border p-3 text-sm",
                  status.type === "success"
                    ? "border-green-500/30 bg-green-500/10 text-green-200"
                    : "border-red-500/30 bg-red-500/10 text-red-200",
                ].join(" ")}
              >
                {status.msg}
              </div>
            ) : null}

            <p className="text-xs text-white/50 leading-relaxed">
              Telefon to‘liq kiritilganda tugma aktiv bo‘ladi: +998 90 123 45 67.
            </p>
          </form>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/80 backdrop-blur">
        <div className="mx-auto flex max-w-md gap-3 px-5 py-3">
          <a
            href="#contact"
            className="flex-1 rounded-2xl bg-blue-500 px-4 py-3 text-center text-sm font-semibold text-black active:scale-[0.99] transition"
          >
            Kontakt qoldirish
          </a>
          <a
            href="#pricing"
            className="flex-1 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white active:scale-[0.99] transition"
          >
            Narxlar
          </a>
        </div>
      </div>

      <div className="h-20" />
    </main>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
  inputMode,
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-white/80">
        {label}
      </span>
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-blue-500/50"
      />
    </label>
  );
}

function TextArea({ label, name, value, onChange, placeholder }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-white/80">
        {label}
      </span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-blue-500/50"
      />
    </label>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-white/80">
        {label}
      </span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-black">
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
