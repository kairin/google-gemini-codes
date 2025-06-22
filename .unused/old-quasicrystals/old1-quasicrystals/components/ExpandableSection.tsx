import React from 'react';
import { ContentSection } from '../types';
import { ContentRenderer } from './ContentRenderer';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface ExpandableSectionProps {
  section: ContentSection;
  isOpen: boolean;
  onToggle: () => void;
}

export const ExpandableSection: React.FC<ExpandableSectionProps> = ({ section, isOpen, onToggle }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-opacity-75 rounded-t-lg"
        aria-expanded={isOpen}
        aria-controls={`section-content-${section.id}`}
      >
        <h2 className="text-xl font-semibold text-sky-300">
          {section.titleItem.text}
        </h2>
        <ChevronDownIcon
          className={`w-6 h-6 text-sky-400 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        id={`section-content-${section.id}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0' // Using max-height for transition
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