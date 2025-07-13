/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards block which contains the <ul> of cards
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const listItems = Array.from(ul.children);

  // Prepare the table rows
  const rows = [];
  // Header row: exactly as required
  rows.push(['Cards']);

  // Loop through each card
  listItems.forEach((li) => {
    // Image cell: use the <picture> if available, otherwise the <img>
    let imageCell = '';
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      const pic = imageDiv.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) {
          imageCell = img;
        }
      }
    }
    // Text cell: include all children of .cards-card-body (to preserve formatting)
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      const bodyNodes = Array.from(bodyDiv.childNodes);
      textCell = bodyNodes.length === 1 ? bodyNodes[0] : bodyNodes;
    }
    rows.push([imageCell, textCell]);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
