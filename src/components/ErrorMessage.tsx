import { CSSProperties } from 'react';

const styles: CSSProperties = { color: 'red', fontSize: '12px' };

interface ErrorMessageProps {
  message?: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div>
      <span style={styles}>{message || 'error'}</span>
    </div>
  );
}
