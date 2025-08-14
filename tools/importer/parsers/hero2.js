/* global WebImporter */
export default function parse(element, { document }) {
  // Locate hero block's main content
  const heroBlock = element.querySelector('.hero.block');
  let mainContent = null;
  if (heroBlock) {
    // Handles nested divs: .hero.block > div > div
    const firstDiv = heroBlock.querySelector(':scope > div');
    if (firstDiv) {
      mainContent = firstDiv.querySelector(':scope > div');
    }
  }
  if (!mainContent) {
    // Fallback: Use the whole hero.block
    mainContent = heroBlock || element;
  }

  // Find the picture element (image)
  let imageElement = null;
  let picturePara = null;
  const paragraphs = mainContent.querySelectorAll(':scope > p');
  for (const para of paragraphs) {
    const pic = para.querySelector('picture');
    if (pic) {
      imageElement = pic;
      picturePara = para;
      break;
    }
  }

  // Collect ALL remaining heading and paragraph elements (including empty paragraphs) after the image
  const contentNodes = [];
  let afterImage = false;
  mainContent.childNodes.forEach((node) => {
    if (node === picturePara) {
      afterImage = true;
      return; // skip image paragraph
    }
    if (!afterImage) return; // skip nodes before image
    if (node.nodeType === 1 && (node.matches('h1, h2, h3, h4, h5, h6') || node.tagName.toLowerCase() === 'p')) {
      // Add all headings and paragraphs, even empty ones
      contentNodes.push(node);
    }
  });

  // If there are no elements after the image, fall back to collecting all headings/paragraphs except the image
  if (contentNodes.length === 0) {
    mainContent.childNodes.forEach((node) => {
      if (node === picturePara) return;
      if (node.nodeType === 1 && (node.matches('h1, h2, h3, h4, h5, h6') || node.tagName.toLowerCase() === 'p')) {
        contentNodes.push(node);
      }
    });
  }

  // Build the block table
  const cells = [];
  cells.push(['Hero']);
  cells.push([imageElement || '']);
  cells.push([contentNodes]);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
