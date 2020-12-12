const { watch, src, dest } = require('gulp')
const del = require('del')
function defaultTask() {
  const watcher = watch(['./test/**/*'])
  watcher.on('change', function (path, stats) {
    delfile(path)
    copy(path)
  })
  watcher.on('add', function (path, stats) {
    copy(path)
  })
  watcher.on('unlink', function (path, stats) {
    delfile(path)
  })
}
function delfile(path) {
  let allFile = path.split('/')
  let watchFile = allFile[0] // 获得修改的文件名称
  let distPash = path.replace(watchFile, '') //压缩的文件路径
  del('default' + distPash)
}
function copy(path) {
  let allFile = path.split('/')
  let watchFile = allFile[0] // 获得监听的根文件
  let changeFile = allFile[allFile.length - 1] // 获得改变的文件
  let distPash = path.replace(watchFile, '').replace(changeFile, '') //压缩的文件路径
  return src(path).pipe(dest('default' + distPash))
}
exports.default = defaultTask
