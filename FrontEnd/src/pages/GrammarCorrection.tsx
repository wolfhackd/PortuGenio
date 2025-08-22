import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Menubar } from '@/components/Menubar';
import { TextWithCorrections } from '@/components/TextWithCorrections';
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
import { env } from '@/env';
import type { UseCorrectionErrorRequest } from '@/utils/types/use-correction-error-request';

export const GrammarCorrection = () => {
  const [originalText, setOriginalText] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [errors, setErrors] = useState<UseCorrectionErrorRequest[]>([]);
  const [copied, setCopied] = useState(false);

  const GrammarCorrectionSchema = z.object({
    textForCorrection: z
      .string()
      .min(2, { message: 'Inclua no mínimo 2 caracteres' }),
  });

  const form = useForm({
    resolver: zodResolver(GrammarCorrectionSchema),
    defaultValues: { textForCorrection: '' },
  });

  const correction = useMutation({
    mutationFn: async (data: { text: string }) => {
      const res = await axios.post(
        `${env.VITE_BACKEND_ORIGIN}/correction`,
        data
      );
      return res.data;
    },
    onSuccess(data) {
      setOriginalText(form.getValues('textForCorrection'));
      setBotResponse(data.text);
      setErrors(data.errors || []);
    },
  });

  const handleCorrectionSubmit = async (data: {
    textForCorrection: string;
  }) => {
    await correction.mutateAsync({ text: data.textForCorrection });
    form.reset();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(botResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex min-h-screen min-w-screen flex-col items-center justify-center bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="fixed top-0 left-0 w-full">
        <Menubar />
      </div>
      <div className="mt-16 flex w-full flex-1 flex-col items-center justify-center px-4 py-10">
        <Card className="w-full max-w-3xl rounded-2xl bg-zinc-900 shadow-xl">
          <CardHeader>
            <CardTitle className="text-center font-bold text-3xl">
              Correção de Frases/Textos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(handleCorrectionSubmit)}
              >
                <FormField
                  control={form.control}
                  name="textForCorrection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Digite seu texto:</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="border-zinc-700 bg-zinc-800 text-zinc-100"
                          placeholder="Ex: Eu vai na escola amanhã."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700"
                  type="submit"
                >
                  {correction.isPending ? 'Corrigindo...' : 'Corrigir'}
                </Button>
              </form>
            </Form>

            {botResponse && (
              <div className="mt-8 space-y-6">
                <div>
                  <p className="mb-1 font-semibold text-zinc-400">
                    Texto original:
                  </p>
                  <div className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3">
                    {originalText}
                  </div>
                </div>

                <div>
                  <p className="mb-1 font-semibold text-zinc-400">
                    Com marcações de erro:
                  </p>
                  <div className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3">
                    <TextWithCorrections errors={errors} text={originalText} />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-semibold text-zinc-400">
                      Texto corrigido:
                    </p>
                    <Button
                      className="cursor-pointer gap-2 border-zinc-600"
                      onClick={handleCopy}
                      size="sm"
                      variant="outline"
                    >
                      <Copy size={16} />
                      {copied ? 'Copiado!' : 'Copiar'}
                    </Button>
                  </div>
                  <div className="rounded-md border border-zinc-700 bg-zinc-800 px-4 py-3">
                    {botResponse}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
