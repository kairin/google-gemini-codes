
import { MainContentItem, ContentItemType, RelatedArticle } from '../types';
import { NatureIcon } from '../components/icons/NatureIcon';
import { StemIcon } from '../components/icons/StemIcon';
import { MuslimHeritageIcon } from '../components/icons/MuslimHeritageIcon';


export const mainContent: MainContentItem[] = [
  {
    id: 'intro',
    type: ContentItemType.Paragraph,
    text: "Let's explore the connection between quasicrystalline design in Islamic architecture and the potential for a deeper understanding of quantum systems, as well as the concept of inherent human intuition regarding these complex areas:",
  },
  {
    id: 'qdq_heritage_title',
    type: ContentItemType.Heading2,
    text: 'Quasicrystalline Design and Quantum Systems: A Possible Heritage',
  },
  {
    id: 'qdq_heritage_p1',
    type: ContentItemType.Paragraph,
    text: 'The fascinating aspect of quasicrystals in Islamic architecture, particularly in regions like Iran, is the fact that these intricate, non-repeating geometric patterns were created centuries before the mathematical principles behind quasicrystals were formally understood in the West. This raises questions about the architects and artisans\' intuitive grasp of complex mathematical concepts, and how this relates to understanding complex structures, including those found at the quantum level.',
    hasReferenceLink: true,
  },
  {
    id: 'qdq_heritage_p2',
    type: ContentItemType.Paragraph,
    text: "Here's how this unique heritage might connect:",
  },
  {
    id: 'qdq_heritage_list',
    type: ContentItemType.UnorderedList,
    items: [
      { text: 'Precursors to Modern Concepts: The development of techniques for creating these intricate patterns, possibly using methods like "girih tiles" and self-similar transformations, suggests a sophisticated approach to organizing and arranging geometric forms in non-periodic ways. This could be seen as a precursor to understanding complex, non-periodic structures found in nature, like those described in materials science and potentially in some quantum systems.' },
      { text: "Intuition for Non-Periodicity: The artisans' ability to create patterns that never repeat yet maintain a sense of order and balance suggests an intuitive understanding of non-periodic phenomena. This echoes the way scientists need to grapple with the non-intuitive nature of quantum phenomena, where things like wave-particle duality and entanglement challenge our everyday experiences." },
      { text: 'Mathematical Insight: While the artisans may not have formulated the formal mathematical framework, their creations demonstrate a deep-seated understanding of underlying mathematical principles, potentially hinting at a human capacity to grasp complex mathematical ideas implicitly.' },
      { text: 'A Different Way of Seeing: The visual complexity and intricate details of these quasicrystalline patterns might have encouraged a way of thinking that is open to seeing hidden structures and patterns, potentially laying the groundwork for understanding the complex relationships and interactions found in the quantum realm.', hasReferenceLink: true },
    ],
  },
  {
    id: 'human_ability_title',
    type: ContentItemType.Heading2,
    text: 'Inherent Human Ability to Understand Quantum Systems Instinctively:',
  },
  {
    id: 'human_ability_p1',
    type: ContentItemType.Paragraph,
    text: 'While quantum mechanics is often described as counter-intuitive, some argue that humans may possess some inherent or developed abilities that contribute to our understanding of quantum systems:',
  },
  {
    id: 'human_ability_list',
    type: ContentItemType.UnorderedList,
    items: [
      { text: 'Pattern Recognition: The human brain is highly adept at recognizing patterns, and while quantum patterns are complex and non-repeating, our ability to identify structures in the quasi-crystalline designs could be a manifestation of this inherent capability.'},
      { text: 'Abstract Thinking: Understanding quantum systems requires abstract thinking and the ability to work with mathematical models that describe phenomena beyond our everyday experience. The ability to create and appreciate complex geometric patterns like those in Islamic architecture could be an example of this abstract thinking at play.'},
      { text: 'Intuition and Creativity: The artisans who created the quasi-crystalline designs likely relied on a blend of mathematical knowledge and artistic intuition. Similarly, advancements in quantum physics often involve a spark of intuition and creative leaps in understanding.'},
      { text: 'The Power of Visualization: Creating and appreciating the visual representations of these intricate patterns could contribute to developing our ability to visualize and understand abstract concepts, which is crucial for comprehending quantum systems.', hasReferenceLink: true},
    ],
  },
  {
    id: 'important_considerations_title',
    type: ContentItemType.Heading2,
    text: 'Important Considerations:',
  },
  {
    id: 'important_considerations_list',
    type: ContentItemType.UnorderedList,
    items: [
      { text: "Formal vs. Implicit Understanding: It is crucial to distinguish between the artisans' implicit understanding of the principles that led to the creation of these patterns and the explicit, formal mathematical and scientific understanding of quasicrystals developed in modern times."},
      { text: 'Limited Scope: While the quasi-crystalline designs in Islamic architecture can provide a valuable framework for thinking about non-periodicity and complex structures, they do not directly model all aspects of quantum mechanics.', hasReferenceLink: true},
    ],
  },
  {
    id: 'conclusion_title',
    type: ContentItemType.Heading2,
    text: 'Conclusion'
  },
  {
    id: 'conclusion_p1',
    type: ContentItemType.Paragraph,
    text: 'In conclusion, the presence of sophisticated quasicrystalline designs in Iranian Islamic architecture centuries before their modern scientific discovery suggests a possible heritage of intuitive mathematical understanding and a capacity for appreciating non-periodic order, which could have laid the groundwork for a deeper appreciation of the complexity and non-intuitive nature of quantum systems. While quantum physics still presents challenges to our intuition, these historical examples might point to an inherent human capacity for abstract thinking and pattern recognition that helps us grasp these intricate aspects of the universe.',
    hasReferenceLink: true,
  },
];

