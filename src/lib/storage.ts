import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

// This is to avoid using uuid in the client component
export const generateId = () => uuidv4();

export async function uploadImage(file: File, path: string): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, path);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
}
