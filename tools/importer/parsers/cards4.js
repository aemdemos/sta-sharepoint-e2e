/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the .cards block inside the wrapper
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;

  // Find all card <li> elements
  const cardItems = cardsBlock.querySelectorAll('ul > li');
  if (!cardItems.length) return;

  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [headerRow];

  cardItems.forEach((li) => {
    // Find image (first cell)
    const imgDiv = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imgDiv) {
      // Use the <picture> element if present, else fallback to <img>
      const picture = imgDiv.querySelector('picture');
      if (picture) {
        imageEl = picture;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }

    // Find text content (second cell)
    const bodyDiv = li.querySelector('.cards-card-body');
    let textContent = [];
    if (bodyDiv) {
      // Get all <p> tags in order
      const paragraphs = bodyDiv.querySelectorAll('p');
      if (paragraphs.length > 0) {
        // First <p> is the title (may contain <strong>)
        const titleP = paragraphs[0];
        // If the title is just <strong>, promote to <h3>
        let titleH = null;
        if (titleP.querySelector('strong')) {
          titleH = document.createElement('h3');
          // Use innerHTML to preserve any markup
          titleH.innerHTML = titleP.innerHTML;
        } else {
          // Fallback: just use the <p> as-is
          titleH = titleP.cloneNode(true);
        }
        textContent.push(titleH);
        // Remaining <p> are description
        for (let i = 1; i < paragraphs.length; i++) {
          textContent.push(paragraphs[i].cloneNode(true));
        }
      } else {
        // Fallback: use all text in bodyDiv
        textContent.push(document.createTextNode(bodyDiv.textContent.trim()));
      }
    }

    // Add row: [image, text content]
    rows.push([
      imageEl ? imageEl : '',
      textContent.length === 1 ? textContent[0] : textContent,
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
