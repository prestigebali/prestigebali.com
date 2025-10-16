'use client';

import {
  getStorage,
  ref,
  getDownloadURL,
  FirebaseStorage,
  uploadBytesResumable,
  UploadTask,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// This is to avoid using uuid in the client component
export const generateId = () => uuidv4();

export function uploadImage(
  storage: FirebaseStorage,
  file: File,
  path: string,
  onProgress: (progress: number) => void
): Promise<string> {
  const storageRef = ref(storage, path);
  const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        if (error.code === 'storage/unauthorized') {
          reject(
            new Error('Permission denied. Check your Firebase Storage security rules.')
          );
        } else {
          reject(new Error('An unknown error occurred during image upload.'));
        }
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}
