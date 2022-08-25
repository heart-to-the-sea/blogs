export interface LocalSearchI {
  // 查询
  queryTextDom():LocalSearch
  // 设置根节点
  setRootDom (dom: string):LocalSearch
  // 标记
  mark():void
  // 取消标记
  cleanMark():void
}
export class LocalSearch implements LocalSearchI{
  static readonly TEXT_NODE_TYPE = 3
  private root!:HTMLElement
  private searchStr:string
  private rootName:string
  private textNodeList:Text[] = []
  setRootDom (dom: string ) {
    this.rootName = dom
    return this
  }
  setSearchStr (str:string) {
    this.cleanMark()
    this.searchStr = str
    return this
  }
  private searchRoot () {
    this.root = document.querySelector(this.rootName)
  }
  queryTextDom () {
    this.searchRoot()
    const textList:Text[] = []
    this._queryTextDom(this.root,LocalSearch.TEXT_NODE_TYPE,textList)
    this.textNodeList = textList
    return this
  }
  private _queryTextDom (dom:HTMLElement | Text | ChildNode, type:number, textList: Text[]) {
    console.log(dom instanceof Text && dom.nodeType === type,dom.nodeType)
    if (dom instanceof Text && dom.nodeType === type) {
      if (dom.data.includes(this.searchStr)) {
        console.log(dom)
        textList.push(dom)
      }
    }
    console.log(dom.childNodes)
    if (dom.childNodes) {
      for (const node of dom.childNodes) {
        this._queryTextDom(node,type,textList)
      }
    }
  }
  mark() {
    console.log(this.textNodeList)
    this._mark(this.textNodeList, this.searchStr)
  }
  private _mark (textList:Text[],searchStr: string) {
    textList.forEach(item => {
      const parent = item.parentNode as HTMLDivElement
      parent.classList.add('mark-parent')
      parent.innerHTML = item.data.replaceAll(searchStr,`<span class="mark">$&</span>`);
    })
  }
  cleanMark () {
    console.log(this.textNodeList)
    this._cleanMark(this.textNodeList)
    this.textNodeList = []
  }
  private _cleanMark(textList:Text[]) {
    const reg = new RegExp(`<span class="mark">(`+ textList +`)<\/span>`,'gi')
      document.querySelectorAll<HTMLDivElement>('.mark-parent').forEach(item=>{
        item.innerHTML = item.innerText
      })
  }
}
export default LocalSearch