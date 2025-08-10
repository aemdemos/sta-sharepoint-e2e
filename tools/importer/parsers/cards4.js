/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block (either .cards.block or .cards-wrapper > .cards.block)
  let cardsBlock = element;
  // If element contains .cards.block, use that
  const possibleInnerBlock = element.querySelector('.cards.block');
  if (possibleInnerBlock) cardsBlock = possibleInnerBlock;

  // Find the <ul> containing <li> cards
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');
  const rows = [];

  // Header row: block name exactly as in the example
  rows.push(['Cards']);

  lis.forEach(li => {
    // Image cell: find the image wrapper and use its firstElementChild (should be <picture>)
    let imageCell = '';
    const imgWrapper = li.querySelector('.cards-card-image');
    if (imgWrapper && imgWrapper.firstElementChild) {
      imageCell = imgWrapper.firstElementChild;
    }

    // Text cell: find the body content and use its children (preserving <strong> etc)
    let textCell = '';
    const bodyWrapper = li.querySelector('.cards-card-body');
    if (bodyWrapper) {
      // Use all element children (e.g. <p>), or text nodes with content
      const bodyContent = Array.from(bodyWrapper.childNodes)
        .filter(node => (node.nodeType === 1) || (node.nodeType === 3 && node.textContent.trim() !== ''));
      // If nothing found, safe fallback to empty string
      textCell = bodyContent.length > 1 ? bodyContent : (bodyContent[0] || '');
    }

    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
