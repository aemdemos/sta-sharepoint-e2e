/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the hero block content
  let block = element;
  // If this is the .section, find the .hero.block inside
  if (block.classList.contains('section')) {
    const heroBlock = block.querySelector('.hero.block');
    if (heroBlock) block = heroBlock;
  }

  // Find the innermost div containing the content (hero.block > div > div)
  let contentDiv = block;
  if (contentDiv.querySelector(':scope > div > div')) {
    contentDiv = contentDiv.querySelector(':scope > div > div');
  } else if (contentDiv.querySelector(':scope > div')) {
    contentDiv = contentDiv.querySelector(':scope > div');
  }

  // Get all direct children of the content div
  const children = Array.from(contentDiv.children);

  // Find the first <picture> (usually inside a <p>) for the image row
  let imageCell = '';
  for (const child of children) {
    const pic = child.querySelector && child.querySelector('picture');
    if (pic) {
      // Use the parent <p> for context, otherwise use <picture>
      imageCell = child;
      break;
    }
  }

  // For the text row, exclude the image row
  const textContent = children.filter(child => child !== imageCell && !(child.querySelector && child.querySelector('picture')));
  // Remove empty paragraphs to avoid blank rows
  const filteredText = textContent.filter(el => {
    if (el.tagName === 'P' && el.textContent.trim() === '' && el.querySelectorAll('img, picture').length === 0) {
      return false;
    }
    return true;
  });

  // If only one element is left for text, use it directly; otherwise, array
  let textCell = filteredText.length === 1 ? filteredText[0] : filteredText;

  // Table header as in the example
  const headerRow = ['Hero'];
  const cells = [
    headerRow,
    [imageCell],
    [textCell],
  ];

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}