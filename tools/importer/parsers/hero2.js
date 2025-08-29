/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block
  let heroBlock = element.querySelector('[data-block-name="hero"]');
  if (!heroBlock) heroBlock = element;

  // Find the deepest direct div with actual content
  let contentDiv = heroBlock;
  // Typical structure is heroBlock > div > div
  const directDivs = Array.from(heroBlock.children).filter(el => el.tagName === 'DIV');
  if (directDivs.length === 1 && directDivs[0].querySelector('div')) {
    contentDiv = directDivs[0].querySelector('div');
  } else if (directDivs.length > 0) {
    contentDiv = directDivs[0];
  }

  // Gather all direct children of the contentDiv
  const children = Array.from(contentDiv.children);

  // Extract image element (usually within <p> containing <picture>)
  let imageEl = null;
  for (const child of children) {
    if (child.tagName === 'P' && child.querySelector('picture')) {
      imageEl = child.querySelector('picture');
      break;
    }
  }

  // Extract heading (h1/h2/h3) and text content (paragraphs, subheading, CTA)
  let headingEl = null;
  let textContent = [];
  for (const child of children) {
    if (!headingEl && /^H[1-3]$/.test(child.tagName)) {
      headingEl = child;
      textContent.push(child);
    } else if (child !== imageEl && !child.contains(imageEl)) {
      // Only add non-empty paragraphs and other semantic content
      if (child.textContent.trim() !== '') {
        textContent.push(child);
      }
    }
  }

  // Table header as specified in the example
  const headerRow = ['Hero (hero2)'];
  // Second row: background image (or blank if missing)
  const imageRow = [imageEl ? imageEl : ''];
  // Third row: text content (heading, subheading, paragraph, CTA as applicable)
  const textRow = [textContent.length === 1 ? textContent[0] : textContent];

  // Assemble table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(block);
}
