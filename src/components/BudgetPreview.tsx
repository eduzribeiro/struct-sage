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
    <div 
      id="budget-pdf" 
      style={{ 
        fontFamily: "'Open Sans', sans-serif", 
        backgroundColor: 'white', 
        color: '#1f2937',
        pageBreakInside: 'avoid',
        breakInside: 'avoid'
      }}
    >
      
      {/* Header - Diagonal gray with logo - Fundo cinza diagonal esquerdo */}
      <div style={{ 
        position: 'relative', 
        height: '120px', 
        overflow: 'hidden',
        backgroundColor: 'white'
      }}>
        {/* Gray diagonal background - seguindo o padrão do modelo */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '55%',
          height: '100%',
          backgroundColor: '#e5e5e5',
          clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)'
        }} />
        
        {/* PROPOSTA COMERCIAL text */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '32px',
          transform: 'translateY(-50%)',
          zIndex: 1
        }}>
          <h1 style={{ 
            fontSize: '22px', 
            fontWeight: 700, 
            fontFamily: "'Montserrat', 'Arial Black', sans-serif", 
            margin: 0, 
            lineHeight: 1.1,
            color: '#1a1a1a',
            letterSpacing: '1px'
          }}>
            PROPOSTA
          </h1>
          <h2 style={{ 
            fontSize: '22px', 
            fontWeight: 700, 
            fontFamily: "'Montserrat', 'Arial Black', sans-serif", 
            margin: 0, 
            lineHeight: 1.1,
            color: '#1a1a1a',
            letterSpacing: '1px'
          }}>
            COMERCIAL
          </h2>
        </div>

        {/* Logo on the right - posicionado no canto direito */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          right: '32px',
          transform: 'translateY(-50%)'
        }}>
          <img 
            src="/lovable-uploads/8f2a2089-73cb-4c6f-a486-4af882a94bf5.png" 
            alt="Gama Cálculo Estrutural" 
            style={{ height: '70px', width: 'auto' }}
          />
        </div>
      </div>

      {/* Client Info Section - informações do cliente e local/data */}
      <div style={{ 
        padding: '16px 32px', 
        display: 'flex', 
        justifyContent: 'space-between',
        borderBottom: '1px solid #e5e5e5'
      }}>
        <div>
          <p style={{ 
            color: '#f97316', 
            fontWeight: 700, 
            fontSize: '13px', 
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>Cliente:</p>
          <p style={{ 
            color: '#1f2937', 
            fontWeight: 500, 
            fontSize: '13px', 
            margin: '2px 0 0 0' 
          }}>{formData.clienteName || '—'}</p>
          {formData.clienteEmail && (
            <p style={{ 
              color: '#6b7280', 
              fontSize: '12px', 
              margin: '1px 0 0 0' 
            }}>{formData.clienteEmail}</p>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ 
            color: '#f97316', 
            fontWeight: 700, 
            fontSize: '13px', 
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>Local/Data:</p>
          <p style={{ 
            color: '#1f2937', 
            fontWeight: 500, 
            fontSize: '13px', 
            margin: '2px 0 0 0' 
          }}>{formData.obraLocal || '—'}</p>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '12px', 
            margin: '1px 0 0 0' 
          }}>{dataAtual}</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 32px' }}>
        
        {/* ESCOPO DO SERVIÇO */}
        <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
          <h3 style={{ 
            color: '#1f2937', 
            fontSize: '12px', 
            fontWeight: 700, 
            margin: '0 0 6px 0', 
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            ESCOPO DO SERVIÇO:
          </h3>
          <p style={{ 
            color: '#374151', 
            fontSize: '11px', 
            lineHeight: 1.6, 
            margin: 0, 
            textAlign: 'justify' 
          }}>
            {formData.escopoServico || `A presente proposta tem por objeto a elaboração dos projetos de infraestrutura e superestrutura referentes à obra ${formData.obraName || '[Nome da Obra]'}, localizada em ${formData.obraLocal || '[Local]'}.`}
          </p>
        </section>

        {/* Infraestrutura */}
        {formData.tipoFundacao.length > 0 && (
          <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
            <h3 style={{ 
              color: '#f97316', 
              fontSize: '12px', 
              fontWeight: 700, 
              margin: '0 0 6px 0' 
            }}>
              Infraestrutura:
            </h3>
            <p style={{ 
              color: '#374151', 
              fontSize: '11px', 
              lineHeight: 1.6, 
              margin: 0, 
              textAlign: 'justify' 
            }}>
              O projeto contemplará as fundações dimensionadas conforme as características geotécnicas obtidas no laudo de sondagem. 
              Tipos de fundação previstos: {getFundacaoLabels().join('; ')}.
              A definição do tipo de fundação será estabelecida em função da capacidade de carga do solo e das solicitações estruturais, 
              assegurando desempenho, segurança e durabilidade da obra.
            </p>
          </section>
        )}

        {/* Superestrutura */}
        {formData.tipoEstrutura.length > 0 && (
          <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
            <h3 style={{ 
              color: '#f97316', 
              fontSize: '12px', 
              fontWeight: 700, 
              margin: '0 0 6px 0' 
            }}>
              Superestrutura:
            </h3>
            <p style={{ 
              color: '#374151', 
              fontSize: '11px', 
              lineHeight: 1.6, 
              margin: 0, 
              textAlign: 'justify' 
            }}>
              O projeto estrutural será desenvolvido seguindo rigorosamente os trâmites de compatibilização com os projetos de 
              instalações de engenharia e o projeto arquitetônico. Tipos de estrutura previstos: {getEstruturaLabels().join('; ')}.
              {formData.areaConstruida && ` Área total: ${formData.areaConstruida} m².`}
              {formData.pavimentosTipo && ' Projeto conta com pavimentos tipo, aplicando-se redução de 15% conforme premissas.'}
            </p>
          </section>
        )}

        {/* Contenções */}
        {formData.tipoContencao.length > 0 && (
          <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
            <h3 style={{ 
              color: '#f97316', 
              fontSize: '12px', 
              fontWeight: 700, 
              margin: '0 0 6px 0' 
            }}>
              Contenções:
            </h3>
            <p style={{ 
              color: '#374151', 
              fontSize: '11px', 
              lineHeight: 1.6, 
              margin: 0, 
              textAlign: 'justify' 
            }}>
              O projeto contemplará contenções do tipo: {getContencaoLabels().join('; ')}.
              {formData.areaContencao && ` Área de contenção: ${formData.areaContencao} m².`}
            </p>
          </section>
        )}

        {/* Compatibilização de Projetos */}
        <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
          <h3 style={{ 
            color: '#f97316', 
            fontSize: '12px', 
            fontWeight: 700, 
            margin: '0 0 6px 0' 
          }}>
            Compatibilização de Projetos:
          </h3>
          <p style={{ 
            color: '#374151', 
            fontSize: '11px', 
            lineHeight: 1.6, 
            margin: 0, 
            textAlign: 'justify' 
          }}>
            O projeto estrutural será desenvolvido seguindo rigorosamente os trâmites de compatibilização com os projetos de 
            instalações de engenharia e o projeto arquitetônico, assegurando alinhamento entre as disciplinas, evitando conflitos e 
            garantindo maior eficiência na execução da obra.
          </p>
        </section>

        {/* Normas Técnicas Aplicáveis */}
        <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
          <h3 style={{ 
            color: '#f97316', 
            fontSize: '12px', 
            fontWeight: 700, 
            margin: '0 0 6px 0' 
          }}>
            Normas Técnicas Aplicáveis:
          </h3>
          <p style={{ 
            color: '#374151', 
            fontSize: '11px', 
            lineHeight: 1.5, 
            margin: '0 0 6px 0', 
            textAlign: 'justify' 
          }}>
            Os serviços de dimensionamento estrutural serão realizados em conformidade com as normas da Associação Brasileira de Normas Técnicas (ABNT), destacando-se:
          </p>
          <ul style={{ 
            color: '#374151', 
            fontSize: '10px', 
            lineHeight: 1.5, 
            margin: 0, 
            paddingLeft: '16px' 
          }}>
            <li>NBR 6118:2014 – Projeto de Estruturas de Concreto – Procedimento;</li>
            <li>NBR 6122:2019 – Projeto e Execução de Fundações;</li>
            <li>NBR 8800:2008 – Projeto de Estruturas de Aço e de Estruturas Mistas de Aço e Concreto de Edifícios;</li>
            <li>NBR 9062:2017 – Projeto e Execução de Estruturas Pré-moldadas de Concreto;</li>
            <li>NBR 14762:2010 – Dimensionamento de Estruturas de Aço Constituídas por Perfis Formados a Frio;</li>
            <li>Demais normas correlatas que se fizerem necessárias.</li>
          </ul>
        </section>

        {/* Metodologia */}
        <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
          <h3 style={{ 
            color: '#f97316', 
            fontSize: '12px', 
            fontWeight: 700, 
            margin: '0 0 6px 0' 
          }}>
            Metodologia:
          </h3>
          <p style={{ 
            color: '#374151', 
            fontSize: '11px', 
            lineHeight: 1.6, 
            margin: 0, 
            textAlign: 'justify' 
          }}>
            Reforçamos que nossa empresa adota integralmente a metodologia BIM (Building Information Modeling) em seus projetos, 
            proporcionando maior precisão, integração entre disciplinas, otimização de processos e redução de riscos durante a execução da obra.
          </p>
        </section>

        {/* Prazos e etapas */}
        <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
          <h3 style={{ 
            color: '#f97316', 
            fontSize: '12px', 
            fontWeight: 700, 
            margin: '0 0 6px 0' 
          }}>
            Prazos e etapas:
          </h3>
          <p style={{ 
            color: '#374151', 
            fontSize: '11px', 
            lineHeight: 1.5, 
            margin: '0 0 8px 0', 
            textAlign: 'justify' 
          }}>
            O prazo de execução dos serviços propostos é de <strong>{prazo}</strong>, contados a partir da entrega de todas as informações 
            necessárias para o início do projeto, incluindo dados geotécnicos, arquitetônicos e das instalações de engenharia.
          </p>
          <p style={{ 
            color: '#374151', 
            fontSize: '11px', 
            lineHeight: 1.5, 
            margin: '0 0 8px 0', 
            textAlign: 'justify' 
          }}>
            O desenvolvimento do projeto será estruturado de forma a garantir a qualidade técnica, a compatibilização entre disciplinas e a eficiência na execução.
          </p>
          <p style={{ 
            color: '#374151', 
            fontSize: '11px', 
            fontWeight: 600, 
            margin: '0 0 4px 0' 
          }}>
            As etapas do projeto incluem:
          </p>
          <ul style={{ 
            color: '#374151', 
            fontSize: '10px', 
            lineHeight: 1.5, 
            margin: 0, 
            paddingLeft: '16px' 
          }}>
            <li>Reunião de alinhamento: validação dos métodos construtivos e premissas técnicas;</li>
            <li>Pré-projeto: lançamentos preliminares dos elementos estruturais, visando compatibilização com arquitetura e instalações;</li>
            <li>Projeto executivo: detalhamento completo de todos os elementos estruturais, incluindo dimensões, materiais e especificações técnicas, em conformidade com as normas ABNT aplicáveis.</li>
            <li>Emissão de documentação final: pranchas em formato DWG, PDF e arquivo IFC, bem como ART de responsabilidade técnica pela elaboração do projeto.</li>
            {formData.visitaTecnica && <li>Visita técnica ({formData.horasVisita}h) – custos de deslocamento, hospedagem e alimentação sob responsabilidade da contratante.</li>}
          </ul>
        </section>

        {/* Valores - seguindo exatamente o modelo */}
        <section style={{ marginBottom: '16px', pageBreakInside: 'avoid' }}>
          <h3 style={{ 
            color: '#f97316', 
            fontSize: '12px', 
            fontWeight: 700, 
            margin: '0 0 10px 0' 
          }}>
            Valores:
          </h3>
          <div style={{ maxWidth: '450px' }}>
            {budget.infraestruturaFundacoes && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0', 
                borderBottom: '1px solid #e5e7eb' 
              }}>
                <span style={{ color: '#374151', fontSize: '11px' }}>Projeto de infraestrutura - Fundações</span>
                <span style={{ color: '#374151', fontSize: '11px', fontWeight: 500 }}>{formatCurrency(budget.infraestruturaFundacoes.valor)}</span>
              </div>
            )}
            {budget.infraestruturaContencoes && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0', 
                borderBottom: '1px solid #e5e7eb' 
              }}>
                <span style={{ color: '#374151', fontSize: '11px' }}>Projeto de infraestrutura - Contenções</span>
                <span style={{ color: '#374151', fontSize: '11px', fontWeight: 500 }}>{formatCurrency(budget.infraestruturaContencoes.valor)}</span>
              </div>
            )}
            {budget.superestrutura && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0', 
                borderBottom: '1px solid #e5e7eb' 
              }}>
                <span style={{ color: '#374151', fontSize: '11px' }}>Projeto de superestrutura - Estruturas</span>
                <span style={{ color: '#374151', fontSize: '11px', fontWeight: 500 }}>{formatCurrency(budget.superestrutura.valor)}</span>
              </div>
            )}
            {budget.visitaTecnica && (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '6px 0', 
                borderBottom: '1px solid #e5e7eb' 
              }}>
                <span style={{ color: '#374151', fontSize: '11px' }}>Visita técnica</span>
                <span style={{ color: '#374151', fontSize: '11px', fontWeight: 500 }}>{formatCurrency(budget.visitaTecnica.valor)}</span>
              </div>
            )}
            
            {/* Total row */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '10px 0', 
              borderBottom: '2px solid #1f2937' 
            }}>
              <span style={{ color: '#1f2937', fontSize: '12px', fontWeight: 700 }}>Total:</span>
              <span style={{ color: '#1f2937', fontSize: '16px', fontWeight: 700 }}>{formatCurrency(budget.total)}</span>
            </div>
            
            {/* Discount row - com destaque laranja conforme modelo */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '10px 0',
              marginTop: '4px'
            }}>
              <span style={{ color: '#374151', fontSize: '11px' }}>Desconto de 7% para pagamento à vista</span>
              <span style={{ 
                color: '#f97316', 
                fontSize: '18px', 
                fontWeight: 700,
                border: '2px solid #f97316',
                padding: '4px 10px',
                borderRadius: '4px',
                backgroundColor: 'rgba(249, 115, 22, 0.05)'
              }}>
                {formatCurrency(budget.totalAVista)}
              </span>
            </div>
          </div>
        </section>

        {/* Pagamento */}
        <section style={{ marginBottom: '20px', pageBreakInside: 'avoid' }}>
          <h3 style={{ 
            color: '#f97316', 
            fontSize: '12px', 
            fontWeight: 700, 
            margin: '0 0 6px 0' 
          }}>
            Pagamento:
          </h3>
          <p style={{ 
            color: '#374151', 
            fontSize: '11px', 
            lineHeight: 1.6, 
            margin: 0, 
            textAlign: 'justify' 
          }}>
            Uma entrada de 15%, com o saldo de 85% podendo ser quitado na entrega do projeto ou de acordo com o cronograma de 
            faturamento do contratante, proporcionando flexibilidade e conveniência para a sua empresa.
          </p>
          <p style={{ 
            color: '#6b7280', 
            fontSize: '10px', 
            marginTop: '16px', 
            textAlign: 'right',
            fontStyle: 'italic'
          }}>
            Este orçamento tem validade de 15 dias.
          </p>
        </section>

        {/* Signature Section - com borda laranja superior */}
        <section style={{ 
          borderTop: '3px solid #f97316', 
          paddingTop: '16px', 
          marginBottom: '20px',
          pageBreakInside: 'avoid'
        }}>
          <h4 style={{ 
            color: '#1f2937', 
            fontSize: '14px', 
            fontWeight: 700, 
            margin: '0 0 6px 0' 
          }}>
            Diretor de operações
          </h4>
          <p style={{ color: '#374151', fontSize: '11px', margin: '0 0 2px 0' }}>
            {companyInfo.director} | Engenheiro civil | {companyInfo.crea}
          </p>
          <p style={{ color: '#6b7280', fontSize: '10px', margin: 0 }}>
            Especialista em Engenharia de Estruturas e Fundações
          </p>
        </section>

        {/* Logo and tagline - centralizado */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '24px', 
          marginBottom: '20px',
          pageBreakInside: 'avoid'
        }}>
          <img 
            src="/lovable-uploads/8f2a2089-73cb-4c6f-a486-4af882a94bf5.png" 
            alt="Gama Cálculo Estrutural" 
            style={{ height: '60px', width: 'auto', marginBottom: '12px' }}
          />
          <p style={{ 
            color: '#f97316', 
            fontSize: '13px', 
            fontWeight: 600, 
            margin: 0 
          }}>
            Segurança estrutural começa com um projeto confiável. Fale conosco.
          </p>
        </div>
      </div>

      {/* Footer - rodapé cinza com margens adequadas */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        borderTop: '3px solid #d4d4d4',
        padding: '14px 32px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        marginTop: 'auto'
      }}>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px', 
          color: '#525252', 
          fontSize: '10px' 
        }}>
          <Globe style={{ width: '12px', height: '12px' }} />
          {companyInfo.website}
        </span>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px', 
          color: '#525252', 
          fontSize: '10px' 
        }}>
          <Instagram style={{ width: '12px', height: '12px' }} />
          {companyInfo.instagram}
        </span>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px', 
          color: '#525252', 
          fontSize: '10px' 
        }}>
          <Phone style={{ width: '12px', height: '12px' }} />
          {companyInfo.phone}
        </span>
        <span style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px', 
          color: '#525252', 
          fontSize: '10px' 
        }}>
          <Mail style={{ width: '12px', height: '12px' }} />
          {companyInfo.email}
        </span>
      </div>
    </div>
  );
}
