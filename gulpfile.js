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
  var allFile = path.split('/')
  var watchFile = allFile[0] // 获得修改的文件名称
  var distPash = path.replace(watchFile, '') //压缩的文件路径
  // console.log(change_path, 'del')
  console.log(distPash)
  del('default' + distPash)
}
function copy(path) {
  var allFile = path.split('/')
  var watchFile = allFile[0] // 获得修改的文件名称
  var changeFile = allFile[allFile.length - 1] // 获得修改的文件名称
  var distPash = path.replace(watchFile, '').replace(changeFile, '') //压缩的文件路径
  // console.log(change_path, 'del')
  console.log(distPash)

  return src(path).pipe(dest(distPash))
}
exports.default = defaultTask
