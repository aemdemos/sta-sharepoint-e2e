/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the <ul> containing the cards
  const ul = element.querySelector('ul');
  if (!ul) return;

  // Prepare the header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  // Get all <li> items (each card)
  const cardItems = ul.querySelectorAll(':scope > li');

  cardItems.forEach((li) => {
    // Defensive: get image container and body container
    const imageContainer = li.querySelector(':scope > .cards-card-image');
    const bodyContainer = li.querySelector(':scope > .cards-card-body');

    // Find the image (use <picture> or <img> directly)
    let imageEl = null;
    if (imageContainer) {
      // Use the <picture> if present, otherwise <img>
      imageEl = imageContainer.querySelector('picture') || imageContainer.querySelector('img');
    }

    // Defensive: get the text content
    let textEls = [];
    if (bodyContainer) {
      // For cards: title is <strong> inside a <p>, description is next <p>
      const paragraphs = bodyContainer.querySelectorAll('p');
      if (paragraphs.length > 0) {
        // Title as heading
        const titleP = paragraphs[0];
        const strong = titleP.querySelector('strong');
        if (strong) {
          const h3 = document.createElement('h3');
          h3.textContent = strong.textContent;
          textEls.push(h3);
        } else {
          textEls.push(titleP);
        }
        // Description (second <p>)
        if (paragraphs.length > 1) {
          textEls.push(paragraphs[1]);
        }
      } else {
        // Fallback: just add the body container
        textEls.push(bodyContainer);
      }
    }

    // Compose the row: [image, text]
    rows.push([
      imageEl,
      textEls
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
