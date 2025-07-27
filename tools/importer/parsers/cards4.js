/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the correct block root
  let block = element;
  if (!block.classList.contains('block')) {
    block = element.querySelector('.block');
    if (!block) return;
  }
  // Find the <ul> containing card <li>s
  const ul = block.querySelector('ul');
  if (!ul) return;
  const lis = Array.from(ul.children);

  const rows = [['Cards']];
  for (const li of lis) {
    // Get image/icon: prefer <picture>, fallback <img>
    let imageCell = '';
    const imgDiv = li.querySelector('.cards-card-image');
    if (imgDiv) {
      const pic = imgDiv.querySelector('picture');
      if (pic) {
        imageCell = pic;
      } else {
        const img = imgDiv.querySelector('img');
        if (img) imageCell = img;
      }
    }
    // Get text cell
    const textDiv = li.querySelector('.cards-card-body');
    rows.push([
      imageCell,
      textDiv || ''
    ]);
  }
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
