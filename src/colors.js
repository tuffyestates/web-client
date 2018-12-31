import chroma from "chroma-js";

export default new Proxy(
    {
        blue: "#184A79",
        orange: "#FF6800",
        red: "#F44336"
    },
    {
        get: function(obj, prop) {
            return prop in obj || prop.startsWith("$")
                ? obj[prop]
                : generateColor(obj, prop);
        }
    }
);

function generateColor(colors, request) {
    let [modifier, color] = request.split(/(?=[A-Z])/);
    color = color || modifier;
    const colorCode = colors[color.toLowerCase()];
    const processor = chroma(colorCode);
    switch (modifier) {
        case "dark":
            color = processor.darken();
            break;
        case "darker":
            color = processor.darken(2);
            break;
        case "light":
            color = processor.brighten();
            break;
        case "lighter":
            color = processor.brighten(2);
            break;
        default:
            throw new Error("Unknown modifier:", modifier);
    }
    return color.hex();
}
