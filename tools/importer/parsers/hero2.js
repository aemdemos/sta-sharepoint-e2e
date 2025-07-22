/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero-wrapper
  const wrapper = element.querySelector('.hero-wrapper');
  if (!wrapper) return;

  // Find the .hero.block
  const heroBlock = wrapper.querySelector('.hero.block');
  if (!heroBlock) return;

  // Find the deepest div containing the content
  // .hero.block > div > div
  let blockContent = heroBlock;
  const level1 = heroBlock.querySelector(':scope > div');
  if (level1) {
    const level2 = level1.querySelector(':scope > div');
    if (level2) {
      blockContent = level2;
    } else {
      blockContent = level1;
    }
  }

  // Select children from blockContent
  const children = Array.from(blockContent.children);

  // Find the background image (should be a <picture> inside a <p>)
  let imageElem = null;
  for (const child of children) {
    const picture = child.querySelector && child.querySelector('picture');
    if (picture) {
      imageElem = picture;
      break;
    }
  }

  // Gather the text content elements (excluding empty <p> and the image <p> if any)
  const textElems = [];
  for (const child of children) {
    // skip if this is the <p> with picture
    if (imageElem && child.contains(imageElem)) continue;
    // skip empty <p>
    if (child.tagName === 'P' && child.textContent.trim() === '') continue;
    // Only include H1, H2, H3, H4, P, or meaningful DIVs
    if (
      ['H1', 'H2', 'H3', 'H4', 'P', 'DIV'].includes(child.tagName) &&
      child.textContent.trim() !== ''
    ) {
      textElems.push(child);
    }
  }

  // Prepare rows
  const rows = [];
  rows.push(['Hero']); // Block name header
  rows.push([imageElem ? imageElem : '']);
  rows.push([textElems.length ? textElems : '']);

  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
