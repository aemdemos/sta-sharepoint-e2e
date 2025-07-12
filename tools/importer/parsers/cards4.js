/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .cards.block within the wrapper
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const cardsList = cardsBlock.querySelector('ul');
  if (!cardsList) return;

  // Prepare the table rows
  const rows = [['Cards']];
  // For each card (li)
  cardsList.querySelectorAll('li').forEach((li) => {
    // Image cell (first cell)
    let imageContent = null;
    const imgContainer = li.querySelector('.cards-card-image');
    if (imgContainer) {
      // Use the <picture> if present, else <img>
      const picture = imgContainer.querySelector('picture');
      const img = imgContainer.querySelector('img');
      imageContent = picture || img || '';
    } else {
      imageContent = '';
    }
    // Text content cell (second cell)
    const body = li.querySelector('.cards-card-body');
    // If no body found, just use an empty string
    const bodyContent = body || '';
    // Push the row
    rows.push([imageContent, bodyContent]);
  });
  // Create table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}