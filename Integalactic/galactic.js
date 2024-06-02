const canvas = document.getElementById('intergalacticCanvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);
}
resizeCanvas();
const nodes = [];
const nodeCount = 300;
const maxDistance = 150;
function random(min, max) {
    return Math.random() * (max - min) + min;
}
function createNodes() {
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: random(0, window.innerWidth),
            y: random(0, window.innerHeight),
            vx: random(-1, 1),
            vy: random(-1, 1)
        });
    }
}
function drawNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'black'; // Nodes color set to black
        ctx.fill();
    });
}
function drawLines() {
    ctx.lineWidth = 2; // Set line thickness here
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (distance < maxDistance) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.strokeStyle = `rgba(0, 0, 0, ${1 - distance / maxDistance})`; // Lines color set to black
                ctx.stroke();
            }
        }
    }
}
function updateNodes() {
    nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= window.innerWidth) node.vx *= -1;
        if (node.y <= 0 || node.y >= window.innerHeight) node.vy *= -1;
    });
}
function animate() {
    drawNodes();
    drawLines();
    updateNodes();
    requestAnimationFrame(animate);
}
createNodes();
animate();
window.addEventListener('resize', () => {
    resizeCanvas();
    nodes.length = 0;
    createNodes();
});
