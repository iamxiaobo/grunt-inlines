## grunt-inlines

grunt-inlines helps you insert code which have been minified inline your file, it supports css and html files.

### Usage

In your Gruntfile.js, write like below: 

```js
inlines: {
  options: {
    cssmin: true,
    htmlmin: true
  },
  files: {
    src: ...,
    dist: ...
  }
}
```

then, you can invoke function **__inline** in your javascript file, just like this:

```js
// demo.js
// be sure that ./css/style.css exists
var styleCSS = __inline("./css/style.css")
var template = __inline("./html/footer.html")
```

and ./css/style.css file's content is:

```css
.name {
  color: red;  
}
```

and ./html/footer.html file's content is:

```html
<footer>
this is footer
</footer>
```

after compiled by grunt, demo.js would become: 

```js
var styleCSS = '.name{color:red}'
var template = '<footer>this is footer</footer>'
```
