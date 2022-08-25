import { reactive } from "vue";
interface SearchListI {
  html: string;
  dom: HTMLUnknownElement;
}
export function useSearchList() {
  const list = reactive<SearchListI[]>([]);
  const clearList = () => {
    list.length = 0;
  };
  const searchList = () => {
    const dom = document.querySelectorAll<HTMLUnknownElement>(".mark");
    const set = new Set(Array.from(dom).map((item) => item.parentElement));
    set.forEach((item) => {
      const html = item.innerHTML;
      list.push({
        html,
        dom: item,
      });
    });
  };
  const jumpToDom = (item: SearchListI) => {
    document
      .querySelectorAll<HTMLUnknownElement>(".jump-mark")
      .forEach((item) => item.classList.remove("jump-mark"));
    item.dom.scrollIntoView({ behavior: "auto", block: "center" });
    item.dom.classList.add("jump-mark");
  };
  return { list, searchList, clearList, jumpToDom };
}
export default useSearchList;
