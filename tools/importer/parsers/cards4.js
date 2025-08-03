/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> with all <li> cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children);

  // Prepare table rows
  const cells = [['Cards']]; // Table header

  cards.forEach((li) => {
    // First cell: image (picture or img)
    const imageWrapper = li.querySelector('.cards-card-image');
    let imgElem = null;
    if (imageWrapper) {
      // Prefer <picture>, otherwise <img>, else the wrapper itself
      imgElem = imageWrapper.querySelector('picture') || imageWrapper.querySelector('img') || imageWrapper;
    }

    // Second cell: body content
    const body = li.querySelector('.cards-card-body');
    let bodyContent = [];
    if (body) {
      // Use all child nodes in order (retain <strong>, <p>, etc)
      bodyContent = Array.from(body.childNodes).filter(node => {
        // Only use element nodes and non-empty text nodes
        return (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim());
      });
    }

    cells.push([
      imgElem,
      bodyContent.length === 1 ? bodyContent[0] : bodyContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
