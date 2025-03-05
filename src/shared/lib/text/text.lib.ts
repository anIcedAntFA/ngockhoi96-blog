import { VALID_URL_REGEX } from '@/shared/config/regex.config';

/**
 * Downloads a file from a given URL.
 *
 * This function handles the downloading of a file by either directly triggering the download
 * or forcefully downloading the file using the `fetch` API if specified. It creates a temporary
 * link element, appends it to the document, triggers a click to download the file, and then removes
 * the link from the DOM. If `forceDownload` is true, the file fetched as a Blob before being
 * downloaded.
 *
 * @param {string} fileURL - The URL of the file downloaded.
 * @param {string} fileName - The name that the downloaded file should have.
 * @param {boolean} forceDownload - A flag that determines whether to force the download using `fetch`. Defaults to false.
 *
 * @returns A promise that resolves when the download triggered.
 */
async function downloadFile(
  fileURL: string,
  fileName: string,
  forceDownload = false,
): Promise<void> {
  /**
   * Create a temporary download link, triggers a click event, and removes the link.
   *
   * @param {string} href - The URL of the file downloaded.
   * @param {string} name - The name to assign to the downloaded file.
   */
  function handleBuildLink(href: string, name: string) {
    const link = document.createElement('a');
    link.href = href;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const isValidURL = VALID_URL_REGEX.test(fileURL);
  if (!isValidURL) {
    console.error('Invalid file URL.');
    return;
  }

  if (!forceDownload) {
    handleBuildLink(fileURL, fileName);
    return;
  }

  try {
    const fileResponse = await fetch(fileURL);

    if (!fileResponse.ok) {
      throw new Error('Failed to fetch file');
    }

    const fileBlob = await fileResponse.blob();
    const blobURL = URL.createObjectURL(fileBlob);

    handleBuildLink(blobURL, fileName);
    URL.revokeObjectURL(blobURL);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

export const textLib = {
  downloadFile,
};
