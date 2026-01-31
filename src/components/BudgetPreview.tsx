import { BudgetFormData, CalculatedBudget, CompanyInfo, DEFAULT_COMPANY_INFO, CONTENCAO_OPTIONS } from '@/types/budget';
import { formatCurrency, estimateDeadline, formatDate } from '@/utils/budgetCalculations';
import { Globe, Instagram, Phone, Mail } from 'lucide-react';

interface BudgetPreviewProps {
  formData: BudgetFormData;
  budget: CalculatedBudget;
  companyInfo?: CompanyInfo;
}

// Componente do Rodapé - reutilizável
const PageFooter = ({ companyInfo }: { companyInfo: CompanyInfo }) => (
  <div style={{ 
    backgroundColor: '#e5e7eb', 
    padding: '12px 35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    marginTop: 'auto'
  }}>
    <span style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '6px', 
      color: '#6b7280', 
      fontSize: '10px' 
    }}>
      <Globe style={{ width: '12px', height: '12px' }} />
      {companyInfo.website}
    </span>
    <span style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '6px', 
      color: '#6b7280', 
      fontSize: '10px' 
    }}>
      <Instagram style={{ width: '12px', height: '12px' }} />
      {companyInfo.instagram}
    </span>
    <span style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '6px', 
      color: '#6b7280', 
      fontSize: '10px' 
    }}>
      <Phone style={{ width: '12px', height: '12px' }} />
      {companyInfo.phone}
    </span>
    <span style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '6px', 
      color: '#6b7280', 
      fontSize: '10px' 
    }}>
      <Mail style={{ width: '12px', height: '12px' }} />
      {companyInfo.email}
    </span>
  </div>
);

