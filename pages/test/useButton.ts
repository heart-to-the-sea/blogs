import { ExtractPropTypes } from "nuxt/dist/app/compat/capi";
import { ref } from "vue";
export function useButton(
  props?: Readonly<ExtractPropTypes<{ msg: StringConstructor }>>
) {
  const clickData = ref(0);
  const handleClick = () => {
    clickData.value++;
  };
  return {
    clickData,
    handleClick,
  };
}

export default useButton;
