document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Active Nav Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
                });
            }
        });
    }, observerOptions);
    sections.forEach(section => observer.observe(section));

    // --- Canvas Drawing Logic ---
    const tileColors = ['#60a5fa', '#93c5fd', '#3b82f6', '#2563eb', '#1d4ed8'];
    const girihTiles = {
        decagon: (ctx, x, y, size) => {
            ctx.beginPath();
            for (let i = 0; i < 10; i++) {
                ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / 10), y + size * Math.sin(i * 2 * Math.PI / 10));
            }
            ctx.closePath();
        },
        hexagon: (ctx, x, y, size) => {
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / 6), y + size * Math.sin(i * 2 * Math.PI / 6));
            }
            ctx.closePath();
        },
        bowtie: (ctx, x, y, size) => {
            const angle = Math.PI / 3;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + size * Math.cos(-angle), y + size * Math.sin(-angle));
            ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle));
            ctx.lineTo(x, y);
            ctx.lineTo(x - size * Math.cos(-angle), y - size * Math.sin(-angle));
            ctx.lineTo(x - size * Math.cos(angle), y - size * Math.sin(angle));
            ctx.closePath();
        },
        rhombus: (ctx, x, y, size) => {
            const angle = Math.PI / 5;
            ctx.beginPath();
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x + size / 2 * Math.cos(angle), y);
            ctx.lineTo(x, y + size / 2);
            ctx.lineTo(x - size / 2 * Math.cos(angle), y);
            ctx.closePath();
        },
        pentagon: (ctx, x, y, size) => {
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                ctx.lineTo(x + size * Math.cos(i * 2 * Math.PI / 5 - Math.PI / 2), y + size * Math.sin(i * 2 * Math.PI / 5 - Math.PI / 2));
            }
            ctx.closePath();
        }
    };

    const girihCanvas = document.getElementById('girihCanvas');
    if (girihCanvas) {
        const girihCtx = girihCanvas.getContext('2d');
        const resetButton = document.getElementById('resetGirih');

        function drawGirihGrid() {
            girihCtx.fillStyle = '#f9fafb';
            girihCtx.fillRect(0, 0, girihCanvas.width, girihCanvas.height);
            girihCtx.strokeStyle = '#e5e7eb';
            girihCtx.lineWidth = 0.5;
            for (let i = 0; i < girihCanvas.width; i += 20) {
                girihCtx.beginPath();
                girihCtx.moveTo(i, 0);
                girihCtx.lineTo(i, girihCanvas.height);
                girihCtx.stroke();
            }
            for (let j = 0; j < girihCanvas.height; j += 20) {
                girihCtx.beginPath();
                girihCtx.moveTo(0, j);
                girihCtx.lineTo(girihCanvas.width, j);
                girihCtx.stroke();
            }
        }

        girihCanvas.addEventListener('click', (event) => {
            const rect = girihCanvas.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            const tileKeys = Object.keys(girihTiles);
            const randomTileFunc = girihTiles[tileKeys[Math.floor(Math.random() * tileKeys.length)]];

            girihCtx.fillStyle = tileColors[Math.floor(Math.random() * tileColors.length)] + 'aa';
            girihCtx.strokeStyle = '#1f2937';
            girihCtx.lineWidth = 2;

            randomTileFunc(girihCtx, x, y, 50);
            girihCtx.fill();
            girihCtx.stroke();
        });

        resetButton?.addEventListener('click', drawGirihGrid);
        drawGirihGrid();
    }

    // Periodic vs Quasicrystal
    const drawPeriodic = () => {
        const canvas = document.getElementById('periodicCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const size = 50;
        for (let x = 0; x < canvas.width; x += size) {
            for (let y = 0; y < canvas.height; y += size) {
                ctx.fillStyle = (x / size + y / size) % 2 === 0 ? '#93c5fd' : '#dbeafe';
                ctx.fillRect(x, y, size, size);
                ctx.strokeStyle = '#60a5fa';
                ctx.strokeRect(x, y, size, size);
            }
        }
    };

    const drawQuasi = () => {
        const canvas = document.getElementById('quasicrystalCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#f9fafb';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const tileFuncs = Object.values(girihTiles);
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const size = 20 + Math.random() * 30;
            const tile = tileFuncs[Math.floor(Math.random() * tileFuncs.length)];
            ctx.fillStyle = tileColors[Math.floor(Math.random() * tileColors.length)] + 'cc';
            ctx.strokeStyle = '#1f2937';
            ctx.lineWidth = 1.5;
            tile(ctx, x, y, size);
            ctx.fill();
            ctx.stroke();
        }
    };

    drawPeriodic();
    drawQuasi();

    // Timeline Chart
    const timelineCtx = document.getElementById('timelineChart')?.getContext('2d');
    if (timelineCtx) {
        new Chart(timelineCtx, {
            type: 'bar',
            data: {
                labels: ['Islamic Golden Age', 'Formal Discovery', 'Modern Research'],
                datasets: [{
                    label: 'Approximate Year',
                    data: [1200, 1982, 2010],
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(239, 68, 68, 0.7)',
                        'rgba(16, 185, 129, 0.7)'
                    ],
                    borderColor: [
                        'rgb(59, 130, 246)',
                        'rgb(239, 68, 68)',
                        'rgb(16, 185, 129)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                scales: {
                    x: {
                        beginAtZero: false,
                        min: 1000,
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    },
                    y: {
                        ticks: {
                            autoSkip: false
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Timeline from Artisanal Insight to Scientific Formulation',
                        font: { size: 16 },
                        padding: { top: 10, bottom: 30 }
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const events = {
                                    1200: 'Artisans use Girih tiles to create complex quasicrystalline patterns.',
                                    1982: 'Dan Shechtman formally discovers quasicrystals in a lab setting, earning a Nobel Prize.',
                                    2010: 'Connections between quasicrystals and quantum phenomena become an active area of research.'
                                };
                                return events[context.parsed.x] || '';
                            }
                        }
                    }
                }
            }
        });
    }
});

