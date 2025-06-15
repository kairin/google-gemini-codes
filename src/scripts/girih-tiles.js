// An advanced, grid-based, non-overlapping Girih tile drawing library.

// --- Color Palettes (theme-aware) ---
const palettes = {
    // Inspired by your "DarkRainbow" / "sunflower" image
    sunflower: {
        light: ['#fde68a', '#facc15', '#eab308', '#ca8a04'], // Ambers/Yellows
        dark: ['#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9'], // Purples
        stroke: { light: '#b91c1c', dark: '#fca5a5' } // Red stroke
    },
    // Inspired by your "DarkBands" image
    crystal: {
        light: ['#a7f3d0', '#6ee7b7', '#34d399', '#10b981'], // Greens
        dark: ['#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7'], // Light Blues
        stroke: { light: '#4338ca', dark: '#a5b4fc' } // Indigo stroke
    },
    // Inspired by your "LightTemperatureMap" image
    carpet: {
        light: ['#fecaca', '#fca5a5', '#f87171', '#ef4444'], // Reds
        dark: ['#d946ef', '#c026d3', '#a21caf', '#86198f'], // Fuchsia
        stroke: { light: '#b45309', dark: '#fcd34d' } // Amber stroke
    }
};

// --- Main Drawing Function (Internal) ---
function drawTile(ctx, type, x, y, size, rotation = 0, color, strokeColor) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    // These shapes are designed to tessellate (fit together)
    switch (type) {
        case 'hexagon':
            for (let i = 0; i < 6; i++) ctx.lineTo(size * Math.cos(i * 2 * Math.PI / 6), size * Math.sin(i * 2 * Math.PI / 6));
            break;
        case 'rhombus':
            const angle = Math.PI / 3; // 60 degrees
            ctx.moveTo(-size, 0); ctx.lineTo(0, size * Math.tan(angle / 2)); ctx.lineTo(size, 0); ctx.lineTo(0, -size * Math.tan(angle / 2));
            break;
        case 'triangle':
            ctx.moveTo(0, -size * Math.sqrt(3) / 3); ctx.lineTo(-size / 2, size * Math.sqrt(3) / 6); ctx.lineTo(size / 2, size * Math.sqrt(3) / 6);
            break;
    }
    ctx.closePath();
    ctx.fillStyle = color + 'e6'; // 'e6' adds transparency for a layered look
    ctx.fill();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
}

// --- Shared Setup Function ---
function setupCanvas(canvas) {
    if (!canvas) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const width = canvas.width;
    const height = canvas.height;
    const isDark = document.documentElement.classList.contains('dark');
    const bgColor = isDark ? '#1e293b' : '#f8fafc'; // slate-900 or slate-50

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    return { ctx, width, height, isDark };
}

// --- EXPORTED FUNCTION 1: For the "Random" button ---
export function drawRandomPattern(canvas) {
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, width, height, isDark } = setup;

    const size = 40;
    const step = size * 1.75; // Step size to ensure no overlap
    const tileTypes = ['hexagon', 'rhombus', 'triangle'];
    const randomPalette = palettes[Object.keys(palettes)[Math.floor(Math.random() * 3)]];
    const colors = isDark ? randomPalette.dark : randomPalette.light;
    const stroke = isDark ? randomPalette.stroke.dark : randomPalette.stroke.light;

    for (let y = -step; y < height + step; y += step) {
        for (let x = -step; x < width + step; x += step) {
            if (Math.random() > 0.3) { // 70% chance to place a tile
                const rotation = Math.floor(Math.random() * 6) * (Math.PI / 3); // Snap to 60 degrees
                const tile = tileTypes[Math.floor(Math.random() * tileTypes.length)];
                const color = colors[Math.floor(Math.random() * colors.length)];
                drawTile(ctx, tile, x, y, size, rotation, color, stroke);
            }
        }
    }
}

// --- EXPORTED FUNCTION 2: For the new preset buttons ---
export function drawPresetPattern(canvas, presetName = 'sunflower') {
    const setup = setupCanvas(canvas);
    if (!setup) return;
    const { ctx, width, height, isDark } = setup;

    const size = 35;
    const stepX = size * 1.5;
    const stepY = size * Math.sqrt(3);
    const palette = palettes[presetName];
    const colors = isDark ? palette.dark : palette.light;
    const stroke = isDark ? palette.stroke.dark : palette.stroke.light;
    
    // A deterministic hexagonal grid algorithm
    for (let y = 0; y < height / stepY + 1; y++) {
        for (let x = 0; x < width / stepX + 1; x++) {
            // Offset every other row to create a hexagonal pattern
            const posX = x * stepX + (y % 2) * (stepX / 2);
            const posY = y * stepY;
            
            // Use math to deterministically choose color and rotation
            const colorIndex = (x + y) % colors.length;
            const rotation = ((x * 2 + y) % 6) * (Math.PI / 3);
            
            drawTile(ctx, 'hexagon', posX, posY, size, rotation, colors[colorIndex], stroke);
        }
    }
}
