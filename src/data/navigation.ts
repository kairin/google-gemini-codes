// This is the single source of truth for all site navigation.

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

export const footerSitemap = [
    {
        title: "Analyses & Reports",
        links: [
            { href: "/data-tools", text: "Data Tool Analyzer" },
            { href: "/data-tools/comparison", text: "Interactive Comparison" },
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
