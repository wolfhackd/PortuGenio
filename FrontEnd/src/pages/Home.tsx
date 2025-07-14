import { Brain } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import type { UseFooterItens } from '@/utils/types/use-footer-itens';
import type { UseMenuItem } from '@/utils/types/use-menu-item';

export const Home = () => {
  const navigate = useNavigate();
  const menuItems: UseMenuItem[] = [
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
  const footerItems: UseFooterItens[] = [
    {
      label: 'Política de Privacidade',
      path: '/',
    },
    {
      label: 'Contato',
      path: '/',
    },
    {
      label: 'GitHub ',
      path: 'https://www.github.com/wolfhackd',
    },
  ];

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex items-center justify-between px-10 py-2">
        <Brain className="size-14 text-white" />
        <nav>
          {menuItems.map((item) => (
            <Button
              className="cursor-pointer"
              key={item.label}
              variant={'link'}
            >
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-6xl">
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
      <footer className="flex w-full flex-col items-center justify-center p-4">
        <div>
          {footerItems.map((item) => (
            <a href={item.path} key={item.label}>
              <Button
                className="cursor-pointer"
                onClick={() => {
                  navigate(item.label);
                }}
                variant={'link'}
              >
                {item.label}
              </Button>
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};
