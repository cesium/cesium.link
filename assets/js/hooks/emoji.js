import "../../vendor/emojimart";

export const EmojiPicker = {
    mounted() {
        this.el.addEventListener("click", (event) => 
            {
                if(this.el.parentElement.querySelector("em-emoji-picker") == null) {
                    const picker = new EmojiMart.Picker({onEmojiSelect: (data) => {updateEmojiInput(this.el.id, data.id); }, theme: "light", set: "native", autoFocus: true, onClickOutside: () => {picker.remove();}});
                    picker.style.position = "absolute";
                    picker.style.left = "100px";
                    this.el.parentElement.appendChild(picker);
                    event.stopPropagation();
                } else {
                    removeEmojiPicker(this.el.parentElement);
                }
        });
    }
}

function updateEmojiInput(id, emoji) {
    document.getElementById("input-" + id).value = emoji;
}

function removeEmojiPicker(element) {
    element.querySelector("em-emoji-picker").remove();
}