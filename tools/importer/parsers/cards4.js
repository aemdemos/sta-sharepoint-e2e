/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost .cards.block, which contains the list of cards
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children).filter(el => el.tagName === 'LI');

  // Prepare the header row exactly as in the example
  const rows = [['Cards']];

  lis.forEach(li => {
    // Each li has .cards-card-image and .cards-card-body
    const imageDiv = li.querySelector('.cards-card-image');
    let imageEl = null;
    if (imageDiv) {
      // Reference the <picture> element directly (contains img and sources)
      const pic = imageDiv.querySelector('picture');
      if (pic) imageEl = pic;
      else {
        // Fallback to img if picture is missing
        const img = imageDiv.querySelector('img');
        if (img) imageEl = img;
      }
    }
    // Get the card body (title and description)
    const bodyDiv = li.querySelector('.cards-card-body');
    let bodyContent = [];
    if (bodyDiv) {
      // Reference all child nodes of bodyDiv, preserving structure (e.g., <p>, <strong>)
      bodyContent = Array.from(bodyDiv.childNodes);
    }
    // Both cells must be present; if missing, use empty string (edge case handling)
    rows.push([
      imageEl || '',
      bodyContent.length ? bodyContent : ['']
    ]);
  });

  // Create the block table using the helper
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
