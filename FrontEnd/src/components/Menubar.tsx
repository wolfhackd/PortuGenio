import { Brain } from 'lucide-react';
import { useNavigate } from 'react-router';
import type { UseMenuItem } from '@/utils/types/use-menu-item';
import { Button } from './ui/button';

export const Menubar = () => {
  const navigate = useNavigate();
  const menuItems: UseMenuItem[] = [
    {
      label: 'Início ',
      path: '',
    },
    {
      label: 'Corrigir',
      path: '/corrigir',
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
    <div className="flex items-center justify-between px-10 py-2">
      <Brain className="size-14 text-white" />
      <nav>
        {menuItems.map((item) => (
          <Button
            className="cursor-pointer"
            key={item.label}
            onClick={() => {
              navigate(item.path);
            }}
            variant={'link'}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </div>
  );
};
