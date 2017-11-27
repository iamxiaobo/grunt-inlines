## grunt-inlines

grunt-inlines helps you insert code inline in your file, now i am use it to inline css code in javascript files.

### Usage

In your Gruntfile.js, write like below: 

```js
inlines: {
  options: {
    cssmin: true
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
```

and ./css/style.css file's content is:

```css
.name {
  color: red;  
}
```

after compiled by grunt, demo.js would become: 

```js
var styleCSS = '.name{color:red}'
```
