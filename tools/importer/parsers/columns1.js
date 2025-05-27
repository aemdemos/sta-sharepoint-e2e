/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row exactly as in the example
  const headerRow = ['Columns (columns1)'];

  // Extract direct child elements of the block
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Handle the first column content dynamically, ensuring extraction of the relevant HTML
  const firstColumnContent = document.createElement('div');
  if (children[0]) {
    firstColumnContent.append(...children[0].childNodes);

    // Convert elements with 'src' attributes (excluding images) into links
    const srcElements = firstColumnContent.querySelectorAll('[src]:not(img)');
    srcElements.forEach((srcElement) => {
      const link = document.createElement('a');
      link.href = srcElement.getAttribute('src');
      link.textContent = 'View';
      srcElement.replaceWith(link);
    });

    // Include the image elements without converting them into links
    const imgElements = firstColumnContent.querySelectorAll('img');
    imgElements.forEach((imgElement) => {
      const clonedImg = imgElement.cloneNode(true);
      imgElement.replaceWith(clonedImg);
    });
  }

  // Handle the second column content dynamically, ensuring extraction of the relevant HTML
  const secondColumnContent = document.createElement('div');
  if (children[1]) {
    secondColumnContent.append(...children[1].childNodes);

    // Convert elements with 'src' attributes (excluding images) into links
    const srcElements = secondColumnContent.querySelectorAll('[src]:not(img)');
    srcElements.forEach((srcElement) => {
      const link = document.createElement('a');
      link.href = srcElement.getAttribute('src');
      link.textContent = 'View';
      srcElement.replaceWith(link);
    });

    // Include the image elements without converting them into links
    const imgElements = secondColumnContent.querySelectorAll('img');
    imgElements.forEach((imgElement) => {
      const clonedImg = imgElement.cloneNode(true);
      imgElement.replaceWith(clonedImg);
    });
  } else {
    // Fix for empty second column: Provide fallback content
    const fallbackContent = document.createElement('p');
    fallbackContent.textContent = 'No content available';
    secondColumnContent.appendChild(fallbackContent);
  }

  // Create the table cells array
  const cells = [
    headerRow,
    [firstColumnContent, secondColumnContent],
  ];

  // Create the block table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}