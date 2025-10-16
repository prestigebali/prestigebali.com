import { getStorage, ref, uploadBytes, getDownloadURL, FirebaseStorage, StrorageError } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// This is to avoid using uuid in the client component
export const generateId = () => uuidv4();

export async function uploadImage(storage: FirebaseStorage, file: File, path: string): Promise<string> {
    const storageRef = ref(storage, path);
    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error: any) {
        if (error.code === 'storage/unauthorized') {
            throw new Error('Permission denied. Check your Firebase Storage security rules.');
        }
        throw new Error('An unknown error occurred during image upload.');
    }
}
