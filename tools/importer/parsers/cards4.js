/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to check for whitespace text nodes
  function isNonEmptyNode(node) {
    return !(node.nodeType === 3 && !node.textContent.trim()); // 3 === TEXT_NODE
  }

  // Find the inner 'cards' block
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  // Build the rows array
  const rows = [];

  // Header row: single cell with colspan=2
  rows.push(['Cards (cards4)']);

  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Image cell
    const imageDiv = li.querySelector('.cards-card-image');
    let imageContent = null;
    if (imageDiv) {
      const pic = imageDiv.querySelector('picture');
      if (pic) {
        imageContent = pic;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageContent = img;
      }
    }
    // Body cell: only children of .cards-card-body, not the wrapping div
    const bodyDiv = li.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyDiv) {
      textContent = Array.from(bodyDiv.childNodes).filter(isNonEmptyNode);
    }
    rows.push([
      imageContent,
      textContent.length === 1 ? textContent[0] : textContent
    ]);
  });

  // Use the original createTable then set colspan on the header cell
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Set colspan=2 on the first th (header row)
  const firstRow = table.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
