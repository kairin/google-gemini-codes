
import React, { useState, useEffect, useMemo } from 'react';
import { mainContent, relatedArticlesData } from './data/content';
import { MainContentItem, RelatedArticle, ContentSection, ContentItemType } from './types';
import { RelatedArticleCard } from './components/RelatedArticleCard';
import { ArticleModal } from './components/ArticleModal';
import { SourceIcon } from './components/icons/SourceIcon';
import { ExpandableSection } from './components/ExpandableSection';

const App: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<RelatedArticle | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const processedSections = useMemo((): ContentSection[] => {
    const sections: ContentSection[] = [];
    let currentSection: ContentSection | null = null;
    let firstSectionOpened = false;

    mainContent.forEach((item, index) => {
      if (item.type === ContentItemType.Heading2) {
        if (currentSection) {
          sections.push(currentSection);
        }
        const initialOpen = !firstSectionOpened;
        if (initialOpen) firstSectionOpened = true;

        currentSection = {
          id: item.id || `section-${index}`,
          titleItem: item,
          contentItems: [],
          initialOpen: initialOpen,
        };
      } else if (currentSection) {
        // Add other content types like paragraphs and lists to the current section
        if (item.type === ContentItemType.Paragraph || item.type === ContentItemType.UnorderedList || item.type === ContentItemType.Heading3) {
           currentSection.contentItems.push(item);
        }
      } else if (sections.length === 0 && index === 0) { // Corrected line: Removed redundant item.type check
        // Handle cases where content might not start with H2.
        // Create a default section for leading content.
        const initialOpen = !firstSectionOpened;
        if (initialOpen) firstSectionOpened = true;
        currentSection = {
          id: item.id || `section-default-${index}`,
          titleItem: { type: ContentItemType.Heading2, text: "Overview", id: "overview-section"}, // Placeholder title
          contentItems: [item],
          initialOpen: initialOpen,
        };
      }
    });

    if (currentSection) {
      sections.push(currentSection);
    }
    return sections;
  }, []);
  
  useEffect(() => {
    const initialOpenState: Record<string, boolean> = {};
    processedSections.forEach(section => {
      if (section.initialOpen) {
        initialOpenState[section.id] = true;
      }
    });
    setOpenSections(initialOpenState);
  }, [processedSections]);


  const handleArticleSelect = (article: RelatedArticle) => {
    setSelectedArticle(article);
  };

  const handleCloseModal = () => {
    setSelectedArticle(null);
  };

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedArticle]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <div className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-3xl font-bold text-sky-400 mb-8 text-left">
          Deep Dive: How Does Quasicrystalline Design in Iran's Islamic Architecture Provide a Heritage That Could Inform Our Understanding of Quantum Systems?
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <main className="lg:w-2/3 space-y-4 flex-shrink-0">
            {processedSections.map((section) => (
              <ExpandableSection
                key={section.id}
                section={section}
                isOpen={!!openSections[section.id]}
                onToggle={() => toggleSection(section.id)}
              />
            ))}
            <div className="mt-8 pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 text-left">
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
              <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto pr-2"> {/* Adjusted max-height */}
                {relatedArticlesData.map((article: RelatedArticle) => (
                  <RelatedArticleCard 
                    key={article.id} 
                    article={article} 
                    onSelect={handleArticleSelect} 
                  />
                ))}
              </div>
              <button 
                className="mt-6 w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-semibold py-2 px-4 rounded-lg transition duration-150 ease-in-out"
                onClick={() => alert("Show all functionality not yet implemented.")}
              >
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
