import React from 'react';
import { MainContentItem, ContentItemType } from '../types';
import { LinkIcon } from './icons/LinkIcon';

interface ContentRendererProps {
  item: MainContentItem;
  className?: string;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ item, className }) => {
  const renderReferenceLink = () => (
    <LinkIcon className="w-4 h-4 inline-block ml-1 text-sky-500 hover:text-sky-300" />
  );

  let element = null;

  switch (item.type) {
    case ContentItemType.Heading2: // This will now be primarily handled by ExpandableSection title
      element = (
        <h2 className="text-2xl font-semibold text-sky-300 mt-0 mb-3 text-left">
          {item.text}
          {item.hasReferenceLink && renderReferenceLink()}
        </h2>
      );
      break;
    case ContentItemType.Heading3:
      element = (
        <h3 className="text-xl font-semibold text-sky-400 mt-4 mb-2 text-left">
          {item.text}
          {item.hasReferenceLink && renderReferenceLink()}
        </h3>
      );
      break;
    case ContentItemType.Paragraph:
      element = (
        <p className="text-gray-300 leading-relaxed my-2 text-left">
          {item.text}
          {item.hasReferenceLink && renderReferenceLink()}
        </p>
      );
      break;
    case ContentItemType.UnorderedList:
      element = (
        <ul className="list-disc list-outside pl-5 space-y-2 my-2 text-gray-300 text-left">
          {item.items?.map((listItem, index) => (
            <li key={index} className={`${listItem.isBold ? 'font-semibold text-gray-100' : ''} text-left`}>
              {listItem.text}
              {listItem.hasReferenceLink && renderReferenceLink()}
            </li>
          ))}
        </ul>
      );
      break;
    default:
      return null;
  }
  
  return <div className={className}>{element}</div>;
};