import React, { useState } from 'react';
import { RelatedArticle } from '../types';
import { AcademicCapIcon } from './icons/AcademicCapIcon';
import { RainbowAnimationWrapper } from './RainbowAnimationWrapper';

interface RelatedArticleCardProps {
  article: RelatedArticle;
  onSelect: (article: RelatedArticle) => void;
}

export const RelatedArticleCard: React.FC<RelatedArticleCardProps> = ({ article, onSelect }) => {
  const SourceIconComponent = article.sourceIcon || AcademicCapIcon;
  const [isHovered, setIsHovered] = useState(false);
  
  const baseCardClasses = "flex items-start p-3 rounded-lg shadow-md transition-all duration-150 cursor-pointer";
  // Maintain border width for layout consistency, make it transparent or colored based on hover
  const inactiveCardClasses = `${baseCardClasses} bg-gray-700 border-2 border-gray-700`; 
  const activeCardClasses = `${baseCardClasses} bg-gray-700 border-2`; // border-color will be made transparent by animation class

  return (
    <RainbowAnimationWrapper 
      elementType="div"
      isActive={isHovered}
      animateBorder={true}
      animateBackgroundShimmer={true}
      className={isHovered ? activeCardClasses : inactiveCardClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          target.onerror = null; 
          target.src = 'https://picsum.photos/seed/fallback/100/100'; 
        }}
      />
      <div className="flex-grow">
        <RainbowAnimationWrapper
          elementType="h3"
          isActive={isHovered}
          animateTextShimmer={true}
          className={`text-sm font-semibold mb-1 leading-tight ${!isHovered ? 'text-sky-400 group-hover:underline' : 'underline'}`}
        >
          {article.title}
        </RainbowAnimationWrapper>
        <RainbowAnimationWrapper
          elementType="p"
          isActive={isHovered}
          animateTextShimmer={true}
          className={`text-xs mb-1 leading-tight ${!isHovered ? 'text-gray-400' : ''}`}
        >
          {article.dateOrInfo}
        </RainbowAnimationWrapper>
        <div className="flex items-center text-xs">
          <SourceIconComponent className={`w-3 h-3 mr-1.5 transition-colors duration-150 ${!isHovered ? 'text-gray-400' : 'text-white'}`} />
          <RainbowAnimationWrapper
            elementType="span"
            isActive={isHovered}
            animateTextShimmer={true}
            className={`${!isHovered ? 'text-gray-500' : ''}`}
          >
            {article.sourceName}
          </RainbowAnimationWrapper>
        </div>
      </div>
    </RainbowAnimationWrapper>
  );
};
