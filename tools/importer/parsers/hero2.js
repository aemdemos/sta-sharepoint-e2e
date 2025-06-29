/* global WebImporter */
export default function parse(element, { document }) {
  // Find the deepest hero block: .hero.block > div > div (content)
  let heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) heroBlock = element;
  let contentDiv = heroBlock.querySelector(':scope > div > div') || heroBlock.querySelector(':scope > div') || heroBlock;

  // Find image (picture or img)
  let imageCell = '';
  const picture = contentDiv.querySelector('picture');
  if (picture) {
    imageCell = picture;
  } else {
    const img = contentDiv.querySelector('img');
    if (img) imageCell = img;
  }

  // Collect text content (headings, paragraphs, etc.), skipping image parent <p>
  const contentElements = [];
  for (const node of contentDiv.children) {
    // If this is the <p> containing the picture, skip it
    if (node.querySelector && node.querySelector('picture, img')) continue;
    // Skip empty paragraphs
    if (node.tagName === 'P' && node.textContent.trim() === '') continue;
    contentElements.push(node);
  }

  // Build the block table rows
  const rows = [];
  rows.push(['Hero']);
  rows.push([imageCell]);
  rows.push([contentElements.length ? contentElements : '']);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
