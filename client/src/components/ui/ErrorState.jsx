import Button from './Button';

function ErrorState({ title = 'Une erreur est survenue', description, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      <p className="text-sm font-medium text-[#EF4444] mb-1">{title}</p>
      {description && <p className="text-sm text-[#A1A1AA] max-w-xs mb-4">{description}</p>}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Réessayer
        </Button>
      )}
    </div>
  );
}

export default ErrorState;
