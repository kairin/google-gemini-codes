// This is the single source of truth for all site navigation.

// Data for the main navigation bar (Header)
export const mainNavLinks = [
    { 
        href: "/data-tools", 
        label: "Data Tools" 
    },
    { 
        href: "/f5-vpn", 
        label: "F5 VPN" 
    },
    { 
        href: "/ancient-math", 
        label: "Ancient Math" 
    },
    { 
        href: "/ai-warfare", 
        label: "AI in Warfare" 
    },
    { 
        href: "/learning/github-pages-ssg", 
        label: "Learning" 
    },
];

// Data for the Cards on the Homepage
export const homepageCards = [
    { 
        href: "/data-tools", 
        icon: "fa-solid fa-magnifying-glass-chart",
        title: "Data Tool Analyzer",
        blurb: "An interactive guide to choosing the right tool for your data needs, comparing Power Query, DuckDB, and GraphRAG."
    },
    { 
        href: "/f5-vpn", 
        icon: "fa-solid fa-shield-halved",
        title: "Dockerized F5 VPN",
        blurb: "A technical deep-dive into containerizing the F5 BIG-IP client for secure, portable intranet access."
    },
    { 
        href: "/ancient-math", 
        icon: "fa-solid fa-atom",
        title: "Ancient Sophistication",
        blurb: "Explore the advanced mathematics of quasicrystals hidden within the beauty of Islamic architecture."
    },
    { 
        href: "/ai-warfare", 
        icon: "fa-solid fa-satellite-dish",
        title: "AI in Modern Warfare",
        blurb: "A comprehensive analysis of AI as a force multiplier, from sentient missiles to decision dominance."
    },
    { 
        href: "/learning/github-pages-ssg", 
        icon: "fa-solid fa-book-open",
        title: "Learning",
        blurb: "Explore the modern static site generators and automated deployment patterns used to build this website."
    },
];

// Data for the Footer Sitemap
export const footerSitemap = [
    {
        title: "Analyses & Reports",
        links: [
            { href: "/data-tools", text: "Data Tool Analyzer" },
            { href: "/ancient-math", text: "Ancient Sophistication" },
            { href: "/ai-warfare", text: "AI in Modern Warfare" },
        ]
    },
    {
        title: "Projects",
        links: [
            { href: "/f5-vpn", text: "Dockerized F5 VPN" },
        ]
    },
    {
        title: "Meta",
        links: [
            { href: "/learning/github-pages-ssg", text: "About This Site" },
            { href: "https://github.com/kairin/google-gemini-codes", text: "Source on GitHub", isExternal: true },
        ]
    }
];
