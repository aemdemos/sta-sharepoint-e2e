/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero2) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional)
  // Row 3: Heading, subheading, CTA (optional)

  // Defensive: Find the image (background)
  let imgEl = null;
  // Look for <img> inside <picture>
  const picture = element.querySelector('picture');
  if (picture) {
    imgEl = picture.querySelector('img');
  }

  // Defensive: Find heading (h1, h2, etc.)
  let heading = null;
  heading = element.querySelector('h1, h2, h3, h4, h5, h6');

  // Defensive: Find subheading (next paragraph after heading, if any)
  let subheading = null;
  if (heading) {
    // Find the next sibling paragraph after heading
    let next = heading.nextElementSibling;
    while (next && next.tagName !== 'P') {
      next = next.nextElementSibling;
    }
    if (next && next.textContent.trim()) {
      subheading = next;
    }
  }

  // Defensive: Find CTA (link)
  let cta = null;
  // Look for <a> inside the block
  cta = element.querySelector('a[href]');

  // Compose content for row 3
  const row3Content = [];
  if (heading) row3Content.push(heading);
  if (subheading) row3Content.push(subheading);
  if (cta) row3Content.push(cta);

  // Table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [imgEl ? imgEl : ''];
  const contentRow = [row3Content.length ? row3Content : ''];

  const cells = [headerRow, imageRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
