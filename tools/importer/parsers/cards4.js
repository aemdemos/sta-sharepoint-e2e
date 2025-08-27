/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards block (should contain <ul> with <li> per card)
  let cardsBlock = element.querySelector('.cards.block[data-block-name="cards"]');
  if (!cardsBlock) {
    // fallback: maybe element IS the block
    cardsBlock = element;
  }
  
  // Find the <ul> within the block
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  
  const rows = [];
  // Add header row
  rows.push(['Cards']);

  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Image/icon cell: find .cards-card-image
    const imgDiv = li.querySelector('.cards-card-image');
    let imgCell = '';
    if (imgDiv) {
      // Use the <picture> if present, else <img>
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imgCell = pic;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }
    // Text content cell: use .cards-card-body
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyDiv) {
      // If bodyDiv only has text, use its childNodes
      // If it has <p> or other elements, include all
      // This ensures strong tags (for titles) and paragraphs are included and semantic meaning kept
      textCell = Array.from(bodyDiv.childNodes);
    }
    rows.push([imgCell, textCell]);
  });
  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
