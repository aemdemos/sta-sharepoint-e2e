/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner hero block
  const heroBlock = element.querySelector('.hero.block');
  let imageEl = '';
  let headingEl = '';

  if (heroBlock) {
    // Find the first <picture> (inside a <p>)
    const picture = heroBlock.querySelector('picture');
    if (picture && picture.parentElement) {
      imageEl = picture.parentElement;
    }
    // Find the first heading (h1-h6)
    const heading = heroBlock.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      headingEl = heading;
    }
  }

  // Compose the block table rows according to the example
  const rows = [
    ['Hero'],
    [imageEl],
    [headingEl]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
