/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero block inside this element
  const heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) return;
  // The main content is inside nested <div>s
  const innerDiv = heroBlock.querySelector(':scope > div > div');
  if (!innerDiv) return;
  // Get all direct children of the innerDiv
  const children = Array.from(innerDiv.children);

  // Find the image (in a <picture> inside a <p>)
  let imageEl = null;
  for (const child of children) {
    if (child.tagName === 'P') {
      const pic = child.querySelector('picture');
      if (pic) {
        imageEl = child;
        break;
      }
    }
  }

  // Find the heading (typically <h1>, but could be h2/h3 in other examples)
  const heading = children.find((el) => /^H[1-6]$/.test(el.tagName));

  // Find any paragraphs that are not the image
  const paragraphs = children.filter((el) => el.tagName === 'P' && !el.querySelector('picture') && el.textContent.trim() !== '');

  // Build content cell
  const contentElements = [];
  if (heading) contentElements.push(heading);
  paragraphs.forEach(p => contentElements.push(p));

  // Compose the table rows according to the requirements
  const rows = [];
  rows.push(['Hero']); // Header, must match exactly
  rows.push([imageEl ? imageEl : '']);
  rows.push([contentElements.length ? contentElements : '']);

  // Create and insert the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
