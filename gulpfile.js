const { watch, src, dest } = require('gulp')
const del = require('del')

const copy = path => {
  let allFile = path.split('/')
  let watchFile = allFile[0] // 获得监听的根文件
  let changeFile = allFile[allFile.length - 1] // 获得改变的文件
  let distPash = path.replace(watchFile, '').replace(changeFile, '') //压缩的文件路径
  if (allFile.includes('views')) {
    let topath = allFile.includes('pc_test') ? 'pc' : 'mobile'
    return src(path).pipe(dest(`${topath}/template${distPash}`))
  } else {
    return src(path).pipe(dest('default' + distPash))
  }
}
const delfile = path => {
  let allFile = path.split('/')
  let watchFile = allFile[0]
  let distPash = path.replace(watchFile, '')
  if (allFile.includes('views')) {
    let topath = allFile.includes('pc_test') ? 'pc' : 'mobile'
    del(`${topath}/template${distPash}`)
  } else {
    del('default' + distPash)
  }
}

const pcTask = () => {
  console.log('监听pc_test....')
  const watcher = watch(['./pc_test/**/*'])
  watcher.on('change', path => {
    delfile(path)
    copy(path)
  })
  watcher.on('add', path => {
    copy(path)
  })
  watcher.on('unlink', path => {
    delfile(path)
  })
}
const mobileTask = () => {
  console.log('监听mobile_test....')
  const watcher = watch(['./mobile_test/**/*'])
  watcher.on('change', path => {
    delfile(path)
    copy(path)
  })
  watcher.on('add', path => {
    copy(path)
  })
  watcher.on('unlink', path => {
    delfile(path)
  })
}

exports.default = pcTask
exports.pcTask = pcTask
exports.mobileTask = mobileTask
