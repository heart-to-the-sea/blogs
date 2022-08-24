let input = undefined
let arr = []
let data = ''
let timeout = -1
function searchDom (list, str, arr) {
  if (list instanceof Text) {
    if (list.data.includes(str)){
      const parent = list.parentNode
      parent.classList.add('mark-parent')
      parent.innerHTML = list.data.replaceAll(str,`<span class="mark">$&</span>`);
      console.log(parent)
      arr.push({
        text:list,
        parent: list.parentElement
      })
    }
  }
  if (list.childNodes) {
    list.childNodes.forEach(item => {
      searchDom(item,str, arr)
    })
  }
}
function init () {
  input = document.querySelector('input')
  input.oninput = e => {
    if (timeout){
      clearTimeout(timeout)
    }
    timeout = setTimeout(()=>{
      const reg = new RegExp(`<span class="mark">(`+data+`)<\/span>`,'gi')
      document.querySelectorAll('.mark-parent').forEach(item=>{
        item.innerHTML = item.innerText
      })
    arr = []
    data = e.target.value
    if (data === undefined || data === '') {
      return
    }
    searchDom(document.body, data, arr)
    console.log(arr)
    }, 500)
  }
}
window.onload = () => {
  init()
}