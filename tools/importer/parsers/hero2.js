/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the hero content: <div class="hero block">...
  const heroBlock = element.querySelector('.hero.block');
  // Defensive: if not found, fallback to whole element
  const heroContent = heroBlock ? heroBlock : element;

  // Find the inner div that contains the block content
  let contentDiv = heroContent.querySelector(':scope > div > div') || heroContent.querySelector(':scope > div');
  if (!contentDiv) {
    // fallback to heroContent if not present
    contentDiv = heroContent;
  }

  // Get all direct children of the contentDiv
  const children = Array.from(contentDiv.children);

  // Find the image (picture preferred, or img)
  let imageEl = null;
  for (const child of children) {
    const pic = child.querySelector && child.querySelector('picture');
    if (pic) {
      imageEl = pic;
      break;
    }
    const img = child.querySelector && child.querySelector('img');
    if (img) {
      imageEl = img;
      break;
    }
  }
  // Fallback: direct image in contentDiv
  if (!imageEl) {
    imageEl = contentDiv.querySelector('picture') || contentDiv.querySelector('img');
  }

  // Find headings (h1-h6), subheadings, and text
  // Gather all non-image elements that are h1-h6 or paragraphs
  let textElements = [];
  for (const child of children) {
    // If this child contains the image, skip it for text
    if (child.contains(imageEl)) continue;
    if (/^H[1-6]$/.test(child.tagName) || child.tagName === 'P') {
      textElements.push(child);
    } else {
      // If this child has h1-h6 or p descendants, include those
      const inner = child.querySelectorAll('h1,h2,h3,h4,h5,h6,p');
      if (inner.length) textElements.push(...inner);
    }
  }
  // Remove empty paragraphs
  textElements = textElements.filter(el => !(el.tagName === 'P' && el.textContent.trim() === ''));

  // Build table
  const tableRows = [
    ['Hero'],
    [imageEl || ''],
    [textElements.length === 1 ? textElements[0] : textElements]
  ];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
