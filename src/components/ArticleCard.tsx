import { ExternalLink } from "lucide-react";
import { Article } from "../types";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <span className="text-sm font-medium text-blue-600">
            {article.source}
          </span>
          <span className="text-sm text-gray-500">{article.date}</span>
        </div>
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-4 line-clamp-2">{article.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">By {article.author}</span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            Read more
            <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}
