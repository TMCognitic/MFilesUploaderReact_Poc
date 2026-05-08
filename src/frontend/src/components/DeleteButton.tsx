import { Button } from 'devextreme-react';
import React, { useCallback } from 'react';

export type Parameters = {
  children: string,
  uid: string,
  onDelete: (uid: string) => void
};

export const DeleteButton = ({ uid, onDelete } : Parameters) => {
  const handleDelete = useCallback(() => {
    onDelete(uid);
  }, [uid, onDelete]);

  return (
    <Button onClick={handleDelete}>DeleteButton</Button>
  );
};
