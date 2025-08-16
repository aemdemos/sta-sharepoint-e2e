/* global WebImporter */
export default function parse(element, { document }) {
  // The Hero block is contained within the provided element (with class 'section hero-container').
  // Let's find the hero block content structure.

  // Find the hero block (should only be one)
  const heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) {
    // No hero block found; nothing to do
    return;
  }

  // Find the deepest div containing actual content
  // The structure is heroBlock > div > div
  let mainContentDiv;
  const firstDiv = heroBlock.querySelector(':scope > div');
  if (firstDiv) {
    const secondDiv = firstDiv.querySelector(':scope > div');
    mainContentDiv = secondDiv || firstDiv;
  } else {
    mainContentDiv = heroBlock;
  }

  // Now we extract the image/picture (first), and the rest of the content (headings, text)
  let imageEl = null;
  let pictureParentIndex = -1;
  // Look for a <picture> element inside a <p>, which is the usual pattern
  const children = Array.from(mainContentDiv.children);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.querySelector && child.querySelector('picture')) {
      imageEl = child.querySelector('picture');
      pictureParentIndex = i;
      break;
    }
  }
  // If no picture, look for an <img>
  if (!imageEl) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (child.tagName.toLowerCase() === 'img') {
        imageEl = child;
        pictureParentIndex = i;
        break;
      }
    }
  }

  // Now, collect all remaining content elements except the image's parent <p> (if found)
  const textContent = [];
  for (let i = 0; i < children.length; i++) {
    // Skip the <p> containing the picture, if found
    if (i === pictureParentIndex) continue;
    // Ignore empty paragraphs
    if (children[i].tagName === 'P' && children[i].textContent.trim() === '') continue;
    textContent.push(children[i]);
  }

  // Construct the table rows as per the guidelines
  const headerRow = ['Hero'];
  const imageRow = [imageEl];
  const textRow = [textContent];
  const cells = [headerRow, imageRow, textRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original section with the new block
  element.replaceWith(block);
}
