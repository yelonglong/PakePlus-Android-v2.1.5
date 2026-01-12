window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// ========== 通用广告屏蔽核心代码 ==========
// 1. 屏蔽含广告关键词的元素（支持中英文）
function removeAdElements() {
  const adSelectors = [
    '[class*="ad"]', '[class*="advert"]', '[class*="ads"]', '[class*="banner"]',
    '[id*="ad"]', '[id*="advert"]', '[id*="ads"]', '[class*="广告"]', '[id*="广告"]',
    '[class*="推广"]', '[id*="推广"]', '[class*="弹窗"]', '[id*="弹窗"]',
    '.ad-wrap', '.ad-container', '.ad-box', '.advertisement', '.popup-ad',
    '.float-ad', '.bottom-ad', '.top-ad', '.sidebar-ad'
  ];
  
  // 批量移除广告元素
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      el.remove(); // 彻底删除广告元素
    });
  });

  // 2. 屏蔽弹窗类广告（阻止弹窗显示）
  window.alert = function() {}; // 禁用alert弹窗
  window.confirm = function() { return true; }; // 禁用confirm弹窗
  
  // 3. 屏蔽动态加载的广告（定时检测，防止广告重新加载）
  setTimeout(removeAdElements, 2000); // 2秒后再次检测
  setTimeout(removeAdElements, 5000); // 5秒后第三次检测
}

// 页面加载完成后立即执行屏蔽
if (document.readyState === 'complete') {
  removeAdElements();
} else {
  window.addEventListener('load', removeAdElements);
}

// 4. 可选：伪装成电脑浏览器UA，避免网站加载移动端广告
Object.defineProperty(navigator, 'userAgent', {
  value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  writable: false // 防止网站修改UA
});
// ========== 增强版：屏蔽广告请求 + 样式兜底 ==========
// 1. 拦截广告相关的网络请求（需要PakePlus支持fetch拦截）
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  // 屏蔽含广告关键词的请求
  if (url && (url.includes('ad') || url.includes('advert') || url.includes('ads') || url.includes('推广'))) {
    return Promise.resolve(new Response('', { status: 204 }));
  }
  return originalFetch.apply(this, arguments);
};

// 2. 样式兜底：即使没删除的广告也隐藏
const style = document.createElement('style');
style.textContent = `
  *[class*="ad"], *[id*="ad"], *[class*="广告"], *[class*="推广"] {
    display: none !important;
    visibility: hidden !important;
    height: 0 !important;
    width: 0 !important;
  }
  .popup, .overlay, .modal { display: none !important; }
`;
document.head.appendChild(style);