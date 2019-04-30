import {
  Message
} from 'element-ui';

export const hashRE = /#.*$/
export const extRE = /\.(md|html)$/
export const endingSlashRE = /\/$/
export const outboundRE = /^(https?:|mailto:|tel:)/

export function normalize(path) {
  return decodeURI(path)
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function getHash(path) {
  const match = path.match(hashRE)
  if (match) {
    return match[0]
  }
}

export function isExternal(path) {
  return outboundRE.test(path)
}

export function isMailto(path) {
  return /^mailto:/.test(path)
}

export function isTel(path) {
  return /^tel:/.test(path)
}

export function ensureExt(path) {
  if (isExternal(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  const normalized = normalize(path)

  if (endingSlashRE.test(normalized)) {
    return path
  }
  return normalized + '.html' + hash
}

export function isActive(route, path) {
  const routeHash = route.hash
  const linkHash = getHash(path)
  if (linkHash && routeHash !== linkHash) {
    return false
  }
  const routePath = normalize(route.path)
  const pagePath = normalize(path)
  return routePath === pagePath
}

export function resolvePage(pages, rawPath, base) {
  if (base) {
    rawPath = resolvePath(rawPath, base)
  }
  const path = normalize(rawPath)
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].regularPath) === path) {
      return Object.assign({}, pages[i], {
        type: 'page',
        path: ensureExt(pages[i].path)
      })
    }
  }
  console.error(`[vuepress] No matching page found for sidebar item "${rawPath}"`)
  return {}
}

function resolvePath(relative, base, append) {
  const firstChar = relative.charAt(0)
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  const stack = base.split('/')

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop()
  }

  // resolve relative path
  const segments = relative.replace(/^\//, '').split('/')
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    if (segment === '..') {
      stack.pop()
    } else if (segment !== '.') {
      stack.push(segment)
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('')
  }

  return stack.join('/')
}

/**
 * @param { Page } page
 * @param { string } regularPath
 * @param { SiteData } site
 * @param { string } localePath
 * @returns { SidebarGroup }
 */
export function resolveSidebarItems(page, regularPath, site, localePath) {
  const {
    pages,
    themeConfig
  } = site

  const localeConfig = localePath && themeConfig.locales ?
    themeConfig.locales[localePath] || themeConfig :
    themeConfig

  const pageSidebarConfig = page.frontmatter.sidebar || localeConfig.sidebar || themeConfig.sidebar
  if (pageSidebarConfig === 'auto') {
    return resolveHeaders(page)
  }

  const sidebarConfig = localeConfig.sidebar || themeConfig.sidebar
  if (!sidebarConfig) {
    return []
  } else {
    const {
      base,
      config
    } = resolveMatchingConfig(regularPath, sidebarConfig)
    return config ?
      config.map(item => resolveItem(item, pages, base)) : []
  }
}

/**
 * @param { Page } page
 * @returns { SidebarGroup }
 */
function resolveHeaders(page) {
  const headers = groupHeaders(page.headers || [])
  return [{
    type: 'group',
    collapsable: false,
    title: page.title,
    path: null,
    children: headers.map(h => ({
      type: 'auto',
      title: h.title,
      basePath: page.path,
      path: page.path + '#' + h.slug,
      children: h.children || []
    }))
  }]
}

export function groupHeaders(headers) {
  // group h3s under h2
  headers = headers.map(h => Object.assign({}, h))
  let lastH2
  headers.forEach(h => {
    if (h.level === 2) {
      lastH2 = h
    } else if (lastH2) {
      (lastH2.children || (lastH2.children = [])).push(h)
    }
  })
  return headers.filter(h => h.level === 2)
}

export function resolveNavLinkItem(linkItem) {
  return Object.assign(linkItem, {
    type: linkItem.items && linkItem.items.length ? 'links' : 'link'
  })
}

/**
 * @param { Route } route
 * @param { Array<string|string[]> | Array<SidebarGroup> | [link: string]: SidebarConfig } config
 * @returns { base: string, config: SidebarConfig }
 */
export function resolveMatchingConfig(regularPath, config) {
  if (Array.isArray(config)) {
    return {
      base: '/',
      config: config
    }
  }
  for (const base in config) {
    if (ensureEndingSlash(regularPath).indexOf(encodeURI(base)) === 0) {
      return {
        base,
        config: config[base]
      }
    }
  }
  return {}
}

function ensureEndingSlash(path) {
  return /(\.html|\/)$/.test(path) ?
    path :
    path + '/'
}

