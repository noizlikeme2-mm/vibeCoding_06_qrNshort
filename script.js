// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// URL shortener
const shortenBtn = document.getElementById('shortenBtn');
const longUrlInput = document.getElementById('longUrl');
const result = document.getElementById('result');
const shortUrlInput = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');
const copyMsg = document.getElementById('copyMsg');
const errorMsg = document.getElementById('errorMsg');

// localStorage 기반 URL 단축 (CORS 문제 없음)
const BASE = 'https://noizlikeme2-mm.github.io/vibeCoding_06_qrNshort/#';

function makeCode(url) {
  let hash = 0;
  for (let i = 0; i < url.length; i++) {
    hash = ((hash << 5) - hash) + url.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36).slice(0, 6);
}

function loadMap() {
  return JSON.parse(localStorage.getItem('urlMap') || '{}');
}

function saveMap(map) {
  localStorage.setItem('urlMap', JSON.stringify(map));
}

// 페이지 로드 시 해시 리다이렉트 처리
window.addEventListener('load', () => {
  const hash = location.hash.slice(1);
  if (hash) {
    const map = loadMap();
    if (map[hash]) {
      location.replace(map[hash]);
    }
  }
});

shortenBtn.addEventListener('click', shortenUrl);
longUrlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') shortenUrl();
});

function shortenUrl() {
  const url = longUrlInput.value.trim();
  if (!url) {
    alert('URL을 입력해주세요.');
    return;
  }
  if (!url.startsWith('http')) {
    alert('https:// 로 시작하는 URL을 입력해주세요.');
    return;
  }

  errorMsg.classList.add('hidden');

  const code = makeCode(url);
  const map = loadMap();
  map[code] = url;
  saveMap(map);

  shortUrlInput.value = BASE + code;
  result.classList.remove('hidden');
  copyMsg.classList.add('hidden');
}

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(shortUrlInput.value).then(() => {
    copyMsg.classList.remove('hidden');
    setTimeout(() => copyMsg.classList.add('hidden'), 2000);
  });
});
