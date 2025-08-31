/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get the hero block content. The image and text are nested inside .hero.block > div > div
  // 2. There is no metadata block in the example, so don't add one or use <hr>.

  // Find the inner content block
  let contentDiv = null;
  // Find .hero.block inside .hero-wrapper, fallback to .hero-wrapper
  const heroBlock = element.querySelector('.hero.block') || element.querySelector('.hero-wrapper') || element;
  // Go down: heroBlock > div > div
  if (heroBlock) {
    let div1 = heroBlock.querySelector('div');
    if (div1) {
      let div2 = div1.querySelector('div');
      if (div2) {
        contentDiv = div2;
      } else {
        contentDiv = div1;
      }
    } else {
      contentDiv = heroBlock;
    }
  }
  if (!contentDiv) contentDiv = element;

  // 1st row: always a single header cell
  const headerRow = ['Hero (hero2)'];

  // 2nd row: image (picture/img inside first <p>)
  let imageCell = null;
  // Find first <picture> or <img> inside a <p>
  let firstPic = null;
  let firstImg = null;
  Array.from(contentDiv.children).forEach(child => {
    if (!firstPic && child.querySelector && child.querySelector('picture')) {
      firstPic = child.querySelector('picture');
    }
    if (!firstImg && child.querySelector && child.querySelector('img')) {
      firstImg = child.querySelector('img');
    }
  });
  imageCell = firstPic || firstImg || null;

  // 3rd row: all content except image
  // Find first heading and subsequent siblings (skip the image para)
  let textCellElements = [];
  let foundHeading = null;
  // Find first heading
  for (let child of Array.from(contentDiv.children)) {
    if (/H[1-6]/.test(child.tagName)) {
      foundHeading = child;
      break;
    }
  }
  if (foundHeading) {
    textCellElements.push(foundHeading);
    let sib = foundHeading.nextElementSibling;
    while (sib) {
      // skip the para with picture or img
      if (sib.querySelector && (sib.querySelector('picture') || sib.querySelector('img'))) {
        sib = sib.nextElementSibling;
        continue;
      }
      // skip empty paragraphs
      if (sib.tagName === 'P' && sib.textContent.trim() === '') {
        sib = sib.nextElementSibling;
        continue;
      }
      textCellElements.push(sib);
      sib = sib.nextElementSibling;
    }
  } else {
    // If no heading, take all except image para
    for (let child of Array.from(contentDiv.children)) {
      // skip para with image
      if (child.querySelector && (child.querySelector('picture') || child.querySelector('img'))) continue;
      textCellElements.push(child);
    }
  }
  // Remove empty at end if only one empty element
  textCellElements = textCellElements.filter(el => el.textContent && el.textContent.trim() !== '');

  // Build the cells array
  const cells = [
    headerRow,
    [imageCell],
    [textCellElements.length === 1 ? textCellElements[0] : textCellElements]
  ];

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
