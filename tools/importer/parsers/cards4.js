/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cardItems = Array.from(ul.children).filter((li) => li.nodeName === 'LI');
  const rows = [['Cards']];

  cardItems.forEach((li) => {
    // Extract the image or picture
    let imageCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      // Use the <picture> if present, else <img>
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageCell = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }

    // Extract the text body
    let textCell = '';
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      textCell = bodyDiv;
    }
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
