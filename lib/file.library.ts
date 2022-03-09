export class FileTooLargeError extends Error {}

export function readFileAsBase64(file: File): Promise<string> {
  if (file.size / (1024 * 1024) > 2) {
    throw new FileTooLargeError("Maximum file size is 2MB.");
  }
  return new Promise((resolve) => {
    let fileInfo;
    let baseURL: string = "";
    // Make new FileReader
    let reader = new FileReader();

    // Convert the file to base64 text
    reader.readAsDataURL(file);

    // on reader load somthing...
    reader.onload = () => {
      // Make a fileInfo Object
      baseURL = reader.result as string;
      resolve(baseURL);
    };
  });
}
