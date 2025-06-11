/* global WebImporter */
export default function parse(element, { document }) {
  // The Hero block is inside section.hero-container > div.hero-wrapper > div.hero.block
  // The block content is in .hero.block > div > div > (p><picture), h1, (p)

  // 1. Get the deepest child div inside .hero.block with the content
  const heroContentDiv = element.querySelector('.hero.block > div > div') || element.querySelector('.hero.block > div');
  
  // 2. Extract picture (if present)
  let pictureEl = null;
  if (heroContentDiv) {
    // Find the first p>picture as the image row
    const firstPar = heroContentDiv.querySelector(':scope > p');
    if (firstPar) {
      const pic = firstPar.querySelector('picture');
      if (pic) pictureEl = pic;
    }
  }

  // 3. Gather heading/content elements (h1-h6, non-empty p, etc), skipping image-containing p's
  let headingContent = [];
  if (heroContentDiv) {
    headingContent = Array.from(heroContentDiv.children).filter((child) => {
      // Skip first p if it contains a picture
      if (child === heroContentDiv.querySelector(':scope > p') && child.querySelector('picture')) {
        return false;
      }
      if (child.tagName.match(/^H[1-6]$/)) return true;
      if (child.tagName === 'P' && child.textContent.trim().length > 0) return true;
      return false;
    });
  }
  
  // 4. Build the block table structure per the markdown example
  const rows = [];
  // Exact header row from example
  rows.push(['Hero']);
  // Image row
  rows.push([pictureEl ? pictureEl : '']);
  // Content row (single cell): either heading(s)/paragraphs or blank
  rows.push(headingContent.length ? [headingContent] : ['']);

  // 5. Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  
  // 6. Replace the original element with the new table
  element.replaceWith(table);
}
