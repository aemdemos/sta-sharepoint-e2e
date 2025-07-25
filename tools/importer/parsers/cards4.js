/* global WebImporter */
export default function parse(element, { document }) {
  // Find the cards block containing the <ul>
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;

  // Header row exactly as required
  const cells = [['Cards']];

  // Each card is in a <li>
  ul.querySelectorAll('li').forEach((li) => {
    // Image cell: find <picture> or <img> in .cards-card-image
    const imageCellDiv = li.querySelector('.cards-card-image');
    let imageContent = '';
    if (imageCellDiv) {
      const picture = imageCellDiv.querySelector('picture');
      const img = imageCellDiv.querySelector('img');
      if (picture) {
        imageContent = picture;
      } else if (img) {
        imageContent = img;
      }
    }

    // Text cell: all content in .cards-card-body
    const textCellDiv = li.querySelector('.cards-card-body');
    // Defensive: skip card if missing image or body
    if (!imageContent || !textCellDiv) return;

    cells.push([
      imageContent,
      textCellDiv
    ]);
  });

  // Create the block table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
