# rkgis
### a fast no-api Google Images search

## Installation

Install with [npm](https://www.npmjs.com/)

```bash
npm i imagemagick
```

## Usage

Include with
```javascript
const rkgis = require('rkgis')
```

rkgis returns a promise, which you can use as follows
```javascript
rkgis('cats').then(e=>console.log(e))
```

there are currently 2 options available, random and max
```javascript
rkgis('cats', {random: true, max: 5})
```
random will shuffle the array, and max will limit the number of results



## License
[MIT](https://choosealicense.com/licenses/mit/)
