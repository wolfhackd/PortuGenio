import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import type { TextCorrectionRequest } from '@/utils/types/text-correction-request';

export const GrammarCorrection = () => {
  const GrammarCorrectionSchema = z.object({
    textForCorrection: z
      .string()
      .min(2, { message: 'Inclua no mínimo 2 caracteres' }),
  });

  type CorrectionFormData = z.infer<typeof GrammarCorrectionSchema>;

  const correctionForm = useForm<CorrectionFormData>({
    resolver: zodResolver(GrammarCorrectionSchema),
    defaultValues: {
      textForCorrection: '',
    },
  });

  // const correction = useMutation({
  //   mutationFn: async (data: TextCorrectionRequest) => {
  //     axios.post()
  //   },
  // });

  function handleCorrectionSubmit({ textForCorrection }: CorrectionFormData) {
    // Falta terminar
    // await sendCorrectionRequest({ textForCorrection });
    correctionForm.reset();
    // setBotResponse();
  }

  return (
    <div className="scrollbar-none flex h-screen flex-col items-center justify-center overflow-y-scroll py-6">
      <Card className="w-4/5 flex-1">
        <CardHeader>
          <CardTitle className="text-center text-4xl">
            Correção de frases/textos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Form {...correctionForm}>
              <form
                onSubmit={correctionForm.handleSubmit(handleCorrectionSubmit)}
              >
                <FormField
                  control={correctionForm.control}
                  name="textForCorrection"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Seu Texto</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="“Digite aqui sua frase…”"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <Button className="mt-4 w-full cursor-pointer" type="submit">
                  {/* {BotResponse != null ? 'Nova Correção' : 'Corrigir'} */}
                  Corrigir
                </Button>
              </form>
            </Form>
          </div>
          <div className="mt-4">
            <p className="block py-2 font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Correção
            </p>
            {/* <Textarea placeholder="Resposta" readOnly value={BotResponse} /> */}
            <Textarea placeholder="Resposta" readOnly />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
