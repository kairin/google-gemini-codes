
import React, { useEffect, useRef } from 'react';
import { RelatedArticle } from '../types';
import { LinkIcon } from './icons/LinkIcon'; // Re-using LinkIcon for external links
import { XMarkIcon } from './icons/XMarkIcon'; // New icon for close button

interface ArticleModalProps {
  article: RelatedArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (article) {
      modalRef.current?.focus(); // Focus the modal when it opens
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [article, onClose]);

  if (!article) {
    return null;
  }

  const handleVisitSite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent modal close if link is inside clickable area
    window.open(article.url, '_blank', 'noopener,noreferrer');
  };
  
  const SourceIconComponent = article.sourceIcon;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
      onClick={onClose} // Close on overlay click
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      aria-describedby="article-modal-description"
      tabIndex={-1} // Make the overlay focusable for screen readers when modal is active
      ref={modalRef}
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-lg w-full text-gray-200 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside modal content
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        <h2 id="article-modal-title" className="text-xl font-bold text-sky-400 mb-3 pr-8">
          {article.title}
        </h2>
        
        <div id="article-modal-description">
          <div className="flex items-center text-sm text-gray-400 mb-1">
            {SourceIconComponent && <SourceIconComponent className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0" />}
            <span>{article.sourceName}</span>
          </div>
          <p className="text-xs text-gray-500 mb-3">{article.dateOrInfo}</p>
          
          <p className="text-gray-300 leading-relaxed mb-4 text-sm">
            {article.summary}
          </p>

          {article.retrievedDate && (
            <p className="text-xs text-gray-500 mb-4 italic">
              Information retrieved/verified: {article.retrievedDate}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleVisitSite}
              className="flex-1 w-full sm:w-auto bg-sky-500 hover:bg-sky-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out text-center inline-flex items-center justify-center"
            >
              Visit Site <LinkIcon className="w-4 h-4 ml-2" />
            </a>
            <button
              onClick={onClose}
              className="flex-1 w-full sm:w-auto bg-gray-600 hover:bg-gray-500 text-gray-200 font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
            >
              Close
            </button>
        </div>
      </div>
    </div>
  );
};
