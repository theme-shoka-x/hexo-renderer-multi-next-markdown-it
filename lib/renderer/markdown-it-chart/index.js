function guid () {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

module.exports = (md, options) => {
  const defaultRenderer = md.renderer.rules.fence.bind(md.renderer.rules)

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const code = token.content.trim()

    if (token.info === 'chart') {
      const r = guid()

      return `<div id="chart${r}"></div>
            <script type="text/javascript">
                const chart${r} = new frappe.Chart(document.getElementById('chart${r}'), ${code});
                window.addEventListener('pjax:send', function() {
                    chart${r}.destroy()
                });
            </script>`
    }

    return defaultRenderer(tokens, idx, options, env, self)
  }
}
