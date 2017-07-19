export default function mathItUp(html = "") {
    var parts = [];
    
    while (true) {
        var i = html.indexOf("$");
        if (i === -1) {
            parts.push(html);
            break;
        } else {
            var a = html.substring(0, i);
            var bc = html.substring(i + 1);
            if (bc. indexOf("$") === -1) {
                parts.push(html);
                break;
            } else {
                parts.push(a);
                var b = bc.substring(0, bc.indexOf("$"));
                parts.push(katex.renderToString(b));
                html = bc.substring(bc.indexOf("$") + 1);
            }
        }
    }
    
    return parts.join("");
}
