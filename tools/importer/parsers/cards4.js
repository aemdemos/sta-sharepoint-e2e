/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Get all <li> elements (each card)
  const lis = Array.from(ul.children).filter(li => li.tagName === 'LI');

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  lis.forEach(li => {
    // Defensive: get image container and body container
    const imageContainer = li.querySelector('.cards-card-image');
    const bodyContainer = li.querySelector('.cards-card-body');

    // Get the image (always use the <img> inside <picture>)
    let imgEl = null;
    if (imageContainer) {
      const picture = imageContainer.querySelector('picture');
      if (picture) {
        imgEl = picture.querySelector('img');
      }
    }

    // Defensive: get the text content
    let textEls = [];
    if (bodyContainer) {
      // Get all <p> elements inside bodyContainer
      const paragraphs = Array.from(bodyContainer.querySelectorAll('p'));
      paragraphs.forEach(p => {
        textEls.push(p);
      });
    }

    // Compose row: [image, text content]
    // Only add the image element if it exists
    const cardRow = [imgEl ? imgEl : '', textEls.length ? textEls : ''];
    rows.push(cardRow);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
