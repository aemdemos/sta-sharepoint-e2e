/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> with cards
  let cardsBlock = element.querySelector('.cards.block > ul');
  if (!cardsBlock) return;

  const rows = [];
  // Header row exactly as in the example
  rows.push(['Cards (cards4)']);

  // For each card (li)
  cardsBlock.querySelectorAll(':scope > li').forEach((card) => {
    // Image cell: only the <picture> (or <img> fallback)
    let imgDiv = card.querySelector('.cards-card-image');
    let imgCell = null;
    if (imgDiv) {
      let pic = imgDiv.querySelector('picture');
      if (pic) {
        imgCell = pic;
      } else {
        let img = imgDiv.querySelector('img');
        if (img) imgCell = img;
      }
    }

    // Text cell: only direct children <p>, without the wrapping div
    let bodyDiv = card.querySelector('.cards-card-body');
    let textCell = [];
    if (bodyDiv) {
      textCell = Array.from(bodyDiv.children);
    }

    rows.push([
      imgCell,
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
