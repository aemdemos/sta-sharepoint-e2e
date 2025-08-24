/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const headerRow = ['Hero'];

  // Find hero image: <p><picture>...</picture></p>
  let pictureCell = '';
  // Look for <picture> inside any <p>
  const pictureP = element.querySelector('p picture');
  if (pictureP) {
    // Reference its parent <p>
    pictureCell = pictureP.parentElement;
  }

  // Find main heading (first h1/h2/h3/h4/h5/h6)
  let headingEl = null;
  headingEl = element.querySelector('h1, h2, h3, h4, h5, h6');

  // Collect textual elements (heading, subheadings, paragraphs)
  let textCell = '';
  if (headingEl) {
    // Gather heading and all following siblings that are block-level and not empty
    const textElements = [headingEl];
    let sibling = headingEl.nextElementSibling;
    while (sibling) {
      // Only add <h2>-<h6> and <p> elements that have meaningful content
      if ((/^H[2-6]$/).test(sibling.tagName) || (sibling.tagName === 'P' && sibling.textContent.trim())) {
        textElements.push(sibling);
      }
      sibling = sibling.nextElementSibling;
    }
    textCell = textElements;
  } else {
    // Fallback: if no heading, include all non-empty <p> directly in element
    const textEls = Array.from(element.querySelectorAll('p')).filter(p => p.textContent.trim());
    if (textEls.length) {
      textCell = textEls;
    }
  }

  // Compose table rows
  const cells = [
    headerRow,
    [pictureCell],
    [textCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
