// eslint-disable-next-line no-unused-vars
/* global hexo */
'use strict'
const CleanCSS = require('clean-css')
const Terser = require('terser')
const Htmlminifier = require('html-minifier').minify
const minimatch = require('minimatch')
/**
 * 检查此path是否为例外文件
 * @param {string} path
 * @param {array|string} exclude
 * @returns {boolean}
 */
function check_exclude (path, exclude) {
  if (exclude && !Array.isArray(exclude)) exclude = [exclude]

  if (path && exclude && exclude.length) {
    let i = 0; const len = exclude.length
    for (; i < len; i++) {
      if (minimatch.minimatch(path, exclude[i], { matchBase: true })) return true
    }
  } else return false
}

/**
 * 压缩html
 * @param {string} str
 * @param {object} data
 * @returns {string|undefined}
 */
function logic_html (str, data) {
  const hexo = this
  const options = hexo.config.minify.html
  // Return if disabled.
  if (options.enable === false) return

  const path = data.path
  if (check_exclude(path, options.exclude)) {
    return str
  }

  let result = Htmlminifier(str, options)
  const saved = ((str.length - result.length) / str.length * 100).toFixed(2)
  if (options.logger) {
    const log = hexo.log || console.log
    log.log('minify the html: %s [ %s saved]', path, saved + '%')
  }
  if (options.stamp) {
    const prefix = `<!-- build time: ${Date()} -->`
    const end = '<!-- rebuild by hexo-renderer-multi-next-markdown-it -->'
    result = prefix + result + end
  }
  return result
}

function logic_css (str, data) {
  const hexo = this
  const options = hexo.config.minify.css
  // Return if disabled.
  if (options.enable === false) return

  const path = data.path
  if (check_exclude(path, options.exclude)) {
    return str
  }

  return new Promise(function (resolve, reject) {
    new CleanCSS(options).minify(str, function (err, result) {
      if (err) return reject(err)
      const saved = ((str.length - result.styles.length) / str.length * 100).toFixed(2)
      let css_result = result.styles
      if (options.stamp) {
        const prefix = `/* build time: ${Date().toLocaleString()} */\n`
        const end = '\n/* rebuild by hexo-renderer-multi-next-markdown-it */'
        css_result = prefix + css_result + end
      }
      resolve(css_result)
      if (options.logger) {
        const log = hexo.log || console.log
        log.log('minify the css: %s [ %s saved]', path, saved + '%')
      }
    })
  })
}

function logic_js (str, data) {
  let js_result
  const hexo = this
  const options = hexo.config.minify.js
  // Return if disabled.
  if (options.enable === false) return

  let path = data.path
  if (check_exclude(path, options.exclude)) {
    return str
  }
  const uglify_v3_allow_options = ['parse', 'compress', 'mangle', 'output', 'sourceMap', 'nameCache', 'toplevel', 'warnings']
  const uglify_options = {}
  for (const key of uglify_v3_allow_options) {
    if (options[key] !== undefined) uglify_options[key] = options[key]
  }
  const deasyncPromise = require('deasync-promise')
  const result = deasyncPromise(Terser.minify(str, uglify_options))
  if (!result.error) {
    const saved = ((str.length - result.code.length) / str.length * 100).toFixed(2)
    if (options.logger) {
      const log = hexo.log || console.log
      if (path === undefined) {
        path = 'unknown.js'
      }
      log.log('minify the js: %s [ %s saved]', path, saved + '%')
    }
    js_result = result.code
    if (options.stamp) {
      const prefix = `// build time: ${Date().toLocaleString()} \n`
      const end = '\n//rebuild by hexo-renderer-multi-next-markdown-it '
      js_result = prefix + js_result + end
    }
  } else throw result.error
  return js_result
}

module.exports = {
  logic_html,
  logic_css,
  logic_js
}
