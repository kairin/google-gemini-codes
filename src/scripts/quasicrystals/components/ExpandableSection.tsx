import React from 'react';
import { ContentSection } from '../types';
import { ContentRenderer } from './ContentRenderer';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { RainbowAnimationWrapper } from './RainbowAnimationWrapper';

interface ExpandableSectionProps {
  section: ContentSection;
  isOpen: boolean;
  onToggle: () => void;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ section, isOpen, onToggle }) => {
  return (
    <div className={`shadow-md rounded-lg ${isOpen ? 'bg-gray-800' : 'bg-gray-800'}`}>
      <RainbowAnimationWrapper
        elementType="button"
        isActive={isOpen}
        animateBorder={true}
        animateBackgroundShimmer={true}
        onClick={onToggle}
        className={`w-full flex justify-between items-center p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-opacity-75 rounded-t-lg 
                    ${isOpen ? 'border-2 bg-gray-800' : 'border-0'}`} 
        aria-expanded={isOpen}
        aria-controls={`section-content-${section.id}`}
      >
        <RainbowAnimationWrapper
          elementType="h2"
          isActive={isOpen}
          animateTextShimmer={true}
          className={`text-xl font-semibold ${!isOpen ? 'text-sky-300' : ''}`}
        >
          {section.titleItem.text}
        </RainbowAnimationWrapper>
        
        <ChevronDownIcon
          className={`w-6 h-6 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : 'text-sky-400'
          }`}
        />
      </RainbowAnimationWrapper>
      <div
        id={`section-content-${section.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-800 rounded-b-lg ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 border-t border-gray-700 space-y-3">
          {section.contentItems.map((item, index) => (
            <ContentRenderer key={`${section.id}-content-${index}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
