// A new, mathematically correct, grid-based tessellation library.

// --- Color Palettes (theme-aware) ---
const palettes = {
    checkerboard: {
        light: ['#e2e8f0', '#f1f5f9'], // slate-200, slate-100
        dark: ['#1e293b', '#334155'],  // slate-900, slate-800
        stroke: { light: '#94a3b8', dark: '#475569' }
    },
    hexagonal: {
        light: ['#a7f3d0', '#6ee7b7', '#34d399'],
        dark: ['#a78bfa', '#8b5cf6', '#7c3aed'],
        stroke: { light: '#4338ca', dark: '#a5b4fc' }
    },
    rhombic: {
        light: ['#fecaca', '#fca5a5', '#f87171'],
        dark: ['#bae6fd', '#7dd3fc', '#38bdf8'],
        stroke: { light: '#b45309', dark: '#fcd34d' }
    }
};

// --- Tile Geometry Definitions ---
// All shapes are drawn relative to a center (0,0) with a consistent side length 's'
function drawTile(ctx, type, x, y, size, rotation = 0, color, strokeColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    const s = size;
    switch (type) {
        case 'square':
            ctx.rect(-s / 2, -s / 2, s, s);
            break;
        case 'hexagon': // 120 degree angles
            for (let i = 0; i < 6; i++) {
                ctx.lineTo(s * Math.cos(i * Math.PI / 3), s * Math.sin(i * Math.PI / 3));
            }
            break;
        case 'rhombus': // 72/108 degree angles
             const rAngle1 = (72 / 2) * Math.PI / 180;
             const rAngle2 = (108 / 2) * Math.PI / 180;
             ctx.moveTo(0, -s * Math.sin(rAngle1));
             ctx.lineTo(s * Math.cos(rAngle1), 0);
             ctx.lineTo(0, s * Math.sin(rAngle1));
             ctx.lineTo(-s * Math.cos(rAngle1), 0);
             break;
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
}

// --- Shared Canvas Setup ---
function setupCanvas(canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const width = canvas.width;
    const height = canvas.height;
    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#0f172a' : '#f8fafc'; // slate-950 or slate-50
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    return { ctx, width, height, isDark };
}

// --- EXPORTED PATTERN GENERATORS ---

export function drawCheckerboardPattern(canvas) {
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, width, height, isDark } = setup;
    const size = 50;
    const palette = palettes.checkerboard;
    const colors = isDark ? palette.dark : palette.light;
    const stroke = isDark ? palette.stroke.dark : palette.stroke.light;

    for (let y = 0; y < height / size; y++) {
        for (let x = 0; x < width / size; x++) {
            const posX = x * size + size / 2;
            const posY = y * size + size / 2;
            const colorIndex = (x + y) % 2;
            drawTile(ctx, 'square', posX, posY, size, 0, colors[colorIndex], stroke);
        }
    }
}

export function drawHexagonalPattern(canvas) {
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, width, height, isDark } = setup;
    const size = 40; // This is the radius of the hexagon
    const stepX = size * 1.5;
    const stepY = size * Math.sqrt(3);
    const palette = palettes.hexagonal;
    const colors = isDark ? palette.dark : palette.light;
    const stroke = isDark ? palette.stroke.dark : palette.stroke.light;

    for (let y = -1; y < height / stepY + 1; y++) {
        for (let x = -1; x < width / stepX + 2; x++) {
            const posX = x * stepX + (y % 2) * (stepX / 2);
            const posY = y * stepY;
            const colorIndex = (x + y) % colors.length;
            drawTile(ctx, 'hexagon', posX, posY, size, 0, colors[colorIndex], stroke);
        }
    }
}

export function drawRhombicPattern(canvas) {
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, width, height, isDark } = setup;
    const size = 40;
    const palette = palettes.rhombic;
    const colors = isDark ? palette.dark : palette.light;
    const stroke = isDark ? palette.stroke.dark : palette.stroke.light;

    const stepX = size * Math.cos((72/2) * Math.PI / 180) * 2;
    const stepY = size * Math.sin((72/2) * Math.PI / 180) * 2;

    for (let y = -1; y < height / stepY + 1; y++) {
        for (let x = -1; x < width / stepX + 1; x++) {
            const posX = x * stepX + (y % 2) * (stepX / 2);
            const posY = y * stepY;
            const colorIndex = (x + y) % colors.length;
            const rotation = (y % 2 === 0) ? 0 : Math.PI;
            drawTile(ctx, 'rhombus', posX, posY, size, rotation, colors[colorIndex], stroke);
        }
    }
}
