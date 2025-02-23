// 网页局部全屏
function localFullScreen(elementId) {
  const element = document.getElementById(elementId);
  element.classList.toggle('g-local-full-screen');  // 切换类名状态
}

/**
 * @author: chenbz
 * @description: 获取url参数
 * @return {*}
 */
function getParameter() {
  const query = location.search.substring(1);
  const vars = query.split('&');

  const temp = {};

  vars.forEach(item => {
    const valueArr = item.split('=');

    temp[valueArr[0]] = valueArr[1];
  });

  return temp;
}

function setPageTitle(title) {
  if (!title) {

    return false;
  }

  document.title = title;
}

function goTop(top = 0) {
  window.scrollTo({
    top,
    behavior: 'smooth'
  });
}

function isMobile() {

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isWx() {
  return /MicroMessenger/i.test(window.navigator.userAgent);
}

function copyText(text) {
  if (!text) {
    return false;
  }

  const input = document.createElement('input');

  input.setAttribute('value', text);

  document.body.appendChild(input);

  input.select();

  const copy = document.execCommand('copy');

  document.body.removeChild(input);

  return copy;
}

/**
 * @author: chenbz
 * @description: 将文本中的转译字符转换为富文本
 * @param {string} text 文本
 * @return {string} 富文本
 */
function convertToRichText(text) {
  // 检查文本中是否包含转译字符
  if (text.includes('&lt;') || text.includes('&gt;')) {
    // 使用正则表达式进行转换
    text = text.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    return text;
  } else {
    // 如果文本中不包含转译字符，直接返回原文本
    return text;
  }
}

/**
 * @author: chenbz
 * @description: 替换html标签
 * @param {string} html html字符串
 * @param {Array} replacements 替换的标签
 * @return {string} 替换后的html字符串
 */
function replaceHtmlTags(html, replacements) {

  if (!html) { return ''; }

  html = convertToRichText(html);

  if (!replacements || replacements.length === 0) { return html; }

  const replaceStyle = (p1, style) => {
    // 删除原有的style属性
    p1 = p1.replace(/(style="[^"]*?")/g, '');

    // 添加新的style属性
    if (p1.includes('/>')) {
      // 自闭合标签
      p1 = p1.replace('/>', ` style="${style}" />`);
    } else {
      p1 = p1.replace('>', ` style="${style}">`);
    }

    return p1;
  };

  const replaceClass = (p1, className) => {
    // 删除原有的class属性
    p1 = p1.replace(/(class="[^"]*?")/g, '');

    // 添加新的class属性
    if (p1.includes('/>')) {
      // 自闭合标签
      p1 = p1.replace('/>', ` class="${className}" />`);
    } else {
      p1 = p1.replace('>', ` class="${className}">`);
    }

    return p1;
  };

  for (let i = 0; i < replacements.length; i++) {
    const tag = replacements[i].tag;
    const style = replacements[i].style;
    const styleAppend = replacements[i].styleAppend;
    const className = replacements[i].class;
    const classNameAppend = replacements[i].classAppend;

    // 构建正则表达式匹配相应的标签
    const regex = new RegExp(`(<${tag}\\s*[^>]*>)`, 'g');

    // 使用正则表达式匹配图片标签并添加宽度属性
    html = html.replace(regex, function (match, p1) {

      if (style) {
        p1 = replaceStyle(p1, style);
      }

      if (styleAppend) {
        // 如果存在 styleAppend，则追加样式
        if (p1.includes('style="')) {
          let oldStyle = p1.match(/style="([^"]*)"/)[1];

          if (oldStyle[oldStyle.length - 1] !== ';') {
            oldStyle += ';';
          }

          const newStyle = oldStyle + styleAppend;

          p1 = replaceStyle(p1, newStyle);
        } else {
          p1 = replaceStyle(p1, styleAppend);
        }
      }

      if (className) {
        p1 = replaceClass(p1, className);
      }

      if (classNameAppend) {
        // 如果存在 classNameAppend，则追加样式
        if (p1.includes('class="')) {
          let oldClass = p1.match(/class="([^"]*)"/)[1];

          if (oldClass[oldClass.length - 1] !== ' ') {
            oldClass += ' ';
          }

          const newClass = oldClass + className;

          p1 = replaceClass(p1, newClass);
        } else {
          p1 = replaceClass(p1, classNameAppend);
        }
      }

      return p1;
    });
  }

  return html;
}

function hexToRgb(hex) {
  // 移除可能的 '#' 符号
  hex = hex.replace('#', '');

  // 解析十六进制颜色为 RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // 返回 RGB 对象
  return { r, g, b };
}

function hexToRgba(hex, alpha = 1) {
  // 解析十六进制颜色为 RGB
  const { r, g, b } = hexToRgb(hex);

  // 返回 rgba 字符串
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getTextColor(backgroundColor) {
  const rgb = hexToRgb(backgroundColor);
  const brightness = rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114;
  return brightness > 186 ? '#000000' : '#FFFFFF'; // 186 是常用的阈值
}

function exportJSON(data, fileName) {

  const blob = new Blob([JSON.stringify(data)], { type: 'application/json;charset=utf-8' });

  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, fileName);
  } else {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  }
}

function importJSON() {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.click();

    input.onchange = (e) => {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);

        resolve(data);
      };
    };
  });
}

function replaceTemplate(_text, data = {}) {
  let text = _text;

  function replaceText(template, key, value) {
    // 检查文本中是否包含 {{key}}
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');

    if (!regex.test(template)) {
      return template;  // 如果不包含 {{key}}，则不进行处理，直接返回原文本
    }

    // 使用 replace 方法进行全局替换
    return template.replace(regex, value);
  }

  // 遍历 data 对象
  for (const key in data) {
    text = replaceText(text, key, data[key]);
  }

  return text;
}

export default {
  localFullScreen,
  getParameter,
  setPageTitle,
  goTop,
  isMobile,
  isWx,
  copyText,
  replaceHtmlTags,
  convertToRichText,
  hexToRgb,
  hexToRgba,
  getTextColor,
  exportJSON,
  importJSON,
  replaceTemplate
};