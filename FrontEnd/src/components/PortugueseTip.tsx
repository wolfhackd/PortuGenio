import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { UseTipRequest } from '@/utils/types/use-tip-request';
import { env } from '@/env';

export function PortugueseTip() {
  const { data, isLoading, error } = useQuery<UseTipRequest>({
    queryKey: ['portugueseTip'],
    queryFn: async () => {
      const res = await axios.get<UseTipRequest>(`${env.VITE_BACKEND_ORIGIN}/getTip`);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <p className="text-muted-foreground">Carregando dica...</p>;
  }
  if (error) {
    return <p className="text-red-400">Erro ao carregar dica!</p>;
  }

  return <span className="font-bold text-muted-foreground">💡 {data?.tip}</span>;
}
