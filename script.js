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

shortenBtn.addEventListener('click', shortenUrl);
longUrlInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') shortenUrl();
});

async function shortenUrl() {
  const url = longUrlInput.value.trim();
  if (!url) {
    alert('URL을 입력해주세요.');
    return;
  }

  shortenBtn.disabled = true;
  shortenBtn.textContent = '처리 중...';
  result.classList.add('hidden');
  errorMsg.classList.add('hidden');

  try {
    const apiUrl = `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('서버 응답 오류');
    const shortUrl = (await response.text()).trim();
    if (!shortUrl.startsWith('http')) throw new Error('단축에 실패했습니다.');

    shortUrlInput.value = shortUrl;
    result.classList.remove('hidden');
    copyMsg.classList.add('hidden');
  } catch (err) {
    errorMsg.textContent = `오류: ${err.message}`;
    errorMsg.classList.remove('hidden');
  } finally {
    shortenBtn.disabled = false;
    shortenBtn.textContent = '단축';
  }
}

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(shortUrlInput.value).then(() => {
    copyMsg.classList.remove('hidden');
    setTimeout(() => copyMsg.classList.add('hidden'), 2000);
  });
});
