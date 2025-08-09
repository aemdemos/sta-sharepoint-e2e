/* global WebImporter */
export default function parse(element, { document }) {
  // Find the block containing card items (accept .block inside .cards-wrapper or directly)
  let cardsBlock = element;
  if (!cardsBlock.classList.contains('block')) {
    cardsBlock = element.querySelector('.block');
  }
  // Defensive: ensure we have a UL with LI children
  const ul = cardsBlock.querySelector('ul');
  const cardItems = ul ? ul.querySelectorAll('li') : cardsBlock.querySelectorAll('li');
  const rows = [];
  // Table header: matches example exactly
  rows.push(['Cards']);
  // For each card: two cells [image, text].
  cardItems.forEach((li) => {
    // --- Image cell ---
    const imgDiv = li.querySelector('.cards-card-image');
    // Accept <picture> or <img>, prefer <picture>
    let imageEl = null;
    if (imgDiv) {
      imageEl = imgDiv.querySelector('picture') || imgDiv.querySelector('img');
    }
    // --- Text cell ---
    // Compose as: <strong>, then description paragraph
    const bodyDiv = li.querySelector('.cards-card-body');
    const textContent = [];
    if (bodyDiv) {
      // Find <p><strong>...</strong></p> for the title, and next <p> for description
      for (const p of bodyDiv.querySelectorAll('p')) {
        // If it contains <strong>, keep as-is. Otherwise, add as normal paragraph.
        if (p.querySelector('strong')) {
          textContent.push(p);
        } else {
          textContent.push(p);
        }
      }
    }
    rows.push([
      imageEl,
      textContent
    ]);
  });
  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace element
  element.replaceWith(block);
}
