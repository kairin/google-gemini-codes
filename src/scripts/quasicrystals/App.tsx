
import React, { useState, useEffect } from 'react';
import { mainContent, relatedArticlesData } from './data/content';
import { MainContentItem, RelatedArticle } from './types';
import { ContentRenderer } from './components/ContentRenderer';
import { RelatedArticleCard } from './components/RelatedArticleCard';
import { ArticleModal } from './components/ArticleModal'; // Import the modal
import { SourceIcon } from './components/icons/SourceIcon';

const App: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<RelatedArticle | null>(null);

  const handleArticleSelect = (article: RelatedArticle) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  // Add/remove body class to prevent scrolling when modal is open
  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore scrolling if component unmounts while modal is open
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedArticle]);


  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <div className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <main className="lg:w-2/3 space-y-6 flex-shrink-0">
            <h1 className="text-3xl font-bold text-sky-400 mb-6">
              Deep Dive: How Does Quasicrystalline Design in Iran's Islamic Architecture Provide a Heritage That Could Inform Our Understanding of Quantum Systems?
            </h1>
            
            {mainContent.map((item: MainContentItem, index: number) => (
              <ContentRenderer key={index} item={item} />
            ))}

            <div className="mt-12 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                AI responses may include mistakes. <a href="#" className="text-sky-400 hover:underline">Learn more</a>
              </p>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-6 lg:sticky lg:top-8 self-start">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
              <div className="flex items-center mb-4">
                <SourceIcon className="w-5 h-5 mr-2 text-sky-400" />
                <h2 className="text-lg font-semibold text-gray-100">{relatedArticlesData.length} sites</h2>
              </div>
              <div className="space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto pr-2">
                {relatedArticlesData.map((article: RelatedArticle) => (
                  <RelatedArticleCard 
                    key={article.id} 
                    article={article} 
                    onSelect={handleArticleSelect} 
                  />
                ))}
              </div>
              <button className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out">
                Show all
              </button>
            </div>
          </aside>
        </div>
      </div>
      <ArticleModal article={selectedArticle} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
