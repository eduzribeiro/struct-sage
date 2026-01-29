import { BudgetFormData, CalculatedBudget, CompanyInfo, DEFAULT_COMPANY_INFO, FUNDACAO_OPTIONS, ESTRUTURA_OPTIONS, CONTENCAO_OPTIONS } from '@/types/budget';
import { formatCurrency, estimateDeadline, formatDate } from '@/utils/budgetCalculations';
import { Globe, Instagram, Phone, Mail } from 'lucide-react';

interface BudgetPreviewProps {
  formData: BudgetFormData;
  budget: CalculatedBudget;
  companyInfo?: CompanyInfo;
}

export function BudgetPreview({
  formData,
  budget,
  companyInfo = DEFAULT_COMPANY_INFO
}: BudgetPreviewProps) {
  const prazo = estimateDeadline(formData);
  const dataAtual = formatDate();
  
  const getFundacaoLabels = () => formData.tipoFundacao.map(v => FUNDACAO_OPTIONS.find(o => o.value === v)?.label).filter(Boolean);
  const getEstruturaLabels = () => formData.tipoEstrutura.map(v => ESTRUTURA_OPTIONS.find(o => o.value === v)?.label).filter(Boolean);
  const getContencaoLabels = () => formData.tipoContencao.map(v => CONTENCAO_OPTIONS.find(o => o.value === v)?.label).filter(Boolean);

  const hasContent = budget.subtotal > 0 || formData.obraName || formData.clienteName;

  if (!hasContent) {
    return (
      <div className="bg-white min-h-[600px] flex items-center justify-center p-8" style={{ fontFamily: "'Open Sans', sans-serif" }}>
        <div className="text-center" style={{ color: '#6b7280' }}>
          <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f3f4f6' }}>
            <span className="text-4xl">📋</span>
          </div>
          <p className="text-lg font-medium">Preencha o formulário</p>
          <p className="text-sm">A visualização do orçamento aparecerá aqui</p>
        </div>
      </div>
    );
  }

  return (
    <div id="budget-pdf" style={{ fontFamily: "'Open Sans', sans-serif", backgroundColor: 'white', color: '#374151' }}>
      
      {/* Header - Diagonal gray with logo */}
      <div style={{ position: 'relative', height: '140px', overflow: 'hidden' }}>
        {/* Gray diagonal background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#d1d5db',
          clipPath: 'polygon(0 0, 60% 0, 45% 100%, 0 100%)'
        }} />
        
        {/* PROPOSTA COMERCIAL text */}
        <div style={{ position: 'absolute', top: '30px', left: '40px', color: '#1f2937' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: "'Montserrat', sans-serif", margin: 0, lineHeight: 1.1 }}>
            PROPOSTA
          </h1>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', fontFamily: "'Montserrat', sans-serif", margin: 0, lineHeight: 1.1 }}>
            COMERCIAL
          </h2>
        </div>

        {/* Logo on the right */}
        <div style={{ position: 'absolute', top: '20px', right: '40px' }}>
          <img 
            src="/lovable-uploads/8f2a2089-73cb-4c6f-a486-4af882a94bf5.png" 
            alt="Gama Cálculo Estrutural" 
            style={{ height: '80px', width: 'auto' }}
          />
        </div>
      </div>

      {/* Client Info Section */}
      <div style={{ padding: '0 40px', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: '#f97316', fontWeight: 600, fontSize: '14px', margin: 0 }}>Cliente:</p>
            <p style={{ color: '#374151', fontWeight: 500, fontSize: '14px', margin: '4px 0 0 0' }}>{formData.clienteName || '—'}</p>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: '2px 0 0 0' }}>{formData.clienteEmail || ''}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#f97316', fontWeight: 600, fontSize: '14px', margin: 0 }}>Local/Data:</p>
            <p style={{ color: '#374151', fontWeight: 500, fontSize: '14px', margin: '4px 0 0 0' }}>{formData.obraLocal || '—'}</p>
            <p style={{ color: '#6b7280', fontSize: '13px', margin: '2px 0 0 0' }}>{dataAtual}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '30px 40px' }}>
        
        {/* ESCOPO DO SERVIÇO */}
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#374151', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0', textTransform: 'uppercase' }}>
            ESCOPO DO SERVIÇO:
          </h3>
          <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
            {formData.escopoServico || `A presente proposta tem por objeto a elaboração dos projetos de infraestrutura e superestrutura referentes à obra ${formData.obraName || '[Nome da Obra]'}, localizada em ${formData.obraLocal || '[Local]'}.`}
          </p>
        </section>

        {/* Infraestrutura */}
        {formData.tipoFundacao.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#f97316', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0' }}>
              Infraestrutura:
            </h3>
            <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
              O projeto contemplará as fundações dimensionadas conforme as características geotécnicas obtidas no laudo de sondagem. 
              Tipos de fundação previstos: {getFundacaoLabels().join('; ')}.
              A definição do tipo de fundação será estabelecida em função da capacidade de carga do solo e das solicitações estruturais, 
              assegurando desempenho, segurança e durabilidade da obra.
            </p>
          </section>
        )}

        {/* Superestrutura */}
        {formData.tipoEstrutura.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#f97316', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0' }}>
              Superestrutura:
            </h3>
            <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
              O projeto estrutural será desenvolvido seguindo rigorosamente os trâmites de compatibilização com os projetos de 
              instalações de engenharia e o projeto arquitetônico. Tipos de estrutura previstos: {getEstruturaLabels().join('; ')}.
              {formData.areaConstruida && ` Área total: ${formData.areaConstruida} m².`}
              {formData.pavimentosTipo && ' Projeto conta com pavimentos tipo, aplicando-se redução de 15% conforme premissas.'}
            </p>
          </section>
        )}

        {/* Contenções */}
        {formData.tipoContencao.length > 0 && (
          <section style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#f97316', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0' }}>
              Contenções:
            </h3>
            <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
              O projeto contemplará contenções do tipo: {getContencaoLabels().join('; ')}.
              {formData.areaContencao && ` Área de contenção: ${formData.areaContencao} m².`}
            </p>
          </section>
        )}

        {/* Compatibilização de Projetos */}
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#f97316', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0' }}>
            Compatibilização de Projetos:
          </h3>
          <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
            O projeto estrutural será desenvolvido seguindo rigorosamente os trâmites de compatibilização com os projetos de 
            instalações de engenharia e o projeto arquitetônico, assegurando alinhamento entre as disciplinas, evitando conflitos e 
            garantindo maior eficiência na execução da obra.
          </p>
        </section>

        {/* Normas Técnicas Aplicáveis */}
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#f97316', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0' }}>
            Normas Técnicas Aplicáveis:
          </h3>
          <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: '0 0 8px 0', textAlign: 'justify' }}>
            Os serviços de dimensionamento estrutural serão realizados em conformidade com as normas da Associação Brasileira de Normas Técnicas (ABNT), destacando-se:
          </p>
          <ul style={{ color: '#374151', fontSize: '13px', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
            <li>NBR 6118:2014 – Projeto de Estruturas de Concreto – Procedimento;</li>
            <li>NBR 6122:2019 – Projeto e Execução de Fundações;</li>
            <li>NBR 8800:2008 – Projeto de Estruturas de Aço e de Estruturas Mistas de Aço e Concreto de Edifícios;</li>
            <li>NBR 9062:2017 – Projeto e Execução de Estruturas Pré-moldadas de Concreto;</li>
            <li>NBR 14762:2010 – Dimensionamento de Estruturas de Aço Constituídas por Perfis Formados a Frio;</li>
            <li>Demais normas correlatas que se fizerem necessárias.</li>
          </ul>
        </section>

        {/* Metodologia */}
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#f97316', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0' }}>
            Metodologia:
          </h3>
          <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
            Reforçamos que nossa empresa adota integralmente a metodologia BIM (Building Information Modeling) em seus projetos, 
            proporcionando maior precisão, integração entre disciplinas, otimização de processos e redução de riscos durante a execução da obra.
          </p>
        </section>

        {/* Prazos e etapas */}
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#f97316', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0' }}>
            Prazos e etapas:
          </h3>
          <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: '0 0 12px 0', textAlign: 'justify' }}>
            O prazo de execução dos serviços propostos é de <strong>{prazo}</strong>, contados a partir da entrega de todas as informações 
            necessárias para o início do projeto, incluindo dados geotécnicos, arquitetônicos e das instalações de engenharia.
          </p>
          <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: '0 0 12px 0', textAlign: 'justify' }}>
            O desenvolvimento do projeto será estruturado de forma a garantir a qualidade técnica, a compatibilização entre disciplinas e a eficiência na execução.
          </p>
          <p style={{ color: '#374151', fontSize: '13px', fontWeight: 500, margin: '0 0 8px 0' }}>
            As etapas do projeto incluem:
          </p>
          <ul style={{ color: '#374151', fontSize: '13px', lineHeight: 1.8, margin: 0, paddingLeft: '20px' }}>
            <li>Reunião de alinhamento: validação dos métodos construtivos e premissas técnicas;</li>
            <li>Pré-projeto: lançamentos preliminares dos elementos estruturais, visando compatibilização com arquitetura e instalações;</li>
            <li>Projeto executivo: detalhamento completo de todos os elementos estruturais, incluindo dimensões, materiais e especificações técnicas, em conformidade com as normas ABNT aplicáveis.</li>
            <li>Emissão de documentação final: pranchas em formato DWG, PDF e arquivo IFC, bem como ART de responsabilidade técnica pela elaboração do projeto.</li>
            {formData.visitaTecnica && <li>Visita técnica ({formData.horasVisita}h) – custos de deslocamento, hospedagem e alimentação sob responsabilidade da contratante.</li>}
          </ul>
        </section>

        {/* Valores */}
        <section style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#f97316', fontSize: '15px', fontWeight: 600, margin: '0 0 12px 0' }}>
            Valores:
          </h3>
          <div style={{ maxWidth: '500px' }}>
            {budget.infraestruturaFundacoes && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#374151', fontSize: '13px' }}>Projeto de infraestrutura - Fundações</span>
                <span style={{ color: '#374151', fontSize: '13px' }}>{formatCurrency(budget.infraestruturaFundacoes.valor)}</span>
              </div>
            )}
            {budget.infraestruturaContencoes && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#374151', fontSize: '13px' }}>Projeto de infraestrutura - Contenções</span>
                <span style={{ color: '#374151', fontSize: '13px' }}>{formatCurrency(budget.infraestruturaContencoes.valor)}</span>
              </div>
            )}
            {budget.superestrutura && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#374151', fontSize: '13px' }}>Projeto de superestrutura - Estruturas</span>
                <span style={{ color: '#374151', fontSize: '13px' }}>{formatCurrency(budget.superestrutura.valor)}</span>
              </div>
            )}
            {budget.visitaTecnica && (
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e5e7eb' }}>
                <span style={{ color: '#374151', fontSize: '13px' }}>Visita técnica</span>
                <span style={{ color: '#374151', fontSize: '13px' }}>{formatCurrency(budget.visitaTecnica.valor)}</span>
              </div>
            )}
            
            {/* Total row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '2px solid #374151' }}>
              <span style={{ color: '#374151', fontSize: '14px', fontWeight: 600 }}>Total:</span>
              <span style={{ color: '#374151', fontSize: '18px', fontWeight: 700 }}>{formatCurrency(budget.total)}</span>
            </div>
            
            {/* Discount row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
              <span style={{ color: '#374151', fontSize: '13px' }}>Desconto de 7% para pagamento à vista</span>
              <span style={{ 
                color: '#f97316', 
                fontSize: '22px', 
                fontWeight: 700,
                border: '2px solid #f97316',
                padding: '4px 12px',
                borderRadius: '4px'
              }}>
                {formatCurrency(budget.totalAVista)}
              </span>
            </div>
          </div>
        </section>

        {/* Pagamento */}
        <section style={{ marginBottom: '40px' }}>
          <h3 style={{ color: '#f97316', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0' }}>
            Pagamento:
          </h3>
          <p style={{ color: '#374151', fontSize: '13px', lineHeight: 1.7, margin: 0, textAlign: 'justify' }}>
            Uma entrada de 15%, com o saldo de 85% podendo ser quitado na entrega do projeto ou de acordo com o cronograma de 
            faturamento do contratante, proporcionando flexibilidade e conveniência para a sua empresa.
          </p>
          <p style={{ color: '#374151', fontSize: '13px', marginTop: '24px', textAlign: 'right' }}>
            Este orçamento tem validade de 15 dias.
          </p>
        </section>

        {/* Signature Section */}
        <section style={{ borderTop: '3px solid #f97316', paddingTop: '20px', marginBottom: '24px' }}>
          <h4 style={{ color: '#374151', fontSize: '16px', fontWeight: 600, margin: '0 0 8px 0' }}>
            Diretor de operações
          </h4>
          <p style={{ color: '#374151', fontSize: '13px', margin: '0 0 4px 0' }}>
            {companyInfo.director} | Engenheiro civil | {companyInfo.crea}
          </p>
          <p style={{ color: '#6b7280', fontSize: '12px', margin: 0 }}>
            Especialista em Engenharia de Estruturas e Fundações
          </p>
        </section>

        {/* Logo and tagline */}
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '20px' }}>
          <img 
            src="/lovable-uploads/8f2a2089-73cb-4c6f-a486-4af882a94bf5.png" 
            alt="Gama Cálculo Estrutural" 
            style={{ height: '80px', width: 'auto', marginBottom: '16px' }}
          />
          <p style={{ color: '#f97316', fontSize: '16px', fontWeight: 600, margin: 0 }}>
            Segurança estrutural começa com um projeto confiável. Fale conosco.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        backgroundColor: '#f3f4f6', 
        borderTop: '4px solid #d1d5db',
        padding: '12px 40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563', fontSize: '12px' }}>
          <Globe style={{ width: '14px', height: '14px' }} />
          {companyInfo.website}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563', fontSize: '12px' }}>
          <Instagram style={{ width: '14px', height: '14px' }} />
          {companyInfo.instagram}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563', fontSize: '12px' }}>
          <Phone style={{ width: '14px', height: '14px' }} />
          {companyInfo.phone}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4b5563', fontSize: '12px' }}>
          <Mail style={{ width: '14px', height: '14px' }} />
          {companyInfo.email}
        </span>
      </div>
    </div>
  );
}
