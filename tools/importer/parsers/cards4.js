/* global WebImporter */
export default function parse(element, { document }) {
  // Get the <ul> containing all cards (direct child of .cards block)
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children); // <li> elements

  // Table header row, must exactly match the example
  const headerRow = ['Cards'];
  const rows = [headerRow];

  // Each card: image in col 1, text in col 2
  cards.forEach(card => {
    // Card image: prefer <picture>, fallback to <img> if necessary
    let imgContainer = card.querySelector('.cards-card-image');
    let imageElement = null;
    if (imgContainer) {
      imageElement = imgContainer.querySelector('picture') || imgContainer.querySelector('img');
    }
    // Card body: should always be present
    let textContainer = card.querySelector('.cards-card-body');
    if (!textContainer) {
      // Fallback: find first <div> which is not the image container
      textContainer = Array.from(card.querySelectorAll('div')).find(div => div !== imgContainer);
    }
    // If image or text exists, add to row
    if (imageElement || textContainer) {
      rows.push([
        imageElement || '',
        textContainer || ''
      ]);
    }
  });

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
