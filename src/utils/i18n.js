/* eslint-disable no-console */
// import { fromJS } from 'immutable'

//TODO: dynamically load locales, to think about cdn
const DEFAULT_LOCALE = 'en'
const locales = { en: {}, hans: {}, hant: {} }
const LocaleMap = new Map([
  ['hans', code => '1,zh-cn,zh-hans,zh,hans,cn,chs,cs'.includes(code)],
  ['hant', code => '2,zh-tw,zh-hant,zht,hant,cht,ct'.includes(code)],
  [DEFAULT_LOCALE, () => DEFAULT_LOCALE]
])
/**
 * load resource for specify locale
 * @param {string} lang locale
 * @returns Promise
 */
const loadResource = lang => {
  let res = locales[lang]
  if (Object.getOwnPropertyNames(res).length === 0) {
    return import(`../locales/${lang}`)
      .then(data => {
        console.debug(`${lang} loaded`)
        return data.default
      })
      .catch(err => {
        console.error(`cannot support locale [${lang}]`, err)
        return locales[DEFAULT_LOCALE]
      })
  }
  return res
}
/**
 * current locale
 */
let locale = localStorage.getItem('lang') || DEFAULT_LOCALE
/**
 * cached resource by current locale
 */
let resource = {}

/**
 * async function to change current locale
 * @param {String} lang lang code
 */
const changeLocale = async lang => {
  lang = lang || navigator.language || navigator.userLanguage
  for (const it of LocaleMap) {
    if (it[1](lang)) {
      lang = it[0]
      break
    }
  }
  locale = lang
  resource = await loadResource(locale)
  locales[locale] = resource
  localStorage.setItem('lang', lang)
}

function _t(res, key, ...args) {
  let msg = res[key]
  if (msg === undefined) {
    msg = locales[DEFAULT_LOCALE][key]
    if (msg === undefined) {
      msg = key
      console.error(`the key [${key}] of locale [${locale}] is not found`)
      // throw new Error(`the key [${key}] of locale [${locale}] is not found`)
    }
  }
  if (args && args.length > 0) {
    return msg.format(...args)
  }
  return msg
}

/**
 * default translator
 * @param {string} key
 * @param  {...any} args
 */
const t = (key, ...args) => {
  return _t(resource, key, ...args)
}

/**
 * almost same to t, it can dynamically translate by locale
 * @param {string} lang locale name
 */
const t2 = lang => {
  // use dynamical resouce instead of global
  let res = locales[lang] || locales[DEFAULT_LOCALE]
  return (key, ...args) => {
    return _t(res, key, ...args)
  }
}

if (!String.prototype.format) {
  String.prototype.format = function(...args) {
    if (typeof args[0] === 'object') {
      // args is a json object
      args = args[0]
    }
    return this.replace(/\{(\d+|\w+)\}/g, function(m, i) {
      return args[i]
    })
  }
}

// const $$locales = fromJS(locales)
export { t, t2, changeLocale, locale }
