export class LocalSearch {
  static readonly TEXT_NODE_TYPE = 3
  private root!:HTMLElement
  private searchStr:string
  private textNodeList:HTMLElement[] = []
  setRootDom<T> (dom:T extends HTMLElement? T: HTMLElement ) {
    this.root =dom
    return this
  }
  setSearchStr (str:string) {
    this.cleanMark()
    this.searchStr = str
    return this
  }
  queryTextDom () {
    const textList:HTMLElement[] = []
    this._queryTextDom(this.root,LocalSearch.TEXT_NODE_TYPE,textList)
    this.textNodeList = textList
    return this
  }
  private _queryTextDom (dom:HTMLElement | Text | ChildNode, type:number, textList: HTMLElement[]) {
    console.log(dom instanceof Text && dom.nodeType === type,dom.nodeType)
    if (dom instanceof Text && dom.nodeType === type) {
      if (dom.data.includes(this.searchStr)) {
        textList.push(dom.parentNode as HTMLElement)
      }
    }
    if (dom.hasChildNodes()) {
      for (const node of dom.childNodes) {
        this._queryTextDom(node,type,textList)
      }
    }
  }
  has
  mark() {
    console.log(this.textNodeList)
    this._mark(this.textNodeList)
  }
  private _mark (textList:HTMLElement[]) {
    textList.forEach(item => {
      item.classList.add('mark')
    })
  }
  cleanMark () {
    console.log(this.textNodeList)
    this._cleanMark(this.textNodeList)
  }
  private _cleanMark(textList:HTMLElement[]) {
    textList.forEach(item => {
      item.classList.remove('mark')
    })
  }
}
export default LocalSearch