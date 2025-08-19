import { Menubar } from '@/components/Menubar';
import { PortugueseTip } from '@/components/PortugueseTip';
import { Button } from '@/components/ui/button';
import type { UseFooterItens } from '@/utils/types/use-footer-itens';

export const Home = () => {
  const footerItems: UseFooterItens[] = [
    {
      label: 'Política de Privacidade',
      path: '/',
    },
    {
      label: 'Contato',
      path: 'https://www.linkedin.com/in/mauro-leal-b1134425a/',
    },
    {
      label: 'GitHub ',
      path: 'https://www.github.com/wolfhackd',
    },
  ];

  return (
    <div className="flex h-screen w-screen flex-col">
      <Menubar />
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <h1 className="font-bold text-6xl">
          Aprenda Gramática com Inteligência Artificial
        </h1>
        <p className="font-bold text-3xl">
          Corrija frases, faça quizzes e aprenda de forma simples e prática.
        </p>
        <PortugueseTip />
      </div>
      <footer className="flex w-full flex-col items-center justify-center p-4">
        <div>
          {footerItems.map((item) => (
            <a href={item.path} key={item.label} target="_blank">
              <Button className="cursor-pointer" variant={'link'}>
                {item.label}
              </Button>
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
};
