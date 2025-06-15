
import React from 'react';
import { MainContentItem, ContentItemType } from '../types';
import { LinkIcon } from './icons/LinkIcon';

interface ContentRendererProps {
  item: MainContentItem;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ item }) => {
  const renderReferenceLink = () => (
    <LinkIcon className="w-4 h-4 inline-block ml-1 text-sky-500 hover:text-sky-300" />
  );

  switch (item.type) {
    case ContentItemType.Heading2:
      return (
        <h2 className="text-2xl font-semibold text-sky-300 mt-6 mb-3">
          {item.text}
          {item.hasReferenceLink && renderReferenceLink()}
        </h2>
      );
    case ContentItemType.Heading3:
      return (
        <h3 className="text-xl font-semibold text-sky-400 mt-4 mb-2">
          {item.text}
          {item.hasReferenceLink && renderReferenceLink()}
        </h3>
      );
    case ContentItemType.Paragraph:
      return (
        <p className="text-gray-300 leading-relaxed my-2">
          {item.text}
          {item.hasReferenceLink && renderReferenceLink()}
        </p>
      );
    case ContentItemType.UnorderedList:
      return (
        <ul className="list-disc list-outside pl-5 space-y-2 my-2 text-gray-300">
          {item.items?.map((listItem, index) => (
            <li key={index} className={listItem.isBold ? 'font-semibold text-gray-100' : ''}>
              {listItem.text}
              {listItem.hasReferenceLink && renderReferenceLink()}
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
};
