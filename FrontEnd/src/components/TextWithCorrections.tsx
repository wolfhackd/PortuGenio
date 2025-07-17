/** biome-ignore-all lint/performance/useTopLevelRegex: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ErrorData {
  word: string;
  reason: string;
}

interface TextWithCorrectionsProps {
  text: string;
  errors: ErrorData[];
}

export const TextWithCorrections = ({
  text,
  errors,
}: TextWithCorrectionsProps) => {
  // Quebra por espaços (preserva espaços, pontuações e acentuação)
  const tokens = text.split(/(\s+)/); // divide por espaço mas mantém os espaços

  return (
    <TooltipProvider>
      <div className="flex flex-wrap text-sm leading-relaxed">
        {tokens.map((token, index) => {
          // Tira pontuações do final para comparar com as palavras erradas
          const cleanToken = token
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''); // remove acento
          const tokenWithoutPunctuation = cleanToken.replace(/[.,;!?]/g, '');

          const error = errors.find(
            (err) =>
              err.word.toLowerCase() === tokenWithoutPunctuation.toLowerCase()
          );

          if (error) {
            return (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <span className="cursor-help text-red-400 underline decoration-2 decoration-red-500">
                    {token}
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs border border-zinc-700 bg-zinc-800 text-white">
                  {error.reason}
                </TooltipContent>
              </Tooltip>
            );
          }

          return (
            <span className="whitespace-pre-wrap" key={index}>
              {token}
            </span>
          );
        })}
      </div>
    </TooltipProvider>
  );
};
