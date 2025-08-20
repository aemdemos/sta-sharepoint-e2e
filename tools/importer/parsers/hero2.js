/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as required
  const headerRow = ['Hero'];
  // Locate the hero block wrapper
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;

  // The content is typically inside heroBlock > div > div
  let mainContent = heroBlock;
  const divs = heroBlock.querySelectorAll(':scope > div');
  if (divs.length > 0) {
    const nestedDivs = divs[0].querySelectorAll(':scope > div');
    if (nestedDivs.length > 0) {
      mainContent = nestedDivs[0];
    } else {
      mainContent = divs[0];
    }
  }

  // Row 2: Find the <picture> element, or fallback to <img>
  let imageEl = mainContent.querySelector('picture');
  if (!imageEl) {
    imageEl = mainContent.querySelector('img');
  }
  // If imageEl exists, use it for row 2, else leave empty
  const imageRow = [imageEl ? imageEl : ''];

  // Row 3: All content except the image/picture
  // We'll gather all nodes, skipping the picture (or <p> containing picture)
  const contentNodes = [];
  mainContent.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'P' && node.querySelector('picture')) return;
      if (node.tagName === 'PICTURE') return;
      if (node.tagName === 'IMG') return;
      // skip empty <p> nodes
      if (node.tagName === 'P' && node.textContent.trim() === '') return;
    }
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() === '') return;
    contentNodes.push(node);
  });
  // If there is no textual content, ensure blank cell
  const contentRow = [contentNodes.length ? contentNodes : ['']];

  // Compose final table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
