'use client';
    
import {
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentReference,
  SetOptions,
  doc,
  collection,
  writeBatch,
  Firestore,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(docRef: DocumentReference, data: any, options?: SetOptions) {
  const promise = options ? setDoc(docRef, data, options) : setDoc(docRef, data);
  promise.catch(error => {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: docRef.path,
        operation: 'write', // or 'create'/'update' based on options
        requestResourceData: data,
      })
    )
  })
  // Execution continues immediately
}

/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(docRef: DocumentReference, data: any) {
  updateDoc(docRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        })
      )
    });
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(docRef: DocumentReference) {
  deleteDoc(docRef)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        })
      )
    });
}

/**
 * Initiates a batch write operation.
 * Does NOT await the commit operation internally.
 */
export function batchWriteNonBlocking(db: Firestore, operations: Array<{type: 'set' | 'update' | 'delete', path: string, data?: any}>) {
    const batch = writeBatch(db);

    operations.forEach(op => {
        const docRef = doc(db, op.path);
        switch (op.type) {
            case 'set':
                if (op.data) batch.set(docRef, op.data);
                break;
            case 'update':
                if (op.data) batch.update(docRef, op.data);
                break;
            case 'delete':
                batch.delete(docRef);
                break;
        }
    });

    batch.commit().catch(error => {
        errorEmitter.emit(
            'permission-error',
            new FirestorePermissionError({
                path: 'batch operation',
                operation: 'write',
                requestResourceData: { operations }
            })
        );
    });
}