export function BudgetPreview({
  formData,
  budget,
  companyInfo = DEFAULT_COMPANY_INFO
}: BudgetPreviewProps) {
  const prazo = estimateDeadline(formData);
  const dataAtual = formatDate();
  
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

  // Cores do modelo original
  const orange = '#f97316';
  const bodyText = '#374151';
  const darkText = '#1f2937';
  const grayText = '#6b7280';

  return (
    <div 
      id="budget-pdf" 
      style={{ 
        fontFamily: "'Open Sans', sans-serif", 
        backgroundColor: 'white', 
        color: darkText,
        width: '100%',
        maxWidth: '210mm',
        margin: '0 auto'
      }}
    >
      {/* ==================== PÁGINA 1 ==================== */}
      <div style={{ 
        minHeight: '297mm',
        display: 'flex',
        flexDirection: 'column',
        pageBreakAfter: 'always'
      }}>
        {/* CABEÇALHO - Diagonal cinza com logo */}
        <div style={{ 
          position: 'relative', 
          height: '100px',
          overflow: 'hidden',
          marginBottom: '0'
        }}>
          {/* Fundo cinza diagonal esquerdo - mais estreito como no modelo */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '45%',
            height: '100%',
            backgroundColor: '#d1d5db',
            clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)'
          }} />
          
          {/* Área direita com fundo cinza claro e logo */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0,
            width: '65%',
            height: '100%',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/lovable-uploads/8f2a2089-73cb-4c6f-a486-4af882a94bf5.png" 
              alt="Gama Cálculo Estrutural" 
              style={{ height: '60px', width: 'auto' }}
            />
          </div>
          
          {/* PROPOSTA COMERCIAL - texto sobre o cinza */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '30px',
            transform: 'translateY(-50%)',
            zIndex: 2
          }}>
            <div style={{ 
              fontSize: '22px', 
              fontWeight: 700, 
              fontFamily: "'Montserrat', sans-serif", 
              lineHeight: 1.2,
              color: '#1a1a1a',
              letterSpacing: '0px'
            }}>
              PROPOSTA
            </div>
            <div style={{ 
              fontSize: '22px', 
              fontWeight: 700, 
              fontFamily: "'Montserrat', sans-serif", 
              lineHeight: 1.2,
              color: '#1a1a1a',
              letterSpacing: '0px'
            }}>
              COMERCIAL
            </div>
          </div>
        </div>

        {/* SEÇÃO CLIENTE / LOCAL/DATA - centralizado */}
        <div style={{ 
          padding: '20px 40px 15px 40px',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <div style={{ 
              color: orange, 
              fontWeight: 600, 
              fontSize: '14px', 
              marginBottom: '3px'
            }}>
              Cliente:
            </div>
            <div style={{ 
              color: darkText, 
              fontSize: '13px',
              lineHeight: 1.3
            }}>
              {formData.clienteName || '—'}
            </div>
            {formData.clienteEmail && (
              <div style={{ 
                color: grayText, 
                fontSize: '12px' 
              }}>
                {formData.clienteEmail}
              </div>
            )}
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              color: orange, 
              fontWeight: 600, 
              fontSize: '14px', 
              marginBottom: '3px'
            }}>
              Local/Data:
            </div>
            <div style={{ 
              color: darkText, 
              fontSize: '13px' 
            }}>
              {formData.obraLocal || '—'}
            </div>
            <div style={{ 
              color: grayText, 
              fontSize: '12px' 
            }}>
              {dataAtual}
            </div>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL - Página 1 */}
        <div style={{ padding: '0 40px', flex: 1 }}>
          
          {/* ESCOPO DO SERVIÇO - título em PRETO como no modelo */}
          <section style={{ marginBottom: '18px' }}>
            <h3 style={{ 
              color: darkText, 
              fontSize: '14px', 
              fontWeight: 700, 
              margin: '0 0 8px 0', 
              textTransform: 'uppercase',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              ESCOPO DO SERVIÇO:
            </h3>
            <p style={{ 
              color: bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: 0, 
              textAlign: 'justify' 
            }}>
              {formData.escopoServico || `A presente proposta tem por objeto a elaboração dos projetos de infraestrutura e superestrutura referentes à obra ${formData.obraName || '[Nome da Obra]'}, localizada em ${formData.obraLocal || '[Local]'}.`}
            </p>
          </section>

          {/* Infraestrutura */}
          {formData.tipoFundacao.length > 0 && (
            <section style={{ marginBottom: '18px' }}>
              <h3 style={{ 
                color: orange, 
                fontSize: '14px', 
                fontWeight: 600, 
                margin: '0 0 8px 0',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                Infraestrutura:
              </h3>
              <p style={{ 
                color: bodyText, 
                fontSize: '12px', 
                lineHeight: 1.7, 
                margin: 0, 
                textAlign: 'justify' 
              }}>
                O projeto contemplará as fundações profundas e/ou rasas em concreto armado, dimensionadas conforme as características geotécnicas obtidas no laudo de sondagem. A definição do tipo de fundação será estabelecida em função da capacidade de carga do solo e das solicitações estruturais, assegurando desempenho, segurança e durabilidade da obra.
              </p>
            </section>
          )}

          {/* Superestrutura */}
          {formData.tipoEstrutura.length > 0 && (
            <section style={{ marginBottom: '18px' }}>
              <h3 style={{ 
                color: orange, 
                fontSize: '14px', 
                fontWeight: 600, 
                margin: '0 0 8px 0',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                Superestrutura:
              </h3>
              <p style={{ 
                color: bodyText, 
                fontSize: '12px', 
                lineHeight: 1.7, 
                margin: 0, 
                textAlign: 'justify' 
              }}>
                A concepção estrutural da edificação, incluindo a superestrutura em concreto e/ou estrutura metálica, será desenvolvida conforme as diretrizes, premissas técnicas e especificações definidas no escopo de serviços, contemplando o dimensionamento e detalhamento dos elementos estruturais necessários à execução.
              </p>
            </section>
          )}

          {/* Contenções */}
          {formData.tipoContencao.length > 0 && (
            <section style={{ marginBottom: '18px' }}>
              <h3 style={{ 
                color: orange, 
                fontSize: '14px', 
                fontWeight: 600, 
                margin: '0 0 8px 0',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                Contenções:
              </h3>
              <p style={{ 
                color: bodyText, 
                fontSize: '12px', 
                lineHeight: 1.7, 
                margin: 0, 
                textAlign: 'justify' 
              }}>
                O projeto contemplará contenções do tipo: {getContencaoLabels().join('; ')}.
                {formData.areaContencao && ` Área de contenção: ${formData.areaContencao} m².`}
              </p>
            </section>
          )}

          {/* Compatibilização de Projetos */}
          <section style={{ marginBottom: '18px' }}>
            <h3 style={{ 
              color: orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 8px 0',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Compatibilização de Projetos:
            </h3>
            <p style={{ 
              color: bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: 0, 
              textAlign: 'justify' 
            }}>
              O projeto estrutural será desenvolvido seguindo rigorosamente os trâmites de compatibilização com os projetos de instalações de engenharia e o projeto arquitetônico, assegurando alinhamento entre as disciplinas, evitando conflitos e garantindo maior eficiência na execução da obra.
            </p>
          </section>

          {/* Normas Técnicas Aplicáveis */}
          <section style={{ marginBottom: '18px' }}>
            <h3 style={{ 
              color: orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 8px 0',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Normas Técnicas Aplicáveis:
            </h3>
            <p style={{ 
              color: bodyText, 
              fontSize: '12px', 
              lineHeight: 1.6, 
              margin: '0 0 8px 0', 
              textAlign: 'justify' 
            }}>
              Os serviços de dimensionamento estrutural serão realizados em conformidade com as normas da Associação Brasileira de Normas Técnicas (ABNT), destacando-se:
            </p>
            <ul style={{ 
              color: bodyText, 
              fontSize: '11px', 
              lineHeight: 1.5, 
              margin: 0, 
              paddingLeft: '18px' 
            }}>
              <li>NBR 6118:2014 – Projeto de Estruturas de Concreto – Procedimento;</li>
              <li>NBR 6122:2019 – Projeto e Execução de Fundações;</li>
              <li>NBR 8800:2008 – Projeto de Estruturas de Aço e de Estruturas Mistas de Aço e Concreto de Edifícios;</li>
              <li>NBR 9062:2017 – Projeto e Execução de Estruturas Pré-moldadas de Concreto;</li>
              <li>NBR 14762:2010 – Dimensionamento de Estruturas de Aço Constituídas por Perfis Formados a Frio;</li>
              <li>NBR 15961-1:2020 – Alvenaria Estrutural – Parte 1: Projeto;</li>
              <li>NBR 15961-2:2020 – Alvenaria Estrutural – Parte 2: Execução e Controle de Obras;</li>
              <li>Demais normas correlatas que se fizerem necessárias.</li>
            </ul>
          </section>

          {/* Metodologia */}
          <section style={{ marginBottom: '18px' }}>
            <h3 style={{ 
              color: orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 8px 0',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Metodologia:
            </h3>
            <p style={{ 
              color: bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: 0, 
              textAlign: 'justify' 
            }}>
              Reforçamos que nossa empresa adota integralmente a metodologia BIM (Building Information Modeling) em seus projetos, proporcionando maior precisão, integração entre disciplinas, otimização de processos e redução de riscos durante a execução da obra.
            </p>
          </section>
        </div>

        {/* Rodapé Página 1 */}
        <PageFooter companyInfo={companyInfo} />
      </div>

      {/* ==================== PÁGINA 2 ==================== */}
      <div style={{ 
        minHeight: '297mm',
        display: 'flex',
        flexDirection: 'column',
        pageBreakBefore: 'always'
      }}>
        {/* Barra cinza simples no topo da página 2 */}
        <div style={{ 
          height: '12px',
          backgroundColor: '#d1d5db'
        }} />

        {/* CONTEÚDO - Página 2 */}
        <div style={{ padding: '25px 40px', flex: 1 }}>
          
          {/* Prazos e etapas */}
          <section style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              color: orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 10px 0',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Prazos e etapas:
            </h3>
            <p style={{ 
              color: bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: '0 0 12px 0', 
              textAlign: 'justify' 
            }}>
              O prazo de execução dos serviços propostos é de <strong>{prazo}</strong>, contados a partir da entrega de todas as informações necessárias para o início do projeto, incluindo dados geotécnicos, arquitetônicos e das instalações de engenharia.
            </p>
            <p style={{ 
              color: bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: '0 0 12px 0', 
              textAlign: 'justify' 
            }}>
              O desenvolvimento do projeto será estruturado de forma a garantir a qualidade técnica, a compatibilização entre disciplinas e a eficiência na execução.
            </p>
            <p style={{ 
              color: bodyText, 
              fontSize: '12px', 
              margin: '0 0 8px 0' 
            }}>
              As etapas do projeto incluem:
            </p>
            <ul style={{ 
              color: bodyText, 
              fontSize: '11px', 
              lineHeight: 1.6, 
              margin: 0, 
              paddingLeft: '18px' 
            }}>
              {formData.visitaTecnica && <li>Visita técnica</li>}
              <li>Reunião de alinhamento: validação dos métodos construtivos e premissas técnicas;</li>
              <li>Pré-projeto: lançamentos preliminares dos elementos estruturais, visando compatibilização com arquitetura e instalações;</li>
              <li>Projeto executivo: detalhamento completo de todos os elementos estruturais, incluindo dimensões, materiais e especificações técnicas, em conformidade com as normas ABNT aplicáveis.</li>
              <li>Emissão de documentação final: pranchas em formato DWG e arquivo IFC, bem como ART de responsabilidade técnica pela elaboração do projeto.</li>
            </ul>
          </section>

          {/* VALORES */}
          <section style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              color: orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 12px 0',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Valores:
            </h3>
            
            <div style={{ maxWidth: '100%' }}>
              {/* Tabela de valores - linhas simples */}
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {budget.visitaTecnica && (
                    <tr>
                      <td style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #e5e7eb',
                        color: bodyText,
                        fontSize: '12px'
                      }}>
                        Visita técnica
                      </td>
                      <td style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #e5e7eb',
                        color: bodyText,
                        fontSize: '12px',
                        textAlign: 'right'
                      }}>
                        {formatCurrency(budget.visitaTecnica.valor)}
                      </td>
                    </tr>
                  )}
                  
                  {budget.infraestruturaFundacoes && (
                    <tr>
                      <td style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #e5e7eb',
                        color: bodyText,
                        fontSize: '12px'
                      }}>
                        Projeto de infraestrutura - Fundações
                      </td>
                      <td style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #e5e7eb',
                        color: bodyText,
                        fontSize: '12px',
                        textAlign: 'right'
                      }}>
                        {formatCurrency(budget.infraestruturaFundacoes.valor)}
                      </td>
                    </tr>
                  )}
                  
                  {budget.infraestruturaContencoes && (
                    <tr>
                      <td style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #e5e7eb',
                        color: bodyText,
                        fontSize: '12px'
                      }}>
                        Projeto de infraestrutura - Contenções
                      </td>
                      <td style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #e5e7eb',
                        color: bodyText,
                        fontSize: '12px',
                        textAlign: 'right'
                      }}>
                        {formatCurrency(budget.infraestruturaContencoes.valor)}
                      </td>
                    </tr>
                  )}
                  
                  {budget.superestrutura && (
                    <tr>
                      <td style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #e5e7eb',
                        color: bodyText,
                        fontSize: '12px'
                      }}>
                        Projeto de superestrutura - Estruturas
                      </td>
                      <td style={{ 
                        padding: '8px 0', 
                        borderBottom: '1px solid #e5e7eb',
                        color: bodyText,
                        fontSize: '12px',
                        textAlign: 'right'
                      }}>
                        {formatCurrency(budget.superestrutura.valor)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {/* TOTAL - linha grossa embaixo */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center',
                gap: '40px',
                padding: '12px 0', 
                borderBottom: '2px solid #1f2937'
              }}>
                <span style={{ color: darkText, fontSize: '13px', fontWeight: 700 }}>Total:</span>
                <span style={{ color: darkText, fontSize: '16px', fontWeight: 700 }}>{formatCurrency(budget.total)}</span>
              </div>
              
              {/* DESCONTO - valor em caixa laranja */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '20px',
                padding: '15px 0'
              }}>
                <span style={{ color: bodyText, fontSize: '12px' }}>Desconto de 7% para pagamento à vista</span>
                <span style={{ 
                  color: orange, 
                  fontSize: '18px', 
                  fontWeight: 700,
                  border: `2px solid ${orange}`,
                  padding: '6px 14px',
                  borderRadius: '3px'
                }}>
                  {formatCurrency(budget.totalAVista)}
                </span>
              </div>
            </div>
          </section>

          {/* Pagamento */}
          <section style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              color: orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 10px 0',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Pagamento:
            </h3>
            <p style={{ 
              color: bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: 0, 
              textAlign: 'justify' 
            }}>
              Uma entrada de 15%, com o saldo de 85% podendo ser quitado na entrega do projeto ou de acordo com o cronograma de faturamento do contratante, proporcionando flexibilidade e conveniência para a sua empresa.
            </p>
          </section>

          {/* Validade - alinhado à direita */}
          <div style={{ 
            textAlign: 'right',
            marginBottom: '30px'
          }}>
            <p style={{ 
              color: grayText, 
              fontSize: '11px',
              margin: 0
            }}>
              Este orçamento tem validade de 15 dias.
            </p>
          </div>

          {/* Linha laranja separadora - grossa como no modelo */}
          <div style={{ 
            borderTop: `4px solid ${orange}`,
            width: '80px',
            marginBottom: '15px'
          }} />

          {/* Diretor de operações */}
          <section style={{ marginBottom: '25px' }}>
            <h4 style={{ 
              color: darkText, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 6px 0',
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Diretor de operações
            </h4>
            <p style={{ color: bodyText, fontSize: '12px', margin: '0 0 2px 0' }}>
              {companyInfo.director} | Engenheiro civil | {companyInfo.crea}
            </p>
            <p style={{ color: grayText, fontSize: '11px', margin: 0 }}>
              Especialista em Engenharia de Estruturas e Fundações
            </p>
          </section>

          {/* Logo centralizado com fundo cinza */}
          <div style={{ 
            backgroundColor: '#f3f4f6',
            padding: '25px',
            textAlign: 'center',
            marginBottom: '18px'
          }}>
            <img 
              src="/lovable-uploads/8f2a2089-73cb-4c6f-a486-4af882a94bf5.png" 
              alt="Gama Cálculo Estrutural" 
              style={{ height: '65px', width: 'auto' }}
            />
          </div>

          {/* Tagline laranja */}
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <p style={{ 
              color: orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: 0,
              fontFamily: "'Montserrat', sans-serif"
            }}>
              Segurança estrutural começa com um projeto confiável. Fale conosco.
            </p>
          </div>
        </div>

        {/* Rodapé Página 2 */}
        <PageFooter companyInfo={companyInfo} />
      </div>
    </div>
  );
}
