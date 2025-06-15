
export enum ContentItemType {
  Heading1 = 'h1',
  Heading2 = 'h2',
  Heading3 = 'h3',
  Paragraph = 'p',
  UnorderedList = 'ul',
}

export interface ContentItem {
  type: ContentItemType;
  text?: string; // For h1, h2, h3, p
  items?: string[]; // For ul
  hasReferenceLink?: boolean;
  isBold?: boolean; // For list items that are bolded titles
}

export interface MainContentItem {
  id: string;
  type: ContentItemType;
  text?: string;
  items?: Array<{ text: string; hasReferenceLink?: boolean; isBold?: boolean }>; // For lists, items can have links
  hasReferenceLink?: boolean;
}

export interface RelatedArticle {
  id: string;
  title: string;
  sourceName: string;
  dateOrInfo: string;
  imageUrl: string;
  url: string; // Added: Link to the actual article
  summary: string; // Added: Brief description of the article
  retrievedDate?: string; // Added: Optional date of retrieval
  sourceIcon?: React.FC<React.SVGProps<SVGSVGElement>>; // Optional: for specific source icons
}