export const relatedArticlesData: RelatedArticle[] = [
  {
    id: '1',
    title: 'Islamic tiles reveal sophisticated maths : Nature News',
    sourceName: 'Nature',
    dateOrInfo: 'Feb 22, 2007 - Islamic tiles reveal sophisticated maths. Muslim artists...',
    imageUrl: 'https://picsum.photos/seed/naturetile/100/100',
    url: '#nature-article', // Placeholder URL
    summary: 'A Nature News article discussing the discovery of advanced mathematical understanding evident in medieval Islamic tilings, specifically quasicrystalline patterns.',
    retrievedDate: '2024-07-01',
    sourceIcon: NatureIcon,
  },
  {
    id: '2',
    title: 'Ancient Mathematics: Quasicrystals in Western and Central Asia',
    sourceName: 'A World of Women in STEM',
    dateOrInfo: 'Dec 16, 2021 - "When regular geometric shapes fit together and...',
    imageUrl: 'https://picsum.photos/seed/stemquasicrystal/100/100',
    url: '#stem-article', // Placeholder URL
    summary: 'This article explores the historical presence and mathematical significance of quasicrystals in the architectural and artistic traditions of Western and Central Asia.',
    retrievedDate: '2024-07-01',
    sourceIcon: StemIcon,
  },
  {
    id: '3',
    title: 'New Discoveries in the Islamic Complex of Mathematics ...',
    sourceName: 'Muslim Heritage',
    dateOrInfo: 'Aug 13, 2009 - A study of medieval Islamic art has shown that some of i...',
    imageUrl: 'https://picsum.photos/seed/muslimmath/100/100',
    url: '#muslimheritage-article', // Placeholder URL
    summary: 'Details new findings regarding the mathematical complexity embedded within Islamic art, highlighting innovations that predate Western discoveries.',
    retrievedDate: '2024-07-01',
    sourceIcon: MuslimHeritageIcon,
  },
   {
    id: '4',
    title: 'The Stunning Geometry of Islamic Design',
    sourceName: 'Science Friday',
    dateOrInfo: 'Oct 05, 2018 - Exploring the intricate patterns and mathematics.',
    imageUrl: 'https://picsum.photos/seed/islamicgeom/100/100',
    url: '#sciencefriday-article', // Placeholder URL
    summary: 'An exploration of the breathtaking geometric patterns prevalent in Islamic art and architecture, discussing their mathematical underpinnings and cultural significance.',
    retrievedDate: '2024-07-01',
  },
  {
    id: '5',
    title: 'Quasicrystals: A New Form of Matter',
    sourceName: 'NobelPrize.org',
    dateOrInfo: 'Oct 05, 2011 - The Nobel Prize in Chemistry 2011.',
    imageUrl: 'https://picsum.photos/seed/nobelquasi/100/100',
    url: '#nobelprize-article', // Placeholder URL
    summary: 'Information from NobelPrize.org about the discovery of quasicrystals, which led to the Nobel Prize in Chemistry in 2011, recognizing their unique atomic structure.',
    retrievedDate: '2024-07-01',
  },
];
