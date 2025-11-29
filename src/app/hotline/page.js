"use client";
import { useState } from "react";
import { Phone, MessageCircle, Globe, Copy, Check, HeartHandshake, Siren, ShieldCheck, MapPin } from "lucide-react";

export default function HotlinePage() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const emergencyContacts = [
    { name: "Pencegahan Bunuh Diri (Sejiwa)", number: "119", ext: "Ext. 8", icon: <Siren size={32} />, color: "bg-rose-500", text: "text-rose-100", glow: "shadow-rose-500/50" },
    { name: "Darurat Medis / Polisi", number: "112", ext: "", icon: <ShieldCheck size={32} />, color: "bg-red-600", text: "text-red-100", glow: "shadow-red-600/50" },
  ];

  const professionalServices = [
    { name: "Halo Kemenkes", number: "1500-567", desc: "Layanan Kesehatan Resmi RI", icon: <Phone /> },
    { name: "Yayasan Pulih", number: "+62 811-8436-633", desc: "Konseling Psikologis (WA)", icon: <MessageCircle /> },
    { name: "Into The Light", number: "intothelightid.org", desc: "Komunitas Advokasi (Web)", type: "link", icon: <Globe /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 animate-gradient relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 pt-36 pb-32 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 backdrop-blur border border-white/50 text-rose-600 text-sm font-bold mb-4 shadow-sm animate-pulse">
            <HeartHandshake size={18} />
            <span>You Are Not Alone</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 tracking-tight text-glow">
            Help is Always <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
              Available.
            </span>
          </h1>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            Jangan ragu untuk mencari bantuan. Ada orang-orang yang peduli dan siap mendengarkan ceritamu tanpa menghakimi.
          </p>
        </div>

        {/* SECTION 1: EMERGENCY (Highlight Merah & Glowing) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in-up">
          {emergencyContacts.map((contact, idx) => (
            <div
              key={idx}
              className={`
                    relative overflow-hidden p-8 rounded-[2.5rem] shadow-2xl transition-transform hover:scale-[1.02] duration-300
                    ${contact.color} text-white
                `}
            >
              {/* Background Glow Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>

              <div className="flex items-start gap-6 relative z-10">
                <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner">
                  {contact.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-black mb-1">{contact.name}</h3>
                  <p className="text-white/80 text-sm mb-6">Layanan 24 Jam Bebas Pulsa</p>

                  <div className="flex gap-3">
                    <a
                      href={`tel:${contact.number}`}
                      className="flex-1 py-3 bg-white text-gray-900 rounded-xl font-bold text-center shadow-lg hover:bg-gray-100 transition flex items-center justify-center gap-2"
                    >
                      <Phone size={18} /> Call {contact.number}
                    </a>
                    <button
                      onClick={() => handleCopy(contact.number)}
                      className="p-3 bg-white/20 hover:bg-white/40 rounded-xl transition text-white cursor-pointer"
                    >
                      {copied === contact.number ? <Check size={20} /> : <Copy size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 2: OTHER SERVICES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>

          {/* Professional Services List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <span className="w-3 h-8 bg-indigo-500 rounded-full"></span>
              Konseling Profesional
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {professionalServices.map((srv, idx) => (
                <div key={idx} className="glass-card p-6 rounded-3xl hover-3d flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {srv.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-lg">{srv.name}</h3>
                    <p className="text-sm text-gray-500">{srv.desc}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(srv.number)}
                      className="p-3 text-gray-400 hover:text-indigo-600 bg-white/50 hover:bg-white rounded-xl transition cursor-pointer"
                    >
                      {copied === srv.number ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                    <a
                      href={srv.type === "link" ? `https://${srv.number}` : `tel:${srv.number}`}
                      target={srv.type === "link" ? "_blank" : "_self"}
                      className="px-5 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md"
                    >
                      Hubungi
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Tips Card */}
          <div className="relative">
            <div className="bg-teal-700 text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-32 overflow-hidden">
              {/* Decor */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500 rounded-full blur-2xl opacity-50"></div>

              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                🌿 Quick Self-Care
              </h3>
              <ul className="space-y-4 relative z-10 text-teal-50 text-sm leading-relaxed">
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                  <p>Tarik napas dalam (4 detik), tahan (4 detik), hembuskan (4 detik).</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                  <p>Minum segelas air dingin untuk menurunkan suhu tubuh.</p>
                </li>
                <li className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                  <p>Jauhkan HP/Sosmed sejenak selama 15 menit.</p>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-teal-600 text-center relative z-10">
                <button className="w-full py-3 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                  <MapPin size={18} />
                  Lokasi Ruang Konseling
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}