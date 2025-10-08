/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero2) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional)
  // Row 3: Headline, subheading, CTA (optional)

  // Helper to find the picture/img for the hero image
  function findHeroImage(el) {
    // Look for <picture> or <img> inside the element
    const picture = el.querySelector('picture');
    if (picture) return picture;
    const img = el.querySelector('img');
    return img || null;
  }

  // Helper to find the main heading (h1, h2, etc.)
  function findHeading(el) {
    // Prefer h1, fallback to h2/h3
    let heading = el.querySelector('h1');
    if (!heading) heading = el.querySelector('h2, h3');
    return heading || null;
  }

  // Helper to find subheading (paragraph after heading)
  function findSubheading(el, heading) {
    if (!heading) return null;
    // Find next sibling paragraph after heading
    let sib = heading.nextElementSibling;
    while (sib) {
      if (sib.tagName === 'P' && sib.textContent.trim()) {
        return sib;
      }
      sib = sib.nextElementSibling;
    }
    return null;
  }

  // Helper to find CTA (anchor button or link)
  function findCTA(el) {
    // Look for <a> or <button> with text
    const cta = el.querySelector('a, button');
    if (cta && cta.textContent.trim()) {
      return cta;
    }
    return null;
  }

  // Defensive: Find the main hero content container
  // The source HTML nests several divs, so find the deepest content div
  let contentDiv = element;
  // Try to find the deepest child div with actual content
  const allDivs = element.querySelectorAll(':scope div');
  if (allDivs.length > 0) {
    // Find the div containing the heading
    for (const div of allDivs) {
      if (div.querySelector('h1, h2, h3')) {
        contentDiv = div;
        break;
      }
    }
  }

  // Extract image
  const heroImage = findHeroImage(contentDiv);

  // Extract heading
  const heading = findHeading(contentDiv);

  // Extract subheading
  const subheading = findSubheading(contentDiv, heading);

  // Extract CTA
  const cta = findCTA(contentDiv);

  // Compose the content for the third row
  const textContent = [];
  if (heading) textContent.push(heading);
  if (subheading) textContent.push(subheading);
  if (cta) textContent.push(cta);

  // Build the table rows
  const headerRow = ['Hero (hero2)'];
  const imageRow = [heroImage ? heroImage : ''];
  const contentRow = [textContent.length ? textContent : ''];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
