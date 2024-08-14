import Sortable from "../../vendor/sortable";

export const Sorting = {
    mounted() {
        const placeholder = document.createElement('div');
        new Sortable(this.el, {
          animation: 150,
          ghostClass: "bg-slate-100",
          dragClass: "shadow-2xl",
          handle: ".handle",
          onEnd: () => {
            const elements = Array.from(this.el.children)
            const ids = elements.map(elm => elm.id)
            this.pushEvent("update-sorting", {ids: ids})
          },
          setData: (dataTransfer, _) => {
            dataTransfer.setDragImage(placeholder, 0, 0);
          }
        })
      }
}