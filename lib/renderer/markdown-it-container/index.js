module.exports = function (md, options) {
  const plugin = require('markdown-it-container')

  md.use(plugin, 'note', {
    validate: function (params) {
      return params.trim().match(/^(default|primary|success|info|warning|danger)(.*)$/)
    },
    render: function (tokens, idx) {
      const m = tokens[idx].info.trim().match(/^(.*)$/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="note ' + m[1].trim() + '">\n'
      } else {
        // closing tag
        return '</div>\n'
      }
    }
  })

  md.use(plugin, 'tab', {
    marker: ';',

    validate: function (params) {
      const params_trim = params.trim()
      return [params_trim, params_trim.substring(0, params_trim.indexOf(' ')).trim(), params_trim.substring(params_trim.indexOf(' ')).trim()]
      // 匪夷所思的代码(下面这个正则的作用: 分离空格两边的字符串)
      // return params.trim().match(/^(\w+)+(.*)$/);
    },

    render: function (tokens, idx) {
      // 匪夷所思的代码(下面这个正则的作用: 分离空格两边的字符串)
      // const m = tokens[idx].info.trim().match(/^(\w+)+(.*)$/);
      const token_info = tokens[idx].info.trim()
      const m = [token_info, token_info.substring(0, token_info.indexOf(' ')).trim(), token_info.substring(token_info.indexOf(' ')).trim()]
      if (tokens[idx].nesting === 1) {
        // opening tag
        return '<div class="tab" data-id="' + m[1].trim() + '" data-title="' + m[2].trim() + '">\n'
      } else {
        // closing tag
        return '</div>\n'
      }
    }
  })

  md.use(plugin, 'collapse', {
    marker: '+',

    validate: function (params) {
      return params.match(/^(primary|success|info|warning|danger|\s)(.*)$/)
    },

    render: function (tokens, idx) {
      const m = tokens[idx].info.match(/^(primary|success|info|warning|danger|\s)(.*)$/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        const style = m[1].trim()
        return '<details' + (style ? ' class="' + style + '"' : '') + '><summary>' + m[2].trim() + '</summary><div>\n'
      } else {
        // closing tag
        return '</div></details>\n'
      }
    }
  })
}
