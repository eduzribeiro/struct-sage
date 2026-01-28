import { BudgetFormData, CalculatedBudget, CompanyInfo, DEFAULT_COMPANY_INFO, FUNDACAO_OPTIONS, ESTRUTURA_OPTIONS, CONTENCAO_OPTIONS } from '@/types/budget';
import { formatCurrency, estimateDeadline, formatDate } from '@/utils/budgetCalculations';
import { Globe, Instagram, Phone, Mail } from 'lucide-react';
import gamaLogo from '@/assets/gama-logo.png';
interface BudgetPreviewProps {
  formData: BudgetFormData;
  budget: CalculatedBudget;
  companyInfo?: CompanyInfo;
}

export function BudgetPreview({ formData, budget, companyInfo = DEFAULT_COMPANY_INFO }: BudgetPreviewProps) {
  const prazo = estimateDeadline(formData);
  const dataAtual = formatDate();

  const getFundacaoLabels = () => formData.tipoFundacao.map(v => FUNDACAO_OPTIONS.find(o => o.value === v)?.label).filter(Boolean);
  const getEstruturaLabels = () => formData.tipoEstrutura.map(v => ESTRUTURA_OPTIONS.find(o => o.value === v)?.label).filter(Boolean);
  const getContencaoLabels = () => formData.tipoContencao.map(v => CONTENCAO_OPTIONS.find(o => o.value === v)?.label).filter(Boolean);

  const hasContent = budget.subtotal > 0 || formData.obraName || formData.clienteName;

  if (!hasContent) {
    return (
      <div className="pdf-preview min-h-[600px] flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl">📋</span>
          </div>
          <p className="text-lg font-medium">Preencha o formulário</p>
          <p className="text-sm">A visualização do orçamento aparecerá aqui</p>
        </div>
      </div>
    );
  }

  return (
    <div id="budget-pdf" className="pdf-preview" style={{ fontFamily: "'Open Sans', sans-serif", backgroundColor: 'white', color: '#1f2937' }}>
      {/* Header */}
      <div className="pdf-header px-8 pt-8 pb-16">
        <div className="flex justify-between items-start">
          <div style={{ color: 'white' }}>
            <h1 className="text-3xl font-bold mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>PROPOSTA</h1>
            <h2 className="text-2xl font-bold" style={{ fontFamily: "'Montserrat', sans-serif" }}>COMERCIAL</h2>
          </div>
          <div className="text-right">
            <img 
              src={gamaLogo} 
              alt="Gama Cálculo Estrutural" 
              className="h-16 w-auto object-contain bg-white rounded-lg px-3 py-2"
              style={{ marginLeft: 'auto' }}
            />
          </div>
        </div>
      </div>

      {/* Client Info */}
      <div className="px-8 -mt-6 mb-8">
        <div className="rounded-lg shadow-md p-6 grid grid-cols-2 gap-6" style={{ backgroundColor: 'white' }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: 'hsl(28, 95%, 53%)' }}>Cliente:</p>
            <p className="font-medium" style={{ color: '#1f2937' }}>{formData.clienteName || '—'}</p>
            <p className="text-sm" style={{ color: '#6b7280' }}>{formData.clienteEmail || ''}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold" style={{ color: 'hsl(28, 95%, 53%)' }}>Local/Data:</p>
            <p className="font-medium" style={{ color: '#1f2937' }}>{formData.obraLocal || '—'}</p>
            <p className="text-sm" style={{ color: '#6b7280' }}>{dataAtual}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 pb-8 space-y-6">
        {/* Escopo do Serviço */}
        <section>
          <h3 className="pdf-section-title">ESCOPO DO SERVIÇO:</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            {formData.escopoServico || `A presente proposta tem por objeto a elaboração dos projetos de infraestrutura e superestrutura referentes à obra ${formData.obraName || '[Nome da Obra]'}, localizada em ${formData.obraLocal || '[Local]'}.`}
          </p>
        </section>

        {/* Infraestrutura - Fundações */}
        {formData.tipoFundacao.length > 0 && (
          <section>
            <h3 className="pdf-section-title">Infraestrutura:</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
              O projeto contemplará as fundações dimensionadas conforme as características geotécnicas obtidas no laudo de sondagem. 
              Tipos de fundação previstos: {getFundacaoLabels().join('; ')}.
              A definição do tipo de fundação será estabelecida em função da capacidade de carga do solo e das solicitações estruturais, 
              assegurando desempenho, segurança e durabilidade da obra.
            </p>
          </section>
        )}

        {/* Superestrutura */}
        {formData.tipoEstrutura.length > 0 && (
          <section>
            <h3 className="pdf-section-title">Superestrutura:</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
              O projeto estrutural será desenvolvido seguindo rigorosamente os trâmites de compatibilização com os projetos de 
              instalações de engenharia e o projeto arquitetônico. Tipos de estrutura previstos: {getEstruturaLabels().join('; ')}.
              {formData.areaConstruida && ` Área total: ${formData.areaConstruida} m².`}
              {formData.pavimentosTipo && ' Projeto conta com pavimentos tipo, aplicando-se redução de 15% conforme premissas.'}
            </p>
          </section>
        )}

        {/* Contenções */}
        {formData.tipoContencao.length > 0 && (
          <section>
            <h3 className="pdf-section-title">Contenções:</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
              O projeto contemplará contenções do tipo: {getContencaoLabels().join('; ')}.
              {formData.areaContencao && ` Área de contenção: ${formData.areaContencao} m².`}
            </p>
          </section>
        )}

        {/* Normas Técnicas */}
        <section>
          <h3 className="pdf-section-title">Normas Técnicas Aplicáveis:</h3>
          <p className="text-sm mb-2" style={{ color: '#374151' }}>
            Os serviços de dimensionamento estrutural serão realizados em conformidade com as normas da Associação Brasileira de Normas Técnicas (ABNT), destacando-se:
          </p>
          <ul className="text-sm list-disc list-inside space-y-1" style={{ color: '#374151' }}>
            <li>NBR 6118:2014 – Projeto de Estruturas de Concreto – Procedimento;</li>
            <li>NBR 6122:2019 – Projeto e Execução de Fundações;</li>
            <li>NBR 8800:2008 – Projeto de Estruturas de Aço e de Estruturas Mistas de Aço e Concreto;</li>
            <li>NBR 15961:2011 – Alvenaria Estrutural – Blocos de Concreto;</li>
            <li>Demais normas correlatas que se fizerem necessárias.</li>
          </ul>
        </section>

        {/* Metodologia */}
        <section>
          <h3 className="pdf-section-title">Metodologia:</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            Reforçamos que nossa empresa adota integralmente a metodologia BIM (Building Information Modeling) em seus projetos, 
            proporcionando maior precisão, integração entre disciplinas, otimização de processos e redução de riscos durante a execução da obra.
          </p>
        </section>

        {/* Entregáveis */}
        <section>
          <h3 className="pdf-section-title">Entregáveis:</h3>
          <ul className="text-sm list-disc list-inside space-y-1" style={{ color: '#374151' }}>
            <li>Projeto executivo em PDF, DWG e IFC, desenvolvido em metodologia BIM</li>
            <li>Lista de materiais aplicáveis ao projeto</li>
            <li>ART de projeto</li>
            {formData.visitaTecnica && (
              <li>Visita técnica ({formData.horasVisita}h) – custos de deslocamento, hospedagem e alimentação sob responsabilidade da contratante</li>
            )}
          </ul>
        </section>

        {/* Prazo */}
        <section>
          <h3 className="pdf-section-title">Prazo de Entrega:</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            O prazo de execução dos serviços propostos é de <strong>{prazo}</strong>, contados a partir da entrega de todas as informações 
            necessárias para o início do projeto, incluindo dados geotécnicos, arquitetônicos e das instalações de engenharia.
          </p>
        </section>

        {/* Valores */}
        <section>
          <h3 className="pdf-section-title">Valores:</h3>
          <div className="rounded-lg overflow-hidden" style={{ border: '1px solid #e5e7eb' }}>
            <table className="w-full text-sm">
              <tbody>
                {budget.infraestruturaFundacoes && (
                  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td className="py-3 px-4" style={{ color: '#374151' }}>{budget.infraestruturaFundacoes.descricao}</td>
                    <td className="py-3 px-4 text-right font-medium" style={{ color: '#374151' }}>{formatCurrency(budget.infraestruturaFundacoes.valor)}</td>
                  </tr>
                )}
                {budget.infraestruturaContencoes && (
                  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td className="py-3 px-4" style={{ color: '#374151' }}>{budget.infraestruturaContencoes.descricao}</td>
                    <td className="py-3 px-4 text-right font-medium" style={{ color: '#374151' }}>{formatCurrency(budget.infraestruturaContencoes.valor)}</td>
                  </tr>
                )}
                {budget.superestrutura && (
                  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td className="py-3 px-4" style={{ color: '#374151' }}>
                      {budget.superestrutura.descricao}
                      {budget.superestrutura.descontoPavimentoTipo && budget.superestrutura.descontoPavimentoTipo > 0 && (
                        <span className="text-xs block" style={{ color: '#16a34a' }}>
                          (inclui desconto de 15% por pavimentos tipo)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-medium" style={{ color: '#374151' }}>{formatCurrency(budget.superestrutura.valor)}</td>
                  </tr>
                )}
                {budget.visitaTecnica && (
                  <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td className="py-3 px-4" style={{ color: '#374151' }}>{budget.visitaTecnica.descricao}</td>
                    <td className="py-3 px-4 text-right font-medium" style={{ color: '#374151' }}>{formatCurrency(budget.visitaTecnica.valor)}</td>
                  </tr>
                )}
                <tr style={{ backgroundColor: '#1f2937', color: 'white' }}>
                  <td className="py-3 px-4 font-bold">Total:</td>
                  <td className="py-3 px-4 text-right font-bold">{formatCurrency(budget.total)}</td>
                </tr>
                <tr style={{ backgroundColor: '#fff7ed' }}>
                  <td className="py-3 px-4 font-medium" style={{ color: '#c2410c' }}>Desconto de 7% para pagamento à vista:</td>
                  <td className="py-3 px-4 text-right font-bold" style={{ color: '#c2410c' }}>{formatCurrency(budget.totalAVista)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pagamento */}
        <section>
          <h3 className="pdf-section-title">Condições de Pagamento:</h3>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            Uma entrada de <strong>15% ({formatCurrency(budget.entrada)})</strong>, com o saldo de <strong>85% ({formatCurrency(budget.saldo)})</strong> podendo 
            ser quitado na entrega do projeto ou de acordo com o cronograma de faturamento da contratante, proporcionando flexibilidade e conveniência para a sua empresa.
          </p>
          <p className="text-sm mt-2 italic" style={{ color: '#6b7280' }}>
            Este orçamento tem validade de 15 dias.
          </p>
        </section>

        {/* Assinatura */}
        <section className="pt-6" style={{ borderTop: '1px solid #e5e7eb' }}>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-sm font-bold" style={{ color: '#1f2937' }}>{companyInfo.director}</p>
              <p className="text-sm" style={{ color: '#4b5563' }}>{companyInfo.directorTitle}</p>
              <p className="text-sm" style={{ color: '#4b5563' }}>{companyInfo.crea}</p>
              <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Especialista em Engenharia de Estruturas e Fundações</p>
            </div>
            <div className="text-right">
              <img 
                src={gamaLogo} 
                alt="Gama Cálculo Estrutural" 
                className="h-12 w-auto object-contain ml-auto"
              />
              <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Segurança estrutural começa com um projeto confiável.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="px-8 py-4" style={{ backgroundColor: '#f3f4f6', borderTop: '1px solid #e5e7eb' }}>
        <div className="flex items-center justify-center gap-6 text-xs" style={{ color: '#4b5563' }}>
          <span className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            {companyInfo.website}
          </span>
          <span className="flex items-center gap-1">
            <Instagram className="h-3 w-3" />
            {companyInfo.instagram}
          </span>
          <span className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {companyInfo.phone}
          </span>
          <span className="flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {companyInfo.email}
          </span>
        </div>
      </div>
    </div>
  );
}
