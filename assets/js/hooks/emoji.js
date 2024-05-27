import "../../vendor/emojimart";

export const EmojiPicker = {
    mounted() {
        const picker = new EmojiMart.Picker({onEmojiSelect: (data) => {this.el.value = data.id;}, theme: "light", set: "native"});
        this.el.parentElement.appendChild(picker);
    }
}