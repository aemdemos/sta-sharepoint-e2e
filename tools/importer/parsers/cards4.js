/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main cards block
  const block = element.querySelector('.cards.block');
  if (!block) return;
  const ul = block.querySelector('ul');
  if (!ul) return;

  const rows = [];
  // 1. Header row exactly as in the sample
  rows.push(['Cards']);

  // 2. Card rows: each <li> = card
  ul.querySelectorAll(':scope > li').forEach((li) => {
    // Image cell: .cards-card-image contains <picture>
    const imgDiv = li.querySelector('.cards-card-image');
    let imgCell = '';
    if (imgDiv) {
      // Prefer <picture>, else <img>
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imgCell = pic;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }
    // Text cell: .cards-card-body contains one or more <p>
    const bodyDiv = li.querySelector('.cards-card-body');
    let textCell = '';
    if (bodyDiv) {
      textCell = bodyDiv;
    }
    rows.push([imgCell, textCell]);
  });

  // Replace only the top-level element (cards-wrapper)
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
