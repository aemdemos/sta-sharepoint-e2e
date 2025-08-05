/* global WebImporter */
export default function parse(element, { document }) {
  // Get the hero-wrapper (should be only one per element)
  const heroWrapper = element.querySelector('.hero-wrapper');
  if (!heroWrapper) return;

  // Get the hero block
  const heroBlock = heroWrapper.querySelector('.hero.block');
  if (!heroBlock) return;

  // Dive to the innermost content container (usually div > div)
  let contentDiv = heroBlock;
  while (contentDiv && contentDiv.children.length === 1 && contentDiv.firstElementChild.tagName === 'DIV') {
    contentDiv = contentDiv.firstElementChild;
  }

  // Find picture or img (in a <p> most likely)
  let picture = contentDiv.querySelector('picture');
  if (!picture) {
    // Fallback: direct <img>
    picture = contentDiv.querySelector('img');
  }

  // Collect heading and text content after the image
  const contentNodes = [];
  for (const child of contentDiv.children) {
    // Skip any node containing <picture>
    if (child.querySelector && child.querySelector('picture')) continue;
    // Skip empty <p>
    if (child.tagName === 'P' && child.textContent.trim() === '') continue;
    // Accept headings, paragraphs, etc.
    if (/^H[1-6]$/.test(child.tagName) || child.tagName === 'P') {
      contentNodes.push(child);
    }
  }

  // Compose the table rows
  const rows = [];
  rows.push(['Hero']); // header row
  rows.push([picture ? picture : '']);
  rows.push([contentNodes.length > 0 ? contentNodes : '']);

  // Create the block and replace the element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
