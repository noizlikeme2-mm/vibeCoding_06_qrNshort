const urlInput = document.getElementById('urlInput');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrcodeDiv = document.getElementById('qrcode');

generateBtn.addEventListener('click', generateQR);
urlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') generateQR();
});

function generateQR() {
  const url = urlInput.value.trim();
  if (!url) {
    alert('URL을 입력해주세요.');
    return;
  }

  qrcodeDiv.innerHTML = '';
  downloadBtn.classList.add('hidden');

  new QRCode(qrcodeDiv, {
    text: url,
    width: 260,
    height: 260,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  setTimeout(() => {
    downloadBtn.classList.remove('hidden');
  }, 150);
}

downloadBtn.addEventListener('click', () => {
  const canvas = qrcodeDiv.querySelector('canvas');
  const img = qrcodeDiv.querySelector('img');

  const size = 260;
  const tmp = document.createElement('canvas');
  tmp.width = size;
  tmp.height = size;
  const ctx = tmp.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  if (canvas) {
    ctx.drawImage(canvas, 0, 0, size, size);
  } else if (img) {
    ctx.drawImage(img, 0, 0, size, size);
  }

  const a = document.createElement('a');
  a.download = 'qrcode.jpg';
  a.href = tmp.toDataURL('image/jpeg', 0.95);
  a.click();
});
