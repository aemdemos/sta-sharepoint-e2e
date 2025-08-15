/* global WebImporter */
export default function parse(element, { document }) {
  // Find the hero block
  const heroBlock = element.querySelector('.hero.block');
  if (!heroBlock) return;

  // Get the deepest content container (contains the picture and headings)
  let contentContainer = heroBlock.querySelector(':scope > div > div');
  if (!contentContainer) {
    // Fallback: try one level up
    contentContainer = heroBlock.querySelector(':scope > div');
  }
  if (!contentContainer) return;

  // Find the image: look for a picture within a paragraph
  let imageRow = null;
  let foundImageParagraph = null;
  for (const child of contentContainer.children) {
    if (child.querySelector && child.querySelector('picture')) {
      foundImageParagraph = child;
      break;
    }
  }
  if (foundImageParagraph) {
    imageRow = foundImageParagraph;
  }

  // Collect all remaining elements in contentContainer (after removing the image paragraph)
  const textFragments = [];
  Array.from(contentContainer.children).forEach((child) => {
    if (foundImageParagraph && child === foundImageParagraph) return;
    if (child.tagName === 'P' && child.textContent.trim() === '') return;
    textFragments.push(child);
  });

  // Even if textFragments is empty, output an empty array to fill the third row

  const rows = [
    ['Hero'],
    [imageRow],
    [textFragments]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
