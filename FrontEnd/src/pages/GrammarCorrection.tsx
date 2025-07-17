import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Copy } from 'lucide-react';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
import { Toaster } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import type { TextCorrectionRequest } from '@/utils/types/text-correction-request';

export const GrammarCorrection = () => {
  const [botResponse, setBotResponse] = useState('');
  const responseRef = useRef<HTMLTextAreaElement>(null);

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

  const correction = useMutation({
    mutationFn: async (data: TextCorrectionRequest) => {
      const response = await axios.post(
        'http://localhost:3333/correction',
        data
      );
      return response.data;
    },
    onSuccess(data) {
      setBotResponse(data?.text);
    },
  });

  async function handleCorrectionSubmit({
    textForCorrection,
  }: CorrectionFormData) {
    await correction.mutateAsync({ text: textForCorrection });
    correctionForm.reset();
  }

  const copyText = () => {
    if (botResponse != null || '') {
      navigator.clipboard.writeText(botResponse).then(() => {
        toast.success('Copiado para a área de transferência.');
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-10 text-zinc-100">
      <Toaster />
      <Card className="w-full max-w-2xl rounded-2xl bg-zinc-900 shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-bold text-3xl">
            Correção Gramatical
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...correctionForm}>
            <form
              className="space-y-4"
              onSubmit={correctionForm.handleSubmit(handleCorrectionSubmit)}
            >
              <FormField
                control={correctionForm.control}
                name="textForCorrection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-zinc-300">
                      Digite seu texto
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="border-zinc-700 bg-zinc-800 text-zinc-100"
                        placeholder="Ex: Eu vai na escola amanhã"
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full cursor-pointer bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
                disabled={correction.isPending}
                type="submit"
              >
                {correction.isPending ? 'Corrigindo...' : 'Corrigir'}
              </Button>
            </form>
          </Form>

          <div className=" mt-6 ">
            <div className="flex items-center justify-between">
              <p className="mb-2 font-semibold text-sm text-zinc-400">
                Correção
              </p>
              {botResponse && (
                <Button
                  className={'top-0 right-2 cursor-pointer'}
                  onClick={copyText}
                  size={'icon'}
                  variant={'ghost'}
                >
                  <Copy />
                </Button>
              )}
            </div>
            <Textarea
              className="border-zinc-700 bg-zinc-800 text-zinc-100"
              placeholder="A correção aparecerá aqui"
              readOnly
              ref={responseRef}
              rows={4}
              value={botResponse}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
