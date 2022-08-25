import { defineProps, ref, defineEmits, nextTick } from "vue";
import { LocalSearch } from "../utils/index";
import useSearchList from "./searchList";

export function useBlogInput(props: any) {
  const { list, clearList, searchList, jumpToDom } = useSearchList();
  const localSearch = new LocalSearch();
  const data = ref("");
  const emit = defineEmits(["input"]);
  let timeout = -1;
  localSearch.setRootDom(props.rootDomName);
  const handleInput = () => {
    nextTick(() => {
      if (timeout) {
        clearTimeout(timeout);
      }
      localSearch.cleanMark();
      if (data.value === "" || data.value == undefined) {
        clearList();
        return;
      }
      clearList();
      timeout = window.setTimeout(() => {
        list.values;
        localSearch.cleanMark();
        localSearch.setSearchStr(data.value).queryTextDom().mark();
        searchList();
      });
    });
  };
  return {
    data,
    list,
    handleInput,
    jumpToDom,
  };
}
export default useBlogInput;
