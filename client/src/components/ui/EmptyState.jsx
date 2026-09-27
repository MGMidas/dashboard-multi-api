import Button from './Button';

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4">
      <p className="text-sm font-medium text-[#FAFAFA] mb-1">{title}</p>
      <p className="text-sm text-[#A1A1AA] max-w-xs mb-4">{description}</p>
      {actionLabel && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;