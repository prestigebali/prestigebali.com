'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  DocumentReference,
  getDoc,
  DocumentData,
  FirestoreError,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useFirestore } from '@/firebase/provider';
import type { UseDocResult } from './use-doc';

export function useDocOnce<T = any>(
  memoizedDocRef: DocumentReference<DocumentData> | null | undefined,
): UseDocResult<T> {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);
  const firestore = useFirestore();

  const fetchData = useCallback(async () => {
    if (!memoizedDocRef || !firestore) {
      setData(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const docSnap = await getDoc(memoizedDocRef);
      if (docSnap.exists()) {
        setData({ ...(docSnap.data() as T), id: docSnap.id });
      } else {
        setData(null);
      }
    } catch (err) {
      const contextualError = new FirestorePermissionError({
        operation: 'get',
        path: memoizedDocRef.path,
      });
      setError(contextualError);
      errorEmitter.emit('permission-error', contextualError);
    } finally {
      setIsLoading(false);
    }
  }, [memoizedDocRef, firestore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error };
}
