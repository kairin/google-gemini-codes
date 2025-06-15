export const mainNavLinks = [
    { href: "/data-tools/", label: "Data Tools" },
    { href: "/f5-vpn/", label: "F5 VPN" },
    { href: "/ancient-math/", label: "Ancient Math" },
    { href: "/ai-warfare/", label: "AI in Warfare" },
    { href: "/learning/github-pages-ssg/", label: "Learning" },
];

export const homepageCards = [
    { 
        href: "/data-tools/", 
        icon: "fa-solid fa-magnifying-glass-chart",
        title: "Data Tool Analyzer",
        blurb: "An interactive guide to choosing the right tool for your data needs.",
        details: "Compare Power Query, DuckDB, and GraphRAG across multiple dimensions to find the perfect fit for your project, from simple BI to complex graph-based analysis."
    },
    { 
        href: "/f5-vpn/", 
        icon: "fa-solid fa-shield-halved",
        title: "Dockerized F5 VPN",
        blurb: "A technical deep-dive into containerizing the F5 BIG-IP client.",
        details: "This solution provides a portable, secure, and fully interactive GUI for the F5 VPN, accessible from any machine with Docker and a web browser."
    },
    { 
        href: "/ancient-math/", 
        icon: "fa-solid fa-atom",
        title: "Ancient Sophistication",
        blurb: "Explore the advanced mathematics hidden within Islamic architecture.",
        details: "Discover quasicrystalline patterns and the concept of aperiodicity in Girih tiles, centuries before their formal discovery by modern science."
    },
    { 
        href: "/ai-warfare/", 
        icon: "fa-solid fa-satellite-dish",
        title: "AI in Modern Warfare",
        blurb: "A comprehensive analysis of AI as a force multiplier in conflict.",
        details: "From autonomous targeting systems and sentient missiles to the race for decision dominance, this report explores the strategic implications of AI on the battlefield."
    },
    { 
        href: "/learning/github-pages-ssg/", 
        icon: "fa-solid fa-book-open",
        title: "Learning",
        blurb: "Explore the modern static site generators and deployment patterns.",
        details: "This page documents the project's own evolution, from its initial setup with Astro to iterative refinements in performance, accessibility, and component design."
    },
];

export const footerSitemap = [
    {
        title: "Analyses & Reports",
        links: [
            { href: "/data-tools/", text: "Data Tool Analyzer" },
            { href: "/ancient-math/", text: "Ancient Sophistication" },
            { href: "/ai-warfare/", text: "AI in Modern Warfare" },
        ]
    },
    {
        title: "Projects",
        links: [
            { href: "/f5-vpn/", text: "Dockerized F5 VPN" },
        ]
    },
    {
        title: "Meta",
        links: [
            { href: "/learning/github-pages-ssg/", text: "About This Site" },
            { href: "https://github.com/kairin/google-gemini-codes", text: "Source on GitHub", isExternal: true },
        ]
    }
];
