/* global WebImporter */
export default function parse(element, { document }) {
  // --- HERO (hero2) block parsing ---
  // 1 column, 3 rows: [Block Name], [Image], [Text]

  // Header row: Block name
  const headerRow = ['Hero (hero2)'];

  // Find image (background visual)
  let imageEl = null;
  // Look for <img> inside <picture> (usually inside a <p>)
  const picture = element.querySelector('picture');
  if (picture) {
    imageEl = picture.querySelector('img');
  }
  // Defensive: if not found, look for any <img>
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }

  // Second row: image element (background image)
  const imageRow = [imageEl ? imageEl : ''];

  // Third row: text content (heading, subheading, CTA)
  // Find heading (h1, h2, h3)
  let heading = element.querySelector('h1, h2, h3');
  // Defensive: if not found, try to find a <p> with text
  if (!heading) {
    // Find first non-empty <p>
    heading = Array.from(element.querySelectorAll('p')).find(p => p.textContent.trim().length > 0);
  }

  // Find subheading (h2, h3, or next <p> after heading)
  let subheading = null;
  if (heading) {
    // Try to find next sibling <h2>, <h3>, or <p> (with text)
    let next = heading.nextElementSibling;
    while (next) {
      if ((next.tagName === 'H2' || next.tagName === 'H3' || next.tagName === 'P') && next.textContent.trim().length > 0) {
        subheading = next;
        break;
      }
      next = next.nextElementSibling;
    }
  }

  // Find CTA (call-to-action) link
  let cta = element.querySelector('a[href]');

  // Compose content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // If nothing found, fallback to all text
  if (contentCell.length === 0) {
    // Try to find any text content
    const paragraphs = Array.from(element.querySelectorAll('p')).filter(p => p.textContent.trim().length > 0);
    if (paragraphs.length) {
      contentCell.push(...paragraphs);
    }
  }

  const textRow = [contentCell.length ? contentCell : ''];

  // Compose table rows
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
