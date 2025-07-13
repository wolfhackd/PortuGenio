import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { UseMenuItem } from '@/utils/types/use-menu-item';

export const Home = () => {
  const MenuItem: UseMenuItem[] = [
    {
      label: 'Início ',
      path: '',
    },
    {
      label: 'Corrigir Frase',
      path: '',
    },
    {
      label: 'Quiz ',
      path: '',
    },
    {
      label: 'Sobre ',
      path: '',
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between px-10 py-2">
        <Brain className="size-14 text-white" />
        <nav>
          {MenuItem.map((item) => (
            <Button className="cursor-pointer" key={item.path} variant={'link'}>
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="font-bold text-4xl">
          Aprenda Gramática com Inteligência Artificial
        </h1>
        <p className="font-bold text-3xl">
          Corrija frases, faça quizzes e aprenda de forma simples e prática.
        </p>
        {/* Dica da I.A */}
        <span className="font-bold text-muted-foreground">
          💡 “Lembre-se: ‘mas’ com S indica oposição, enquanto ‘mais’ com I
          indica quantidade.”
        </span>
      </div>
    </div>
  );
};
