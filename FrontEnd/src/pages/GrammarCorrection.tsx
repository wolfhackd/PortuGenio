import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

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

  async function handleCorrectionSubmit({
    textForCorrection,
  }: CorrectionFormData) {
    // Falta terminar
    // await sendCorrectionRequest({ textForCorrection });
    correctionForm.reset();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-6">
      <Card className="w-4/5 flex-1">
        <CardHeader>
          <CardTitle className="text-center text-4xl">
            Correção de frases/textos
          </CardTitle>
        </CardHeader>
        <CardContent>
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