function resolveItem(item, pages, base, groupDepth = 1) {
  if (typeof item === 'string') {
    return resolvePage(pages, item, base)
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0], base), {
      title: item[1]
    })
  } else {
    if (groupDepth > 3) {
      console.error(
        '[vuepress] detected a too deep nested sidebar group.'
      )
    }
    const children = item.children || []
    if (children.length === 0 && item.path) {
      return Object.assign(resolvePage(pages, item.path, base), {
        title: item.title
      })
    }
    return {
      type: 'group',
      path: item.path,
      title: item.title,
      sidebarDepth: item.sidebarDepth,
      children: children.map(child => resolveItem(child, pages, base, groupDepth + 1)),
      collapsable: item.collapsable !== false
    }
  }
}

//博客
//查看更多 有点垃圾
export function GoAnchor(selector) {
  if (location.href.indexOf('#') != -1) {
    //若是点了标签，不要再执行了
    return
  }
  try {
    setTimeout(function () {
      if (document.getElementById(selector)) {
        let top = document.getElementById(selector).offsetTop
        document.documentElement.scrollTop = top
      }
    }, 100);
  } catch (error) {
    console.error(error)
  }
}

export function GetPostTag(t) {
  //console.log(t);
  if (t) {
    return t.length > 0 ? t[0].name : "未知事件";
  }
  return "未知事件";
}

export function GetPostTime(d) {
  try {
    let pds = d.split(",")[0];
    let ymd = pds.split("/");
    let ymdhtml =
      '<div class="post-month">' +
      ymd[0] +
      '月</div><div class="post-day">' +
      ymd[1] +
      "</div>";
    return ymdhtml;
  } catch (error) {
    console.log(error);
    return "<div>忘了时间</div>";
  }
}

export function GetPostDate(d) {
  try {
    var date = new Date(d);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = getNewDate(date.getMonth() + 1);
    var day = getNewDate(date.getDate());
    var hours = getNewDate(date.getHours());
    var minutes = getNewDate(date.getMinutes());
    var seconds = getNewDate(date.getSeconds());
    //统一格式为两位数
    function getNewDate(date) {
      if (date <= 9) {
        date = "0" + date;
      }
      return date;
    }

    var currentDate = date.getFullYear() + seperator1 + month + seperator1 + day +
      " " + hours + seperator2 + minutes + seperator2 + seconds;
    return currentDate;
  } catch (error) {
    console.error(error);
    return "忘了时间";
  }
}

export function SetSidebarPostion() {
  let w = Number(document.documentElement.clientWidth)
  let bignav = document.getElementById("Sidebar"); //获取到导航栏id
  if (w < 795) {
    bignav.style.display = "none"
    return
  }else{
    bignav.style.display = "block"
  }
  let topScroll = document.documentElement.scrollTop; //滚动的距离,距离顶部的距离
  
  if (bignav) {
    if (topScroll > 500) {
      let w = document.getElementById('lovely_blog').offsetWidth
      bignav.style.marginTop = topScroll - 500 + 'px'
      bignav.style.marginLeft = 25 + 'px'
    } else {
      bignav.style.marginTop = 0
      bignav.style.position = "static";
    }
  }
}

export function IsBlog(url) {
  let keep_url = ["/Message/", "/History/", "/Harem/"];
  for (let i = 0; i < keep_url.length; i++) {
    let is_keep = url.indexOf(keep_url[i]) != -1;
    if (is_keep) {
      return false;
    }
  }
  //HOME
  if (url == "/") {
    return false;
  }
  return true;
}

//获取当前页面
export function GetUrl() {
  let pn = location.pathname
  if (pn.indexOf("#") != -1) {
    let pns = pn.splic('#')
    if (pns.length > 0) {
      pn = pns[0]
    }
  }
  console.log("pn --- ", pn)
  return pn
}

//获取当前页面
export function Msg(msg, t) {
  let msg_type = "success"
  switch (t) {
    case 1:
      msg_type = "warning"
      break
    case 2:
      msg_type = "error"
      break
  }
  Message({
    showClose: false,
    message: msg,
    type: msg_type
  })
}

//获取用户头像
export function GetLeiMu(id) {
  //console.log("id -- ", id)
  if (id) {} else {
    return require('../static/img/leimu0.jpg')
  }
  if (id < 10) {
    return require('../static/img/leimu' + id + '.jpg')
  } else {
    id -= 10
    return GetLeiMu(id)
  }
}

//格式化go的时间
export function FormatGoTime(t) {
  var dateee = new Date(t).toJSON();
  var date = new Date(+new Date(dateee) + 3600000 * 8).toISOString().replace(/T/g, ' ').replace(/.[\d]{3}Z/, '')
  return date
}

//剪切字符
export function GetStringSub(t, l) {
  if (t.length > l) {
    return t.substring(0, l) + "..."
  } else {
    return t
  }
}

//获取当前时间
export function GetNowDate() {
  return UnixToDate((new Date()).getTime() / 1000, false)
}

//博客数据处理

//根据标签获取