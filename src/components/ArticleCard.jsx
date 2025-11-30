import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <div className="h-40 bg-gray-200">
        {article.thumbnail ? (
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-5">
        <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {article.title}
        </h2>
        <p className="text-gray-600 text-sm mt-2 line-clamp-3">
          {article.preview}
        </p>
        <span className="mt-4 inline-block text-[var(--primary)] font-medium">
          Read More →
        </span>
      </div>
    </Link>
  );
}
