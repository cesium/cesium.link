import { QRCodeSVG } from "../../vendor/qrcode"

export const QRCodeGenerator = {
    mounted() {
        this.el.querySelector("#qr-code-input").addEventListener("input", e => {
            updateQRCodeView(this.el, e.target.value);
        });

        updateQRCodeView(this.el, "cesium.link");
    }
};

function updateQRCodeView(element, value){
    const code = new QRCodeSVG(value, {
        level: "H",
        fgColor: "#f47c58",
        image: {
            source: "/images/cesium.svg",
            height: "20%",
            width: "20%",
            x: "center",
            y: "center",
        }
    });

    element.querySelector("#qr-code-view").innerHTML = code.toString();
}