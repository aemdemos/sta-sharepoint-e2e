/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the .cards.block container
  const cardsBlock = element.querySelector('.cards.block');
  if (!cardsBlock) return;
  const ul = cardsBlock.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  // 2. Table header row: Must be exactly 'Cards'
  const rows = [['Cards']];

  // 3. Each <li> is a card row, with 2 columns: image, content
  lis.forEach((li) => {
    // --- First cell: image or icon ---
    let imageContent = null;
    const imageDiv = li.querySelector('.cards-card-image');
    if (imageDiv) {
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageContent = picture;
      } else {
        // fallback: img directly
        const img = imageDiv.querySelector('img');
        if (img) imageContent = img;
      }
    }

    // --- Second cell: text content ---
    let textContent = null;
    const bodyDiv = li.querySelector('.cards-card-body');
    if (bodyDiv) {
      // Use a fragment to preserve semantic structure and avoid extra div
      const frag = document.createDocumentFragment();
      Array.from(bodyDiv.childNodes).forEach((node) => {
        frag.appendChild(node);
      });
      textContent = frag;
    }
    rows.push([imageContent, textContent]);
  });

  // 4. Build table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
