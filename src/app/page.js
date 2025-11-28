// import QuoteCard from "@/components/QuoteCard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto">

      {/* HERO */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">MindEase</h1>
        <p className="text-gray-600 mt-3 max-w-lg mx-auto">
          Your Mental Wellness Companion — track your mood & improve your well-being.
        </p>

        <a
          href="/mood"
          className="mt-6 inline-block bg-primary text-white px-6 py-3 rounded-xl shadow hover:bg-primary-light transition"
        >
          Track Your Mood
        </a>
      </section>

      {/* <QuoteCard /> */}

      {/* FEATURE GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
        <Feature icon="🙂" title="Mood Tracker" link="/mood" />
        <Feature icon="🌬️" title="Breathing" link="/breathing" />
        <Feature icon="📚" title="Articles" link="/articles" />
      </section>
    </div>
  );
}

function Feature({ icon, title, link }) {
  return (
    <Link href={link} className="p-6 bg-white shadow rounded-xl text-center hover:shadow-md transition">
      <p className="text-4xl">{icon}</p>
      <h3 className="font-semibold mt-3">{title}</h3>
    </Link>
  );
}
