import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ErrorData {
  word: string;
  reason: string;
  start: number;
  end: number;
}

interface TextWithCorrectionsProps {
  text: string;
  errors: ErrorData[];
}

export const TextWithCorrections = ({
  text,
  errors,
}: TextWithCorrectionsProps) => {
  if (errors.length === 0) return <>{text}</>;

  // Ordena os erros pelo índice de início para renderizar em ordem
  const sortedErrors = [...errors].sort((a, b) => a.start - b.start);

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  sortedErrors.forEach((error, i) => {
    // Pega o texto entre o cursor e o início do erro (trecho normal)
    if (cursor < error.start) {
      parts.push(
        <span key={`text-${i}-before`}>{text.slice(cursor, error.start)}</span>
      );
    }

    // Pega o texto do erro destacado
    parts.push(
      <Tooltip key={`error-${i}`}>
        <TooltipTrigger asChild>
          <span className="cursor-help text-red-400 underline decoration-2 decoration-red-500">
            {text.slice(error.start, error.end)}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs border border-zinc-700 bg-zinc-800 text-white">
          {error.reason}
        </TooltipContent>
      </Tooltip>
    );

    cursor = error.end;
  });

  // Texto depois do último erro
  if (cursor < text.length) {
    parts.push(<span key="text-after">{text.slice(cursor)}</span>);
  }

  return (
    <TooltipProvider>
      <div className="flex flex-wrap whitespace-pre-wrap text-md leading-relaxed">
        {parts}
      </div>
    </TooltipProvider>
  );
};
