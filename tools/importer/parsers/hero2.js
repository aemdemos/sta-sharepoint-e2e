/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost hero content container
  let heroContent = element;
  while (heroContent && heroContent.querySelectorAll('img, h1, h2, h3, h4, h5, h6').length === 0) {
    const nextDiv = heroContent.querySelector(':scope > div');
    if (!nextDiv) break;
    heroContent = nextDiv;
  }

  // Find the background image (picture or img)
  let bgImage = null;
  const picture = heroContent.querySelector('picture');
  if (picture) {
    bgImage = picture.cloneNode(true);
  } else {
    const img = heroContent.querySelector('img');
    if (img) bgImage = img.cloneNode(true);
  }

  // Collect only heading/subheading/CTA (h1-h6, p, a), skipping the image paragraph
  const textContent = [];
  heroContent.childNodes.forEach((node) => {
    if (node.nodeType === 1) {
      // Skip the picture paragraph
      if (node.tagName.toLowerCase() === 'p' && node.querySelector('picture')) {
        return;
      }
      // Only include headings, paragraphs, and links (not div wrappers)
      if (/^h[1-6]$/.test(node.tagName.toLowerCase()) || node.tagName.toLowerCase() === 'p' || node.tagName.toLowerCase() === 'a') {
        if (node.textContent.trim() || node.querySelector('a')) {
          textContent.push(node.cloneNode(true));
        }
      }
    }
  });

  // Only output the third row if there is content for it, otherwise omit it
  const headerRow = ['Hero (hero2)'];
  const imageRow = [bgImage ? bgImage : ''];
  const cells = [headerRow, imageRow];
  // Always output the third row, but only if there is content
  if (textContent.length > 0) {
    cells.push([textContent]);
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
