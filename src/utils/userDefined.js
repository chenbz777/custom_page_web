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

// 扁平化对象：将嵌套对象转化为 'parent.child' 的形式
function flattenObject(obj, prefix = '') {
  // 存储最终结果的扁平对象
  let result = {};

  // 遍历当前对象的所有可枚举属性
  for (const key in obj) {
    // 安全检测：确保只处理对象自身的属性（跳过原型链属性）
    if (Object.prototype.hasOwnProperty.call(obj, key)) {

      /* 键名生成逻辑 */
      // 当前属性路径：如果有前缀则拼接，否则直接使用当前键
      // 示例：prefix='parent', key='child' => 'parent.child'
      const newKey = prefix ? `${prefix}.${key}` : key;

      // 获取当前属性值
      const value = obj[key];

      /* 值处理逻辑 */
      if (typeof value === 'object' && value !== null) {
        // 递归情况：值为对象/数组时继续深层扁平化
        // 使用 Object.assign 合并深层扁平化结果到当前结果集
        Object.assign(
          result,
          flattenObject(value, newKey) // 递归时传递拼接后的新键名作为前缀
        );
      } else {
        // 基础情况：原始值直接存入结果对象
        result[newKey] = value;
      }
    }
  }

  return result;
}

// 恢复扁平对象：将扁平对象转化为嵌套对象
function unfastenObject(flatObj) {
  const result = {};

  for (const [key, value] of Object.entries(flatObj)) {
    const path = key.split('.');
    let current = result;

    for (let i = 0; i < path.length; i++) {
      const part = path[i];
      const isLast = i === path.length - 1;

      // 更严格的数组索引检测逻辑
      let isNextPartArrayIndex = false;
      if (!isLast) {
        const nextPart = path[i + 1];
        const num = Number(nextPart);

        // 同时满足：
        // 1. 是有效数字
        // 2. 是非负整数
        // 3. 数字的字符串形式与原字符串严格一致（避免前导零等问题）
        isNextPartArrayIndex = (
          !isNaN(num) &&                     // 是有效数字
          Number.isInteger(num) &&           // 是整数
          num >= 0 &&                        // 非负
          num <= 4294967295 &&               // 在数组最大索引范围内
          String(num) === nextPart           // 严格匹配格式
        );
      }

      if (!isLast) {
        if (current[part] === undefined) {
          // 根据下一层级是否为数组索引，决定创建数组或对象
          current[part] = isNextPartArrayIndex ? [] : {};
        }
        current = current[part];
      } else {
        current[part] = value;
      }
    }
  }

  return result;
}

function replaceTemplate(_text, data = {}) {
  let text = _text;

  // 获取扁平化后的数据
  const flatData = flattenObject(data);

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
  for (const key in flatData) {
    const value = flatData[key];

    text = replaceText(text, key, value);
  }

  return text;
}

/**
 * @author: chenbz
 * @description: 跳转到地图导航
 * @param {Object} data
 * @param {Number} data.latitude - 纬度
 * @param {Number} data.longitude - 经度
 * @param {String} data.name - 地点名称
 * @param {String} data.address - 地点地址
 * @param {String} data.mapType - 地图类型: 'gaode' | 'baidu'
 * @param {Boolean} data.isNewWindow - 是否新窗口打开
 */
function navigateToMap(data = {}) {
  let { latitude,
    longitude,
    name,
    address,
    mapType = 'gaode',
    isNewWindow = false
  } = data;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isWechat = /MicroMessenger/i.test(navigator.userAgent);

  if (!name) {
    name = address;
  }

  name = encodeURIComponent(name);
  address = encodeURIComponent(address);

  if (!['gaode', 'baidu'].includes(mapType)) {
    console.error('mapType参数错误');
    return;
  }

  let protocol = '';

  if (mapType === 'gaode') {
    const iosScheme = `iosamap://path?sourceApplication=applicationName&dlat=${latitude}&dlon=${longitude}&dname=${name}&dev=0&t=0`;
    const androidScheme = `amapuri://route/plan?sourceApplication=applicationName&dlat=${latitude}&dlon=${longitude}&dname=${name}&dev=0&t=0`;
    const webUrl = `//uri.amap.com/marker?markers=${longitude},${latitude},${name}&src=mypage&callnative=0`;

    protocol = webUrl;

    // 移动端
    if (isMobile) {
      if (isIOS) {
        // 官方文档: https://lbs.amap.com/api/amap-mobile/guide/ios/route
        protocol = iosScheme;
      }

      if (isAndroid) {
        // 官方文档: https://lbs.amap.com/api/amap-mobile/guide/android/route
        protocol = androidScheme;
      }

      // 微信浏览器无法唤起app, 降级方案 => 跳转到高德地图H5页面
      if (isWechat) {
        // 官方文档: https://lbs.amap.com/api/uri-api/guide/mobile-web/points
        protocol = webUrl;
      }
    }
  }

  if (mapType === 'baidu') {
    const iosScheme = `baidumap://map/direction?destination=name:${name}|latlng:${latitude},${longitude}&mode=driving&src=ios.baidu.openAPIdemo`;
    const androidScheme = `bdapp://map/direction?destination=name:${name}|latlng:${latitude},${longitude}&mode=driving&src=ios.baidu.openAPIdemo`;
    const webUrl = `//api.map.baidu.com/marker?location=${latitude},${longitude}&title=${name}&content=${address}&output=html&src=webapp.baidu.openAPIdemo`;

    protocol = webUrl;

    // 移动端
    if (isMobile) {
      if (isIOS) {
        // 官方文档: https://lbsyun.baidu.com/faq/api?title=webapi/uri/ios
        protocol = iosScheme;
      }
      if (isAndroid) {
        // 官方文档: https://lbsyun.baidu.com/faq/api?title=webapi/uri/andriod
        protocol = androidScheme;
      }

      // 微信浏览器无法唤起app, 降级方案 => 跳转到百度地图H5页面
      if (isWechat) {
        // 官方文档: https://lbsyun.baidu.com/faq/api?title=webapi/uri/web
        protocol = webUrl;
      }
    }
  }

  if (isNewWindow) {
    window.open(protocol, '_blank');
  } else {
    window.location.href = protocol;
  }
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
  flattenObject,
  unfastenObject,
  replaceTemplate,
  navigateToMap
};