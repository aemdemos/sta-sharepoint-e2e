/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual hero block content
  // The structure is: 
  // div.section.hero-container > div.hero-wrapper > div.hero.block > div > div > [content]

  // Step into hero-wrapper if present
  let heroWrapper = element.querySelector(':scope > .hero-wrapper');
  let heroBlock = heroWrapper ? heroWrapper.querySelector(':scope > .hero.block') : element.querySelector(':scope > .hero.block');
  let innerContent = null;
  if (heroBlock) {
    // Sometimes .hero.block > div > div is the actual content
    let firstDiv = heroBlock.querySelector(':scope > div');
    innerContent = firstDiv ? firstDiv.querySelector(':scope > div') || firstDiv : heroBlock;
  } else {
    innerContent = element;
  }

  // Find image in a <picture> inside a <p>
  // This matches the example structure: <p><picture>...</picture></p>
  let imageCell = null;
  let picParagraph = innerContent.querySelector('p picture');
  if (picParagraph && picParagraph.parentElement) {
    imageCell = picParagraph.parentElement;
  } else {
    // Just in case, fallback to first <img>
    let img = innerContent.querySelector('img');
    if (img) imageCell = img;
  }

  // Gather all remaining elements (after image) for text cell
  // These are direct children of innerContent, after the image <p>
  let children = Array.from(innerContent.children);
  let imageIdx = children.indexOf(imageCell);
  let textElements = [];
  if (imageIdx !== -1) {
    textElements = children.slice(imageIdx + 1);
  } else {
    // If image not found, everything is text
    textElements = children;
  }
  // Remove any empty <p> tags (like <p></p>) from the block
  textElements = textElements.filter(el => {
    if (el.tagName === 'P' && el.textContent.trim() === '') {
      return false;
    }
    return true;
  });

  // Compose table rows according to the example
  const cells = [
    ['Hero'],
    [imageCell],
    [textElements]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
