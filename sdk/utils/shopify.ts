/**
 * Converts a Shopify rich text string to HTML.
 *
 * @param {string} content The Shopify rich text string to convert.
 * @returns {string} The HTML representation of the rich text string.
 */
export function richTextToHTML(content: string): string {
  const parsed = JSON.parse(content);
  let html = "";
  parsed.children.forEach((node: any) => {
    switch (node.type) {
      case "heading":
        html += `<h${node.level}>${node.children[0].value}</h${node.level}>`;
        break;
      case "list":
        html += `<${node.listType === "unordered" ? "ul" : "ol"}>`;

        node.children.forEach((item: any) => {
          html += `<li>- ${item.children[0].value}</li>`;
        });

        html += `<${node.listType === "unordered" ? "/ul" : "/ol"}>`;
        break;
      case "paragraph":
        html += `<p>`;

        node.children.forEach((item: any) => {
          if (item.type === "text" && item.bold) {
            html += `<strong>${item.value}</strong>` + " ";
          } else if (item.type === "text" && item.italic) {
            html += `<em>${item.value}</em>` + " ";
          } else if (item.type === "text") {
            html += `${item.value}` + " ";
          }
          if (item.type === "link" && item.bold) {
            html +=
              `<a href="${item.url}" target="${item.target}"><strong>${
                item.children[0].value
              }</strong></a>` +
              " ";
          } else if (item.type === "link" && item.italic) {
            html +=
              `<a href="${item.url}" target="${item.target}"><em>${
                item.children[0].value
              }</em></a>` +
              " ";
          } else if (item.type === "link") {
            html +=
              `<a href="${item.url}" target="${item.target}">${
                item.children[0].value
              }</a>` + " ";
          }
        });

        html += `</p>`;
        break;
    }
  });

  return html;
}
