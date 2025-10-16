'use client';

// This file is intentionally left mostly blank as the upload functionality has been removed.
// We keep the file to avoid breaking imports that might still reference it,
// although the functions are no longer used in the package form.

import { v4 as uuidv4 } from 'uuid';

// This is to avoid using uuid in the client component, though it's not currently used.
export const generateId = () => uuidv4();
