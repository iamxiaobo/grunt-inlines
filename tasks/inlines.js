'use strict'

var fs = require('fs')
var path = require('path')
var cssmin = require('cssmin')

module.exports = function(grunt) {
  grunt.registerMultiTask('inlines', 'inline sources to string', function() {
    var options = this.options()
    var cssminFlag = !!options.cssmin

    this.files.forEach(function(obj) {
      var src = obj.src[0]
      var content = fs.readFileSync(src, { encoding: 'UTF-8'}) 

      if (/__inline\(['"]([^'"]+)['"]\)/.test(content)) {
        var name = RegExp.$1 
        var filePath = path.join(path.dirname(src), name)

        var fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })

        if (/\.css$/.test(filePath) && cssminFlag) {
          fileContent = cssmin(fileContent) 
        }

        if (fs.existsSync(filePath)) {
          fs.writeFileSync(src, content.replace(/__inline[^)]+\)/, `'${ fileContent }'`))
        }
      }
    })
  })
}
