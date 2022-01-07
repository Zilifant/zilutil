// keyframe cycle

// const example = {
//   name: 'code-rotator-one',
//   duration: 2, // seconds
//   frames: [
//     '⠁','⠉','⠙','⠹','⢹','⣹','⣽','⣿','⣾','⣶','⣦','⣆','⡆','⠆','⠂','⠀'
//   ]
// }

exports.keyframeCycle = function compileCSS({name, frames, duration=5}) {
  const frFrames = formatFrames(frames)
  const selector = formatSelector(name, duration)
  const keyframe = formatKeyframe(name, frFrames)
  return `${selector}\n\n${keyframe}`
}

function formatFrames(framesArr) {
  return createFramesString(distIntoHundred(framesArr))
}

function distIntoHundred(frames) {
  const num = frames.length
  const inc = 100 / num
  let acc = 0
  const res = frames.map(stg => {
    const x = [stg, parseInt(acc)]
    acc = acc + inc
    return x
  });
  return [...res, [frames[0], 100]]
}

function createFramesString(frames) {
  const formattedArr = frames.map(e => {
    function spc(n) {
      const len = n.toString().length
      return len === 1 ? '  '
           : len === 2 ? ' '
           : ''
    }
    return `${spc(e[1])}${e[1]}% { content: '${e[0]}'; }`
  })
  return formattedArr.reduce((a, c) => (a + `  ${c}\n`), '')
}

function formatKeyframe(name, framesStr) {
  return `@keyframes ${name} {\n${framesStr}}`
}

function formatSelector(name, duration) {
  return `.${name}:before {\n  animation-name: ${name};\n  animation-duration: ${duration}s;\n  animation-iteration-count: infinite;\n  content: '';\n}`
}