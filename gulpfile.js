const { watch } = require('gulp')

watch(['./run/**/*'], cb => {
  // body omitted
  console.log(cb, 111)
})
