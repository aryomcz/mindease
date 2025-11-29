"use client";
import { useState } from "react";
import { Phone, MessageCircle, Globe, Copy, Check, HeartHandshake, Siren, MapPin } from "lucide-react";

export default function HotlinePage() {
  const [copied, setCopied] = useState(null);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  // Data Nomor Darurat (Paling Penting)
  const emergencyContacts = [
    { name: "Pencegahan Bunuh Diri (Sejiwa)", number: "119", ext: "8", icon: <Siren size={24} />, color: "bg-rose-500", textColor: "text-rose-600" },
    { name: "Darurat Medis / Polisi", number: "112", icon: <Phone size={24} />, color: "bg-red-600", textColor: "text-red-600" },
  ];

  // Data Layanan Profesional
  const professionalServices = [
    { name: "Halo Kemenkes", number: "1500-567", desc: "Layanan Kesehatan Resmi RI" },
    { name: "Yayasan Pulih", number: "+62 811-8436-633", desc: "Konseling Psikologis (WA)" },
    { name: "Into The Light", number: "intothelightid.org", desc: "Komunitas Advokasi (Web)", type: "link" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-teal-50 animate-gradient">
      
      {/* Container Utama (Padding Top disesuaikan agar tidak ketabrak Navbar) */}
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        
        {/* HEADER */}
        <div className="text-center mb-16 animate-fade-in-down">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur border border-white/50 text-rose-500 text-sm font-bold mb-4 shadow-sm animate-pulse">
            <HeartHandshake size={16} />
            <span>You Are Not Alone</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
            Help is Always <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">Available.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Jangan ragu untuk mencari bantuan. Ada orang-orang yang peduli dan siap mendengarkan ceritamu tanpa menghakimi.
          </p>
        </div>

        {/* SECTION 1: EMERGENCY (Highlight Merah) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 animate-fade-in-up">
          {emergencyContacts.map((contact, idx) => (
            <div key={idx} className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border-l-8 border-rose-500 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 transition-transform hover:-translate-y-1">
              <div className={`${contact.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce-slow`}>
                {contact.icon}
              </div>
              <div className="flex-1 w-full">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{contact.name}</h3>
                <p className="text-gray-500 text-sm mb-4">Layanan 24 Jam Bebas Pulsa</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Tombol Call Langsung (UX) */}
                  <a 
                    href={`tel:${contact.number}`} 
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white shadow-md hover:shadow-lg transition-all ${contact.color}`}
                  >
                    <Phone size={18} />
                    Panggil {contact.number}
                  </a>
                  
                  {/* Tombol Copy */}
                  <button 
                    onClick={() => handleCopy(contact.number)}
                    className="flex items-center justify-center gap-2 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-semibold transition-all"
                  >
                    {copied === contact.number ? <Check size={18} className="text-green-600"/> : <Copy size={18}/>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SECTION 2: GRID LAYANAN LAINNYA */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Professional Services */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              Konseling Profesional
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {professionalServices.map((srv, idx) => (
                <div key={idx} className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition group">
                   <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:scale-110 transition-transform">
                        {srv.type === "link" ? <Globe size={24}/> : <MessageCircle size={24}/>}
                      </div>
                      <button 
                        onClick={() => handleCopy(srv.number)}
                        className="text-gray-400 hover:text-indigo-600 transition"
                        title="Copy"
                      >
                         {copied === srv.number ? <Check size={18} className="text-green-500"/> : <Copy size={18}/>}
                      </button>
                   </div>
                   <h3 className="font-bold text-gray-800">{srv.name}</h3>
                   <p className="text-sm text-gray-500 mb-4">{srv.desc}</p>
                   <a 
                     href={srv.type === "link" ? `https://${srv.number}` : `tel:${srv.number}`}
                     target={srv.type === "link" ? "_blank" : "_self"}
                     className="block w-full text-center py-2 border border-indigo-100 text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition"
                   >
                     Hubungi Sekarang
                   </a>
                </div>
              ))}
            </div>
          </div>

          {/* Tips Section (Sticky) */}
          <div className="relative">
             <div className="bg-gradient-to-b from-teal-500 to-teal-700 text-white p-8 rounded-3xl shadow-xl sticky top-32">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                   🌿 Self-Care Tips
                </h3>
                <ul className="space-y-4">
                   <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px] h-5 rounded-full bg-teal-400/50 flex items-center justify-center text-xs">1</div>
                      <p className="text-teal-50 leading-relaxed">Tarik napas dalam (4 detik), tahan (4 detik), hembuskan (4 detik).</p>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px] h-5 rounded-full bg-teal-400/50 flex items-center justify-center text-xs">2</div>
                      <p className="text-teal-50 leading-relaxed">Minum segelas air dingin untuk menurunkan suhu tubuh.</p>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px] h-5 rounded-full bg-teal-400/50 flex items-center justify-center text-xs">3</div>
                      <p className="text-teal-50 leading-relaxed">Jauhkan HP/Sosmed sejenak selama 15 menit.</p>
                   </li>
                   <li className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px] h-5 rounded-full bg-teal-400/50 flex items-center justify-center text-xs">4</div>
                      <p className="text-teal-50 leading-relaxed">Hubungi teman terdekat hanya untuk menyapa "Halo".</p>
                   </li>
                </ul>
                <div className="mt-8 pt-6 border-t border-teal-400/30 text-center">
                   <p className="text-sm text-teal-100 mb-2">Butuh bantuan di kampus?</p>
                   <button className="bg-white text-teal-700 w-full py-3 rounded-xl font-bold hover:bg-teal-50 transition shadow-lg">
                      <MapPin size={16} className="inline mr-2"/>
                      Lokasi Ruang Konseling
                   </button>
                </div>
             </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-gray-500 text-sm">
           <p>Data kontak di atas diperbarui terakhir pada: <strong>November 2025</strong></p>
           <p>MindEase tidak menggantikan saran medis profesional.</p>
        </div>

      </div>
    </div>
  );
}