export const Loading = () => <p role="status" className="state">Loading…</p>;
export const ErrorMessage = ({ message, onRetry }: { message: string; onRetry?: () => void }) => (
  <div role="alert" className="state error">
    <p>Couldn’t load products: {message}</p>
    {onRetry && <button className="btn" onClick={onRetry}>Try again</button>}
  </div>
);
export const EmptyState = ({ text }: { text: string }) => <p className="state">{text}</p>;
