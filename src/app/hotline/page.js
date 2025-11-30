"use client";
import { useState } from "react";
import { Phone, MessageCircle, Globe, Copy, Check, HeartHandshake, Siren, ShieldCheck, MapPin, ExternalLink } from "lucide-react";

export default function HotlinePage() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const emergencyContacts = [
    { 
      name: "Pencegahan Bunuh Diri", 
      number: "119", 
      ext: "Ext. 8", 
      icon: <Siren size={28} />, 
      color: "bg-rose-500", 
      // Tambahan: Warna teks khusus untuk tombol agar serasi
      btnText: "text-rose-600", 
      glow: "shadow-rose-500/40" 
    },
    { 
      name: "Darurat Medis / Polisi", 
      number: "112", 
      ext: "", 
      icon: <ShieldCheck size={28} />, 
      color: "bg-red-600", 
      // Tambahan: Warna teks khusus untuk tombol agar serasi
      btnText: "text-red-700", 
      glow: "shadow-red-600/40" 
    },
  ];

  const professionalServices = [
    { name: "Halo Kemenkes", number: "1500-567", desc: "Layanan Kesehatan Resmi RI", icon: <Phone size={24}/>, type: "call" },
    { name: "Yayasan Pulih", number: "+62 811-8436-633", desc: "Konseling Psikologis (WA)", icon: <MessageCircle size={24}/>, type: "wa" },
    { name: "Into The Light", number: "intothelightid.org", desc: "Komunitas Advokasi (Web)", type: "link", icon: <Globe size={24}/> },
  ];

  return (
    <div className="w-full relative overflow-hidden min-h-screen text-gray-800">
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-36 pb-32 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/50 text-rose-600 text-xs md:text-sm font-bold mb-4 shadow-sm animate-pulse">
            <HeartHandshake size={16} />
            <span>You Are Not Alone</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-800 tracking-tight leading-tight">
            Help is Always <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
              Available.
            </span>
          </h1>
          <p className="text-base md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto font-medium px-4">
            Jangan ragu untuk mencari bantuan. Ada orang-orang yang peduli dan siap mendengarkan ceritamu.
          </p>
        </div>

        {/* SECTION 1: EMERGENCY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12 animate-fade-in-up">
          {emergencyContacts.map((contact, idx) => (
            <div 
                key={idx} 
                className={`
                    relative overflow-hidden p-6 md:p-8 rounded-[2rem] shadow-xl transition-transform hover:scale-[1.01] duration-300
                    ${contact.color} text-white ${contact.glow}
                `}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 relative z-10">
                <div className="p-3 md:p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-inner shrink-0">
                    {contact.icon}
                </div>
                <div className="flex-1 w-full">
                    <h3 className="text-xl md:text-2xl font-black mb-1">{contact.name}</h3>
                    <p className="text-white/80 text-xs md:text-sm mb-4 md:mb-0">Layanan 24 Jam Bebas Pulsa</p>
                </div>
                
                {/* PERBAIKAN: Menambahkan class warna teks spesifik (btnText) */}
                <a 
                    href={`tel:${contact.number}`} 
                    className={`
                      w-full sm:w-auto px-6 py-3 bg-white rounded-xl font-bold text-center shadow-lg hover:bg-gray-50 transition flex items-center justify-center gap-2 text-sm md:text-base
                      ${contact.btnText || "text-gray-900"} 
                    `}
                >
                    <Phone size={18} className="fill-current"/> 
                    Call {contact.number}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 2: OTHER SERVICES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Konseling Profesional
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {professionalServices.map((srv, idx) => (
                <div key={idx} className="bg-white/40 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/50 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 group">
                   
                   <div className="flex items-center gap-4 w-full sm:w-auto">
                     <div className="w-12 h-12 md:w-14 md:h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                       {srv.icon}
                     </div>
                     
                     <div className="flex-1 sm:hidden">
                        <h3 className="font-bold text-gray-800 text-base">{srv.name}</h3>
                        <p className="text-xs text-gray-500">{srv.desc}</p>
                     </div>
                   </div>

                   <div className="flex-1 hidden sm:block">
                      <h3 className="font-bold text-gray-800 text-lg">{srv.name}</h3>
                      <p className="text-sm text-gray-500">{srv.desc}</p>
                   </div>
                   
                   <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                       <button 
                         onClick={() => handleCopy(srv.number)}
                         className="p-3 text-gray-500 hover:text-indigo-600 bg-white/60 hover:bg-white rounded-xl transition cursor-pointer shrink-0 border border-transparent hover:border-indigo-100"
                       >
                          {copied === srv.number ? <Check size={20} className="text-green-500"/> : <Copy size={20}/>}
                       </button>

                       <a 
                         href={srv.type === "link" ? `https://${srv.number}` : `tel:${srv.number}`}
                         target={srv.type === "link" ? "_blank" : "_self"}
                         className="flex-1 sm:flex-none px-5 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm"
                       >
                         {srv.type === "link" ? "Buka Web" : "Hubungi"}
                         {srv.type === "link" ? <ExternalLink size={16}/> : <Phone size={16}/>}
                       </a>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
             <div className="bg-teal-700 text-white p-6 md:p-8 rounded-[2rem] shadow-2xl lg:sticky lg:top-32 overflow-hidden z-10">
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
                   🌿 Quick Self-Care
                </h3>
                <ul className="space-y-4 relative z-10 text-teal-50 text-sm leading-relaxed">
                   <li className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                      <p>Tarik napas dalam (4 detik), tahan (4 detik), hembuskan (4 detik).</p>
                   </li>
                   <li className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                      <p>Minum segelas air dingin untuk menurunkan suhu tubuh.</p>
                   </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-teal-600 text-center relative z-10">
                   <button className="w-full py-3 bg-white text-teal-800 font-bold rounded-xl hover:bg-teal-50 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm">
                      <MapPin size={16} />
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