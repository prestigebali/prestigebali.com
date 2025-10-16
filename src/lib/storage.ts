'use client';

import { FirebaseStorage, getDownloadURL, ref, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage';

/**
 * Uploads a file to Firebase Storage with progress tracking.
 *
 * @param storage - The Firebase Storage instance.
 * @param file - The file to upload.
 * @param path - The desired path in the storage bucket (e.g., 'images/my-image.jpg').
 * @param onProgress - A callback function that receives the upload progress percentage.
 * @returns A promise that resolves with the public download URL of the uploaded file.
 */
export function uploadImage(
  storage: FirebaseStorage,
  file: File,
  path: string,
  onProgress: (progress: number) => void
): Promise<string> {
  if (!storage) {
    return Promise.reject(new Error("Firebase Storage is not initialized."));
  }
  
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot: UploadTaskSnapshot) => {
        // Report progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload failed:', error);
        switch (error.code) {
          case 'storage/unauthorized':
            reject(new Error("Permission denied. Check your Firebase Storage security rules."));
            break;
          case 'storage/canceled':
            reject(new Error("Upload was canceled."));
            break;
          case 'storage/unknown':
            reject(new Error("An unknown error occurred on Firebase Storage."));
            break;
          default:
            reject(new Error("Image upload failed: " + error.message));
        }
      },
      async () => {
        // Handle successful uploads on complete
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
           console.error("Failed to get download URL:", error);
           reject(new Error("Could not get download URL after successful upload."));
        }
      }
    );
  });
}
