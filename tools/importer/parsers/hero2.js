/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function for extracting src from <picture> or <img>
  const getImageElement = (parentElement) => {
    const pictureOrImg = parentElement.querySelector(':scope picture, :scope img');
    return pictureOrImg;
  };

  // Helper function for extracting text from headings
  const getHeadingText = (parentElement) => {
    const heading = parentElement.querySelector(':scope h1, :scope h2, :scope h3, :scope h4, :scope h5, :scope h6');
    return heading;
  };

  // Extract relevant parts from the element
  const imageElement = getImageElement(element);
  const headingElement = getHeadingText(element);

  // Construct structured table data
  const headerRow = ['Hero (hero2)'];
  const contentRow = [
    [imageElement, headingElement],
  ];

  const tableData = [
    headerRow,
    contentRow,
  ];

  // Create table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}