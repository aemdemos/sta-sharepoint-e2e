/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual block element
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('cards') && cardsBlock.querySelector('.cards.block')) {
    cardsBlock = cardsBlock.querySelector('.cards.block');
  }

  // Find the <ul> containing the card <li>s
  const list = cardsBlock.querySelector('ul');
  const items = list ? Array.from(list.children) : [];

  // Prepare the header row and cell rows
  const rows = [];
  rows.push(['Cards']); // Table header as per example

  items.forEach((li) => {
    // First cell: image (picture or img)
    let imageEl = '';
    const imageDiv = li.querySelector(':scope > .cards-card-image');
    if (imageDiv) {
      // Use the entire <picture> element (preferred), or <img> if present
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Second cell: text content (body)
    let textCellContent = '';
    const bodyDiv = li.querySelector(':scope > .cards-card-body');
    if (bodyDiv) {
      // Preserve the structure of the body: strong, paragraphs, etc.
      // Use all its children (usually <p> nodes)
      // Filter out empty text nodes (just whitespace)
      const contentNodes = Array.from(bodyDiv.childNodes).filter(
        (n) => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim() !== '')
      );
      textCellContent = contentNodes.length === 1 ? contentNodes[0] : contentNodes;
    }

    rows.push([imageEl, textCellContent]);
  });

  // Create block table and replace the original block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
