/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the hero block inside the section
  const heroBlock = element.querySelector('.hero.block');
  let imageEl = null;
  let textEls = [];

  if (heroBlock) {
    // Get the deepest div that contains content
    let contentDiv = heroBlock;
    // If heroBlock has a single child div, drill down
    while (contentDiv.children.length === 1 && contentDiv.firstElementChild.tagName === 'DIV') {
      contentDiv = contentDiv.firstElementChild;
    }

    // Find the <picture> inside a <p> for the image
    const pictureP = Array.from(contentDiv.querySelectorAll('p')).find(p => p.querySelector('picture'));
    if (pictureP) {
      imageEl = pictureP.querySelector('picture');
    }

    // Collect all heading and non-empty paragraph elements following the image
    let foundImage = false;
    for (const child of contentDiv.children) {
      // If this child contains the image, mark foundImage
      if (!foundImage && child.querySelector && child.querySelector('picture')) {
        foundImage = true;
        continue;
      }
      if (foundImage) {
        if (child.tagName.match(/^H\d$/) || (child.tagName === 'P' && child.textContent.trim())) {
          textEls.push(child);
        }
      }
    }
    // If none found after image, get all headings & non-empty paragraphs except the one with picture
    if (textEls.length === 0) {
      for (const child of contentDiv.children) {
        if (
          (child.tagName.match(/^H\d$/) || (child.tagName === 'P' && child.textContent.trim())) &&
          !child.querySelector('picture')
        ) {
          textEls.push(child);
        }
      }
    }
  }

  // Construct table rows, referencing elements directly
  const headerRow = ['Hero'];
  const imageRow = [imageEl ? imageEl : ''];
  const textRow = [textEls.length ? textEls : ''];

  const cells = [headerRow, imageRow, textRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
