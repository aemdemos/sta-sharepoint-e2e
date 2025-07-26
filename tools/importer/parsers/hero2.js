/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the hero content structure
  let heroContentDiv = null;
  // Typical structure: .hero-container > .hero-wrapper > .hero.block > div > div
  const heroWrapper = element.querySelector(':scope > .hero-wrapper');
  if (heroWrapper) {
    const heroBlock = heroWrapper.querySelector(':scope > .hero.block');
    if (heroBlock) {
      // The block usually nests content in: heroBlock > div > div
      const innerDivs = heroBlock.querySelectorAll(':scope > div > div');
      if (innerDivs.length > 0) {
        heroContentDiv = innerDivs[0];
      }
    }
  }
  // Fallback: find the first div with a picture or img inside
  if (!heroContentDiv) {
    const candidateDivs = element.querySelectorAll('div');
    for (const div of candidateDivs) {
      if (div.querySelector('picture,img')) {
        heroContentDiv = div;
        break;
      }
    }
    // Final fallback: just use element itself
    if (!heroContentDiv) heroContentDiv = element;
  }

  // Extract the first image or picture for row 2 (background image)
  let imageEl = null;
  for (const node of heroContentDiv.childNodes) {
    if (node.nodeType === 1 && (node.tagName === 'PICTURE' || node.tagName === 'IMG')) {
      imageEl = node;
      break;
    }
    // Sometimes the image is inside a <p>
    if (
      node.nodeType === 1 &&
      node.tagName === 'P' &&
      node.querySelector('picture,img')
    ) {
      imageEl = node.querySelector('picture,img');
      break;
    }
  }

  // Extract all heading, paragraph, and CTA (link) elements after image for row 3
  const textEls = [];
  let passedImage = false;
  for (const child of heroContentDiv.children) {
    if (!passedImage) {
      if (
        child.tagName === 'PICTURE' ||
        child.tagName === 'IMG' ||
        (child.tagName === 'P' && child.querySelector('picture,img'))
      ) {
        passedImage = true;
        continue;
      }
    } else {
      // Ignore empty paragraphs (except those with a link)
      if (
        child.tagName === 'P' &&
        child.textContent.trim() === '' &&
        !child.querySelector('a')
      ) {
        continue;
      }
      textEls.push(child);
    }
  }
  // If nothing collected, try to get headings after image
  if (textEls.length === 0 && heroContentDiv) {
    const candidateEls = heroContentDiv.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a');
    for (const node of candidateEls) {
      // Only add if not inside a picture/picture's parent
      if (!node.closest('picture')) {
        textEls.push(node);
      }
    }
  }

  // Remove duplicates in textEls
  const seen = new Set();
  const uniqueTextEls = textEls.filter(el => {
    if (seen.has(el)) return false;
    seen.add(el);
    return true;
  });

  // Build the block table
  const rows = [];
  rows.push(['Hero']); // Header row, must be exactly 'Hero'
  rows.push([imageEl || '']); // Row 2: image or empty
  rows.push([uniqueTextEls.length === 1 ? uniqueTextEls[0] : uniqueTextEls]); // Row 3: all text content

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
