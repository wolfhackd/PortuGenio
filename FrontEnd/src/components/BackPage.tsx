import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface BackPageProps {
  className?: string;
}

export function BackPage({ className = '' }: BackPageProps) {
  const navigate = useNavigate();

  return (
    <Button
      className={`rounded-xl bg-zinc-800 px-4 py-2 text-white transition hover:bg-zinc-700 ${className}`}
      onClick={() => navigate(-1)}
    >
      Voltar
    </Button>
  );
}
