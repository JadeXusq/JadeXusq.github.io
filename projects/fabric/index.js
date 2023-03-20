/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
const mainInput = document.getElementById('mainInput') // 获取上传主图按钮的DOM
const composeInput = document.getElementById('composeInput') // 获取多传组合图片按钮的DOM
const finishBtn = document.getElementById('finishBtn') // 获取生成最终结果按钮的DOM
const exportBtn = document.getElementById('exportBtn') // 获取倒出图片按钮的DOM
// eslint-disable-next-line no-undef
const canvas = new fabric.Canvas('canvas') // 实例一个flare的canvas对象，传入的是canvas的id
const ctx = canvas.getContext('2d') // 绘制2d图像

let mainColors = []
let composeColors = []


function getMainColorStyle(rgbas) {
  const mainColors = [] // 用来收集1000个格子的主色调rgba
  
  for (const colors of rgbas) {
      let r = 0; let g = 0; let b = 0; let a = 0
      for (const color of colors) {
          // 累加
          r += color[0]
          g += color[1]
          b += color[2]
          a += color[3]
      }
      mainColors.push([
          Math.round(r / colors.length), // 取平均值
          Math.round(g / colors.length), // 取平均值
          Math.round(b / colors.length), // 取平均值
          Math.round(a / colors.length) // 取平均值
      ])
  }
  return mainColors
}

function getMainRGBA() {
  const rgbas = [] // 用来收集10000个格子的色彩信息
  for (let y = 0; y < canvas.height; y += 8) {
      for (let x = 0; x < canvas.width; x += 8) {
          // 获取每一块格子的色彩data
          const { data } = ctx.getImageData(x, y, 8, 8)
          rgbas[y / 8 * 100 + x / 8] = []
          for (let i = 0; i < data.length; i += 4) {
              // 4个4个收集，因为每4个就组成一个像素的rgba
              rgbas[y / 8 * 100 + x / 8].push([
                  data[i],
                  data[i + 1],
                  data[i + 2],
                  data[i + 3]
              ])
          }
      }
  }
  // 算出10000个格子，每个格子的主色调
  mainColors = getMainColorStyle(rgbas)
}

function drawMainImage(url) {
    // 接收传进来的url
    // eslint-disable-next-line no-undef
    fabric.Image.fromURL(url, img => {
        console.log(img)
        // 转换成功后的回调
        // fabric.Image.fromURL会将此url转换成一张图片

        // 需要缩放图片，height > width 就按照 width的缩放比例，反之用height的缩放比例
        // 反过来是为了能充满整张图
        const scale = img.height > img.width ? canvas.width / img.width : canvas.height / img.height

        // 设置这张图像绘制的参数
        img.set({
            left: canvas.width / 2, // 距离canvas画板左边一半宽度
            originX: 'center', // 水平方向居中
            top: 0, // 距离顶部距离为0
            scaleX: scale, // 图像水平缩放比例
            scaleY: scale, // 图像竖直缩放比例
            selectable: false // 不可操作，默认是true
        })

        // 图片绘制完成的回调函数
        img.on('added', () => {
            console.log('图片加载完成了啊')
            setTimeout(() => {
                // 绘制完成后，获取此图像中10000个格子的色彩信息
                getMainRGBA()
            }, 200) // 这里用延时器，是因为图像绘制有延迟
            // 而这里需要保证图像真的完全绘制完，再去获取色彩信息
        })

        // 把此图像绘制到canvas画板中
        canvas.add(img)
    })
}
function getComposeColorStyle(url, name) {
  return new Promise(resolve => {
      // 创建一个 20 * 20的canvas画板
      // 理论上这里宽高可以自己定，但是越大，色彩会越精准
      const composeCanvas = document.createElement('canvas')
      const composeCtx = composeCanvas.getContext('2d')
      composeCanvas.width = 20
      composeCanvas.height = 20

      // 创建img对象
      const img = new Image()
      img.src = url
      img.onload = function () {
          const scale = composeCanvas.height / composeCanvas.height
          img.height *= scale
          img.width *= scale

          // 将img画到临时canvas画板
          composeCtx.drawImage(img, 0, 0, composeCanvas.width, composeCanvas.height)
          // 获取颜色信息data
          const { data } = composeCtx.getImageData(0, 0, composeCanvas.width, composeCanvas.height)

          // 累加  r，g，b，a
          let r = 0; let g = 0; let b = 0; let a = 0
          for (let i = 0; i < data.length; i += 4) {
              r += data[i]
              g += data[i + 1]
              b += data[i + 2]
              a += data[i + 3]
          }
          resolve({
              // 主色调
              rgba: [
                  Math.round(r / (data.length / 4)), // 取平均值
                  Math.round(g / (data.length / 4)), // 取平均值
                  Math.round(b / (data.length / 4)), // 取平均值
                  Math.round(a / (data.length / 4)) // 取平均值
              ],
              url,
              name
          })
      }
  })
}

function finishCompose() {
  const urls = [] // 收集最终绘制的10000张图片

  // eslint-disable-next-line no-restricted-syntax
  for (const main of mainColors) { // 遍历10000个格子主色调

      let closestIndex = 0 // 最接近主色调的图片的index
      let minimumDiff = Infinity // 相差值

      for (let i = 0; i < composeColors.length; i++) {
          const { rgba } = composeColors[i]
          // 格子主色调rgba四个值，减去图片主色调rgba四个值，的平方
          const diff = (rgba[0] - main[0]) ** 2 + (rgba[1] - main[1]) ** 2
              + (rgba[2] - main[2]) ** 2 + (rgba[3] - main[3]) ** 2

          // 然后开跟比较
          if (Math.sqrt(diff) < minimumDiff) {
              minimumDiff = Math.sqrt(diff)
              closestIndex = i
          }
      }

      // 把最小色差的图片url添加进数组urls
      urls.push(composeColors[closestIndex].url)
  }


  // 将urls中10000张图片，分别绘制在对应的10000个格子中
  for (let i = 0; i < urls.length; i++) {
      fabric.Image.fromURL(urls[i], img => {
          const scale = img.height > img.width ? 8 / img.width : 8 / img.height;
          img.set({
              left: i % 100 * 8,
              top: Math.floor(i / 100) * 8,
              originX: "center",
              scaleX: scale,
              scaleY: scale,
          });
          canvas.add(img)
      })
  }
}


// 导出图片
function exportCanvas() {
  const dataURL = canvas.toDataURL({
      width: canvas.width,
      height: canvas.height,
      left: 0,
      top: 0,
      format: "png",
  });
  const link = document.createElement("a");
  link.download = "嫦娥姐姐.png";
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// 监听上传主图按钮的上传变化
mainInput.onchange = function (e) {
    // 只有一个图片，所以是e.target.files[0]
    const url = window.URL.createObjectURL(e.target.files[0])
    // 将生成的blob地址传入
    drawMainImage(url)
}

composeInput.onchange = async function (e) {
    const promises = [] // promises数组
    for (file of e.target.files) {
        // 将每张图片生成blob地址
        const url = window.URL.createObjectURL(file)
        // 传入blob地址
        promises.push(getComposeColorStyle(url, file.name))
    }
    const res = await Promise.all(promises) // 顺序执行所有promise
    composeColors = res // 将结果赋值给composeColors
}

// 监听完成按钮
finishBtn.onclick = finishCompose

// 监听导出按钮
exportBtn.onclick = exportCanvas


