module.exports = (api, options = {}, rootOptions = {}) => {
  api.extendPackage({
    dependencies: {
      'ant-design-vue': '^1.7.2',
      store: '^2.0.12'
    }
  })
  api.injectImports(api.entryFile, `import './iview'`)
  api.render('./template')
}
