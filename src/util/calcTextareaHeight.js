// Thanks to
// https://github.com/andreypopp/react-textarea-autosize/
// https://github.com/ElemeFE/element/blob/master/packages/input/src/calcTextareaHeight.js

let hiddenTextarea

const HIDDEN_STYLE = `
    height:0 !important;
    min-height:0 !important;
    max-height:none !important;
    visibility:hidden !important;
    overflow:hidden !important;
    position:absolute !important;
    z-index:-1000 !important;
    top:0 !important;
    right:0 !important
`

const CONTEXT_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]

function calculateNodeStyling (node) {
  const style = window.getComputedStyle(node)

  const boxSizing = style.getPropertyValue('box-sizing')

  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
        parseFloat(style.getPropertyValue('padding-top'))
  )

  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
        parseFloat(style.getPropertyValue('border-top-width'))
  )

  const contextStyle = CONTEXT_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';')

  return { contextStyle, paddingSize, borderSize, boxSizing }
}

export default function calcTextareaHeight (targetNode, minRows = null, maxRows = null) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }

  let {
    paddingSize,
    borderSize,
    boxSizing,
    contextStyle
  } = calculateNodeStyling(targetNode)

  hiddenTextarea.setAttribute('style', `${contextStyle};${HIDDEN_STYLE}`)
  hiddenTextarea.value = targetNode.value || targetNode.placeholder || ''

  let height = hiddenTextarea.scrollHeight
  let minHeight = -Infinity
  let maxHeight = Infinity

  if (boxSizing === 'border-box') {
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize
  }

  hiddenTextarea.value = ''
  let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize

  if (minRows !== null) {
    minHeight = singleRowHeight * minRows
    if (boxSizing === 'border-box') {
      minHeight = minHeight + paddingSize + borderSize
    }
    height = Math.max(minHeight, height)
  }
  if (maxRows !== null) {
    maxHeight = singleRowHeight * maxRows
    if (boxSizing === 'border-box') {
      maxHeight = maxHeight + paddingSize + borderSize
    }
    height = Math.min(maxHeight, height)
  }

  return {
    height: `${height / 100}rem`,
    minHeight: `${minHeight / 100}rem`,
    maxHeight: `${maxHeight / 100}rem`
  }
}
