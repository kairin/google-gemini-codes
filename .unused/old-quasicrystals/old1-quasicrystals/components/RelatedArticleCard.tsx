
import React from 'react';
import { RelatedArticle } from '../types';
import { AcademicCapIcon } from './icons/AcademicCapIcon'; // Generic icon

interface RelatedArticleCardProps {
  article: RelatedArticle;
  onSelect: (article: RelatedArticle) => void;
}

export const RelatedArticleCard: React.FC<RelatedArticleCardProps> = ({ article, onSelect }) => {
  const SourceIconComponent = article.sourceIcon || AcademicCapIcon;
  
  return (
    <div 
      className="flex items-start p-3 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600/70 transition-colors duration-150 cursor-pointer"
      onClick={() => onSelect(article)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelect(article);}}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${article.title}`}
    >
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null; // prevent infinite loop if fallback also fails
          target.src = 'https://picsum.photos/seed/fallback/100/100'; // Fallback image
        }}
      />
      <div className="flex-grow">
        <h3 className="text-sm font-semibold text-sky-400 group-hover:underline mb-1 leading-tight">
          {article.title}
        </h3>
        <p className="text-xs text-gray-400 mb-1 leading-tight">{article.dateOrInfo}</p>
        <div className="flex items-center text-xs text-gray-500">
          <SourceIconComponent className="w-3 h-3 mr-1.5 text-gray-400" />
          <span>{article.sourceName}</span>
        </div>
      </div>
    </div>
  );
};
