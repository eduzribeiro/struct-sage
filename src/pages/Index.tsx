import { useState, useRef } from 'react';
import { BudgetFormData, CalculatedBudget } from '@/types/budget';
import { calculateBudget } from '@/utils/budgetCalculations';
import { BudgetForm } from '@/components/BudgetForm';
import { BudgetPreview } from '@/components/BudgetPreview';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Eye, Download, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const initialFormData: BudgetFormData = {
  obraName: '',
  obraLocal: '',
  clienteName: '',
  clienteEmail: '',
  escopoServico: '',
  areaConstruida: null,
  numElementosEstruturais: null,
  areaContencao: null,
  tipoFundacao: [],
  tipoEstrutura: [],
  tipoContencao: [],
  nivelComplexidade: '01',
  pavimentosTipo: false,
  visitaTecnica: false,
  horasVisita: 0,
};

const Index = () => {
  const [formData, setFormData] = useState<BudgetFormData>(initialFormData);
  const [budget, setBudget] = useState<CalculatedBudget>(() => calculateBudget(initialFormData));
  const [activeTab, setActiveTab] = useState('form');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleFormChange = (newData: BudgetFormData) => {
    setFormData(newData);
    setBudget(calculateBudget(newData));
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setBudget(calculateBudget(initialFormData));
    toast.success('Formulário limpo com sucesso!');
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('budget-pdf');
    if (!element) {
      toast.error('Nenhum orçamento para exportar');
      return;
    }

    toast.loading('Gerando PDF...');

    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt = {
        margin: 0,
        filename: `Orcamento_${formData.clienteName || 'Cliente'}_${formData.obraName || 'Obra'}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const },
      };

      await html2pdf().set(opt).from(element).save();
      
      toast.dismiss();
      toast.success('PDF exportado com sucesso!');
    } catch (error) {
      toast.dismiss();
      toast.error('Erro ao gerar PDF. Tente novamente.');
      console.error(error);
    }
  };

  const missingFields = [];
  if (!formData.obraName) missingFields.push('Nome da obra');
  if (!formData.clienteName) missingFields.push('Nome do cliente');
  if (!formData.escopoServico) missingFields.push('Escopo do serviço');
  if (formData.tipoFundacao.length === 0 && formData.tipoEstrutura.length === 0 && formData.tipoContencao.length === 0) {
    missingFields.push('Pelo menos um tipo de serviço');
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Form Side */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Dados do Orçamento
              </h2>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Limpar
              </Button>
            </div>
            <BudgetForm formData={formData} onChange={handleFormChange} />
          </div>

          {/* Preview Side */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-heading text-foreground flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Pré-visualização
              </h2>
              <Button 
                onClick={handleExportPDF}
                disabled={budget.subtotal === 0}
                className="shadow-button"
              >
                <Download className="h-4 w-4 mr-2" />
                Exportar PDF
              </Button>
            </div>
            
            <div className="sticky top-4">
              <div ref={previewRef} className="max-h-[calc(100vh-180px)] overflow-auto rounded-xl shadow-elevated">
                <BudgetPreview formData={formData} budget={budget} />
              </div>
              
              {/* Missing Fields Warning */}
              {missingFields.length > 0 && (
                <div className="mt-4 p-4 bg-accent border border-primary/20 rounded-lg">
                  <p className="text-sm font-medium text-accent-foreground mb-2">
                    ⚠️ Campos pendentes para o orçamento:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    {missingFields.map((field, i) => (
                      <li key={i}>{field}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="form" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Formulário
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Visualizar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form" className="space-y-4">
              <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={handleReset}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Limpar
                </Button>
              </div>
              <BudgetForm formData={formData} onChange={handleFormChange} />
            </TabsContent>

            <TabsContent value="preview" className="space-y-4">
              <div className="flex justify-end">
                <Button 
                  onClick={handleExportPDF}
                  disabled={budget.subtotal === 0}
                  className="shadow-button"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar PDF
                </Button>
              </div>
              
              <BudgetPreview formData={formData} budget={budget} />
              
              {missingFields.length > 0 && (
                <div className="p-4 bg-accent border border-primary/20 rounded-lg">
                  <p className="text-sm font-medium text-accent-foreground mb-2">
                    ⚠️ Campos pendentes:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc list-inside">
                    {missingFields.map((field, i) => (
                      <li key={i}>{field}</li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">
            EngBudget AI – Sistema de Orçamentação para Engenharia Estrutural
          </p>
          <p className="text-xs opacity-60 mt-1">
            Desenvolvido para profissionais de engenharia civil e infraestrutura
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
