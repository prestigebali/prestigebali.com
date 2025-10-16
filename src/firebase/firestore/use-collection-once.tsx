'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Query,
  getDocs,
  DocumentData,
  FirestoreError,
  CollectionReference,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import type { WithId, InternalQuery } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase/provider';


export interface UseCollectionOnceResult<T> {
  data: WithId<T>[] | null;
  isLoading: boolean;
  error: FirestoreError | Error | null;
  refetch: () => void;
}

export function useCollectionOnce<T = any>(
  memoizedTargetRefOrQuery: ((CollectionReference<DocumentData> | Query<DocumentData>) & { __memo?: boolean }) | null | undefined,
): UseCollectionOnceResult<T> {
  type ResultItemType = WithId<T>;
  type StateDataType = ResultItemType[] | null;

  const [data, setData] = useState<StateDataType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | Error | null>(null);

  const firestore = useFirestore();

  const fetchData = useCallback(async () => {
    if (!memoizedTargetRefOrQuery || !firestore) {
      setData(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const snapshot = await getDocs(memoizedTargetRefOrQuery);
      const results: ResultItemType[] = [];
      snapshot.forEach((doc) => {
        results.push({ ...(doc.data() as T), id: doc.id });
      });
      setData(results);
    } catch (err) {
        const path: string =
        memoizedTargetRefOrQuery.type === 'collection'
          ? (memoizedTargetRefOrQuery as CollectionReference).path
          : (memoizedTargetRefOrQuery as unknown as InternalQuery)._query.path.canonicalString()

      const contextualError = new FirestorePermissionError({
        operation: 'list',
        path,
      });

      setError(contextualError);
      errorEmitter.emit('permission-error', contextualError);
    } finally {
      setIsLoading(false);
    }
  }, [memoizedTargetRefOrQuery, firestore]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (memoizedTargetRefOrQuery && !memoizedTargetRefOrQuery.__memo) {
    throw new Error('useCollectionOnce was not properly memoized using useMemoFirebase');
  }

  return { data, isLoading, error, refetch: fetchData };
}
