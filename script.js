// Seleção do Canvas e Contexto
const canvas = document.getElementById('mapa');
const ctx = canvas.getContext('2d');

// Inicializa o canvas com um fundo branco
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Array para armazenar os marcadores
let marcadores = [];

// Função para desenhar o marcador
function desenharMarcador(x, y, tipo) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = tipo === 'elevacao' ? '#ff0000' : '#0000ff';
    ctx.fill();
    ctx.closePath();
}

// Evento de clique para adicionar marcadores
canvas.addEventListener('click', (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    const tipo = e.shiftKey ? 'depressao' : 'elevacao';
    marcadores.push({ x, y, tipo });
    desenharMarcador(x, y, tipo);
});

// Função para exportar o displacement map
document.getElementById('exportar').addEventListener('click', () => {
    const imagem = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imagem;
    link.download = 'displacement-map.png';
    link.click();
});
