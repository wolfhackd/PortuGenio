import { Menubar } from '@/components/Menubar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export const Quiz = () => {
  return (
    <div className="min-h-screen">
      <Menubar />
      <div className="flex flex-col items-center justify-between ">
        <h1>Quiz de Gramática</h1>
        <div className="mb-4 flex flex-col gap-4">
          <h3>Pergunta:</h3>
          <p>
            Qual a forma correta? <br />
            a) Fazem dois anos que estudei. <br />
            b) Faz dois anos que estudei.
          </p>
          {/* Respostas */}
          <div>
            <ToggleGroup className="gap-6 rounded-none" type="single">
              <ToggleGroupItem
                className="!rounded-md cursor-pointer px-8"
                value="a"
              >
                A
              </ToggleGroupItem>
              <ToggleGroupItem
                className="!rounded-md cursor-pointer px-8"
                value="b"
              >
                B
              </ToggleGroupItem>
              <ToggleGroupItem
                className="!rounded-md cursor-pointer px-8"
                value="c"
              >
                C
              </ToggleGroupItem>
              <ToggleGroupItem
                className="!rounded-md cursor-pointer px-8 "
                value="d"
              >
                D
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
    </div>
  );
};
