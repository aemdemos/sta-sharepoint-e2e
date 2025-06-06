/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul> containing cards
  const ul = element.querySelector('ul');
  if (!ul) return;
  const cards = Array.from(ul.children);
  const headerRow = ['Cards (cards4)'];
  const rows = cards.map(li => {
    // Find image (picture or img) in .cards-card-image
    const imageDiv = li.querySelector('.cards-card-image');
    let imageContent = null;
    if (imageDiv) {
      // Prefer <picture> if present (semantically correct, preserves image srcset)
      const picture = imageDiv.querySelector('picture');
      if (picture) {
        imageContent = picture;
      } else {
        const img = imageDiv.querySelector('img');
        if (img) imageContent = img;
      }
    }
    // Find text content in .cards-card-body
    const bodyDiv = li.querySelector('.cards-card-body');
    // Defensive: If bodyDiv is missing, use empty div
    const textContent = bodyDiv || document.createElement('div');
    return [imageContent, textContent];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
