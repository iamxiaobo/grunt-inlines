'use strict'

var fs = require('fs')
var path = require('path')
var cssmin = require('cssmin')
var htmlmin = require('html-minifier').minify

module.exports = function(grunt) {
  grunt.registerMultiTask('inlines', 'inline sources to string', function() {
    var options = this.options()
    var cssminFlag = !!options.cssmin
    var htmlminFlag = !!options.htmlmin

    var htmlminOptions = {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeComments: true,
      removeTagWhitespace: true
    }

    this.files.forEach(function(obj) {
      var src = obj.src[0]
      var content = fs.readFileSync(src, { encoding: 'UTF-8'}) 

      if (/__inline\(['"]([^'"]+)['"]\)/.test(content)) {
        var name = RegExp.$1 
        var filePath = path.join(path.dirname(src), name)

        var fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
        var fileType = filePath.match(/\.([^/]+)$/)[1]

        switch(fileType) {
          case "css":
            if (cssminFlag) {
              fileContent = cssmin(fileContent)
            }
            break
          
          case "html":
            if (htmlminFlag) {
              fileContent = htmlmin(fileContent, htmlminOptions)
            }
            break
        }

        if (fs.existsSync(filePath)) {
          fs.writeFileSync(src, content.replace(/__inline[^)]+\)/, `'${ fileContent }'`))
        }
      }
    })
  })
}
