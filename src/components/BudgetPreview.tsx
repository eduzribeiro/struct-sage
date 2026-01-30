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

  // Estilo inline para garantir fidelidade no PDF
  const styles = {
    // Cores do modelo original
    orange: '#f97316',
    grayBg: '#d1d5db',
    grayLight: '#f3f4f4',
    grayText: '#525252',
    darkText: '#1f2937',
    bodyText: '#374151',
    
    // Tipografia
    fontFamily: "'Open Sans', 'Segoe UI', sans-serif",
  };

  return (
    <div 
      id="budget-pdf" 
      style={{ 
        fontFamily: styles.fontFamily, 
        backgroundColor: 'white', 
        color: styles.darkText,
        maxWidth: '210mm',
        margin: '0 auto'
      }}
    >
      {/* ==================== PÁGINA 1 ==================== */}
      <div style={{ minHeight: '297mm', display: 'flex', flexDirection: 'column' }}>
        
        {/* CABEÇALHO - Exatamente como o modelo */}
        <div style={{ 
          position: 'relative', 
          height: '100px',
          marginBottom: '0'
        }}>
          {/* Fundo cinza diagonal esquerdo */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '45%',
            height: '100%',
            backgroundColor: styles.grayBg,
            clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0 100%)'
          }} />
          
          {/* PROPOSTA COMERCIAL - texto no cinza */}
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '40px',
            transform: 'translateY(-50%)',
            zIndex: 1
          }}>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 800, 
              fontFamily: "'Montserrat', 'Arial Black', sans-serif", 
              lineHeight: 1.1,
              color: '#1a1a1a',
              letterSpacing: '0px'
            }}>
              PROPOSTA
            </div>
            <div style={{ 
              fontSize: '24px', 
              fontWeight: 800, 
              fontFamily: "'Montserrat', 'Arial Black', sans-serif", 
              lineHeight: 1.1,
              color: '#1a1a1a',
              letterSpacing: '0px'
            }}>
              COMERCIAL
            </div>
          </div>

          {/* Área direita com fundo cinza claro e logo */}
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            right: 0,
            width: '55%',
            height: '100%',
            backgroundColor: styles.grayLight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src="/lovable-uploads/8f2a2089-73cb-4c6f-a486-4af882a94bf5.png" 
              alt="Gama Cálculo Estrutural" 
              style={{ height: '65px', width: 'auto' }}
            />
          </div>
        </div>

        {/* SEÇÃO CLIENTE / LOCAL/DATA */}
        <div style={{ 
          padding: '20px 40px 15px 40px',
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          {/* Cliente */}
          <div>
            <div style={{ 
              color: styles.orange, 
              fontWeight: 600, 
              fontSize: '15px', 
              marginBottom: '4px'
            }}>
              Cliente:
            </div>
            <div style={{ 
              color: styles.darkText, 
              fontSize: '13px',
              lineHeight: 1.4
            }}>
              {formData.clienteName || '—'}
            </div>
            {formData.clienteEmail && (
              <div style={{ 
                color: styles.grayText, 
                fontSize: '12px' 
              }}>
                {formData.clienteEmail}
              </div>
            )}
          </div>
          
          {/* Local/Data */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              color: styles.orange, 
              fontWeight: 600, 
              fontSize: '15px', 
              marginBottom: '4px'
            }}>
              Local/Data:
            </div>
            <div style={{ 
              color: styles.darkText, 
              fontSize: '13px' 
            }}>
              {formData.obraLocal || '—'}
            </div>
            <div style={{ 
              color: styles.grayText, 
              fontSize: '12px' 
            }}>
              {dataAtual}
            </div>
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div style={{ padding: '0 40px', flex: 1 }}>
          
          {/* ESCOPO DO SERVIÇO */}
          <section style={{ marginBottom: '18px' }}>
            <h3 style={{ 
              color: styles.darkText, 
              fontSize: '14px', 
              fontWeight: 700, 
              margin: '0 0 8px 0', 
              textTransform: 'uppercase',
              letterSpacing: '0.3px'
            }}>
              ESCOPO DO SERVIÇO:
            </h3>
            <p style={{ 
              color: styles.bodyText, 
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
                color: styles.orange, 
                fontSize: '14px', 
                fontWeight: 600, 
                margin: '0 0 8px 0' 
              }}>
                Infraestrutura:
              </h3>
              <p style={{ 
                color: styles.bodyText, 
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
                color: styles.orange, 
                fontSize: '14px', 
                fontWeight: 600, 
                margin: '0 0 8px 0' 
              }}>
                Superestrutura:
              </h3>
              <p style={{ 
                color: styles.bodyText, 
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
                color: styles.orange, 
                fontSize: '14px', 
                fontWeight: 600, 
                margin: '0 0 8px 0' 
              }}>
                Contenções:
              </h3>
              <p style={{ 
                color: styles.bodyText, 
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
              color: styles.orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 8px 0' 
            }}>
              Compatibilização de Projetos:
            </h3>
            <p style={{ 
              color: styles.bodyText, 
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
              color: styles.orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 8px 0' 
            }}>
              Normas Técnicas Aplicáveis:
            </h3>
            <p style={{ 
              color: styles.bodyText, 
              fontSize: '12px', 
              lineHeight: 1.6, 
              margin: '0 0 8px 0', 
              textAlign: 'justify' 
            }}>
              Os serviços de dimensionamento estrutural serão realizados em conformidade com as normas da Associação Brasileira de Normas Técnicas (ABNT), destacando-se:
            </p>
            <ul style={{ 
              color: styles.bodyText, 
              fontSize: '11px', 
              lineHeight: 1.6, 
              margin: 0, 
              paddingLeft: '20px' 
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
              color: styles.orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 8px 0' 
            }}>
              Metodologia:
            </h3>
            <p style={{ 
              color: styles.bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: 0, 
              textAlign: 'justify' 
            }}>
              Reforçamos que nossa empresa adota integralmente a metodologia BIM (Building Information Modeling) em seus projetos, proporcionando maior precisão, integração entre disciplinas, otimização de processos e redução de riscos durante a execução da obra.
            </p>
          </section>
        </div>

        {/* RODAPÉ - Página 1 */}
        <div style={{ 
          backgroundColor: styles.grayLight, 
          borderTop: `3px solid ${styles.grayBg}`,
          padding: '12px 40px',
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
            color: styles.grayText, 
            fontSize: '10px' 
          }}>
            <Globe style={{ width: '12px', height: '12px' }} />
            {companyInfo.website}
          </span>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: styles.grayText, 
            fontSize: '10px' 
          }}>
            <Instagram style={{ width: '12px', height: '12px' }} />
            {companyInfo.instagram}
          </span>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: styles.grayText, 
            fontSize: '10px' 
          }}>
            <Phone style={{ width: '12px', height: '12px' }} />
            {companyInfo.phone}
          </span>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: styles.grayText, 
            fontSize: '10px' 
          }}>
            <Mail style={{ width: '12px', height: '12px' }} />
            {companyInfo.email}
          </span>
        </div>
      </div>

      {/* ==================== PÁGINA 2 ==================== */}
      <div style={{ 
        minHeight: '297mm', 
        display: 'flex', 
        flexDirection: 'column',
        pageBreakBefore: 'always'
      }}>
        
        {/* Barra cinza superior - Página 2 */}
        <div style={{ 
          height: '10px',
          backgroundColor: styles.grayBg
        }} />

        {/* CONTEÚDO - Página 2 */}
        <div style={{ padding: '25px 40px', flex: 1 }}>
          
          {/* Prazos e etapas */}
          <section style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              color: styles.orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 10px 0' 
            }}>
              Prazos e etapas:
            </h3>
            <p style={{ 
              color: styles.bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: '0 0 12px 0', 
              textAlign: 'justify' 
            }}>
              O prazo de execução dos serviços propostos é de <strong>{prazo}</strong>, contados a partir da entrega de todas as informações necessárias para o início do projeto, incluindo dados geotécnicos, arquitetônicos e das instalações de engenharia.
            </p>
            <p style={{ 
              color: styles.bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: '0 0 12px 0', 
              textAlign: 'justify' 
            }}>
              O desenvolvimento do projeto será estruturado de forma a garantir a qualidade técnica, a compatibilização entre disciplinas e a eficiência na execução.
            </p>
            <p style={{ 
              color: styles.bodyText, 
              fontSize: '12px', 
              fontWeight: 600, 
              margin: '0 0 8px 0' 
            }}>
              As etapas do projeto incluem:
            </p>
            <ul style={{ 
              color: styles.bodyText, 
              fontSize: '11px', 
              lineHeight: 1.7, 
              margin: 0, 
              paddingLeft: '20px' 
            }}>
              {formData.visitaTecnica && <li>Visita técnica</li>}
              <li>Reunião de alinhamento: validação dos métodos construtivos e premissas técnicas;</li>
              <li>Pré-projeto: lançamentos preliminares dos elementos estruturais, visando compatibilização com arquitetura e instalações;</li>
              <li>Projeto executivo: detalhamento completo de todos os elementos estruturais, incluindo dimensões, materiais e especificações técnicas, em conformidade com as normas ABNT aplicáveis.</li>
              <li>Emissão de documentação final: pranchas em formato DWG e arquivo IFC, bem como ART de responsabilidade técnica pela elaboração do projeto.</li>
            </ul>
          </section>

          {/* VALORES - Exatamente como o modelo */}
          <section style={{ marginBottom: '20px' }}>
            <h3 style={{ 
              color: styles.orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 12px 0' 
            }}>
              Valores:
            </h3>
            
            <div style={{ maxWidth: '500px' }}>
              {/* Linhas de valores */}
              {budget.visitaTecnica && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0', 
                  borderBottom: '1px solid #e5e5e5' 
                }}>
                  <span style={{ color: styles.bodyText, fontSize: '12px' }}>Visita técnica</span>
                  <span style={{ color: styles.bodyText, fontSize: '12px' }}>{formatCurrency(budget.visitaTecnica.valor)}</span>
                </div>
              )}
              
              {budget.infraestruturaFundacoes && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0', 
                  borderBottom: '1px solid #e5e5e5' 
                }}>
                  <span style={{ color: styles.bodyText, fontSize: '12px' }}>Projeto de infraestrutura - Fundações</span>
                  <span style={{ color: styles.bodyText, fontSize: '12px' }}>{formatCurrency(budget.infraestruturaFundacoes.valor)}</span>
                </div>
              )}
              
              {budget.infraestruturaContencoes && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0', 
                  borderBottom: '1px solid #e5e5e5' 
                }}>
                  <span style={{ color: styles.bodyText, fontSize: '12px' }}>Projeto de infraestrutura - Contenções</span>
                  <span style={{ color: styles.bodyText, fontSize: '12px' }}>{formatCurrency(budget.infraestruturaContencoes.valor)}</span>
                </div>
              )}
              
              {budget.superestrutura && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '8px 0', 
                  borderBottom: '1px solid #e5e5e5' 
                }}>
                  <span style={{ color: styles.bodyText, fontSize: '12px' }}>Projeto de superestrutura - Estruturas</span>
                  <span style={{ color: styles.bodyText, fontSize: '12px' }}>{formatCurrency(budget.superestrutura.valor)}</span>
                </div>
              )}
              
              {/* TOTAL */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center',
                gap: '20px',
                padding: '12px 0', 
                borderBottom: '1px solid #1f2937'
              }}>
                <span style={{ color: styles.darkText, fontSize: '13px', fontWeight: 700 }}>Total:</span>
                <span style={{ color: styles.darkText, fontSize: '16px', fontWeight: 700 }}>{formatCurrency(budget.total)}</span>
              </div>
              
              {/* DESCONTO - com borda laranja como no modelo */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: '20px',
                padding: '15px 0'
              }}>
                <span style={{ color: styles.bodyText, fontSize: '12px' }}>Desconto de 7% para pagamento à vista</span>
                <span style={{ 
                  color: styles.orange, 
                  fontSize: '20px', 
                  fontWeight: 700,
                  border: `2px solid ${styles.orange}`,
                  padding: '6px 14px',
                  borderRadius: '4px'
                }}>
                  {formatCurrency(budget.totalAVista)}
                </span>
              </div>
            </div>
          </section>

          {/* Pagamento */}
          <section style={{ marginBottom: '25px' }}>
            <h3 style={{ 
              color: styles.orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: '0 0 10px 0' 
            }}>
              Pagamento:
            </h3>
            <p style={{ 
              color: styles.bodyText, 
              fontSize: '12px', 
              lineHeight: 1.7, 
              margin: 0, 
              textAlign: 'justify' 
            }}>
              Uma entrada de 15%, com o saldo de 85% podendo ser quitado na entrega do projeto ou de acordo com o cronograma de faturamento do contratante, proporcionando flexibilidade e conveniência para a sua empresa.
            </p>
          </section>

          {/* Validade */}
          <div style={{ 
            textAlign: 'right',
            marginBottom: '30px'
          }}>
            <p style={{ 
              color: styles.grayText, 
              fontSize: '11px',
              fontStyle: 'italic',
              margin: 0
            }}>
              Este orçamento tem validade de 15 dias.
            </p>
          </div>

          {/* Linha laranja separadora */}
          <div style={{ 
            borderTop: `4px solid ${styles.orange}`,
            width: '80px',
            marginBottom: '15px'
          }} />

          {/* Diretor de operações */}
          <section style={{ marginBottom: '30px' }}>
            <h4 style={{ 
              color: styles.darkText, 
              fontSize: '15px', 
              fontWeight: 600, 
              margin: '0 0 6px 0' 
            }}>
              Diretor de operações
            </h4>
            <p style={{ color: styles.bodyText, fontSize: '12px', margin: '0 0 2px 0' }}>
              {companyInfo.director} | Engenheiro civil | {companyInfo.crea}
            </p>
            <p style={{ color: styles.grayText, fontSize: '11px', margin: 0 }}>
              Especialista em Engenharia de Estruturas e Fundações
            </p>
          </section>

          {/* Logo centralizado com fundo cinza */}
          <div style={{ 
            backgroundColor: styles.grayLight,
            padding: '25px',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            <img 
              src="/lovable-uploads/8f2a2089-73cb-4c6f-a486-4af882a94bf5.png" 
              alt="Gama Cálculo Estrutural" 
              style={{ height: '70px', width: 'auto' }}
            />
          </div>

          {/* Tagline laranja */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p style={{ 
              color: styles.orange, 
              fontSize: '14px', 
              fontWeight: 600, 
              margin: 0 
            }}>
              Segurança estrutural começa com um projeto confiável. Fale conosco.
            </p>
          </div>
        </div>

        {/* RODAPÉ - Página 2 */}
        <div style={{ 
          backgroundColor: styles.grayLight, 
          borderTop: `3px solid ${styles.grayBg}`,
          padding: '12px 40px',
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
            color: styles.grayText, 
            fontSize: '10px' 
          }}>
            <Globe style={{ width: '12px', height: '12px' }} />
            {companyInfo.website}
          </span>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: styles.grayText, 
            fontSize: '10px' 
          }}>
            <Instagram style={{ width: '12px', height: '12px' }} />
            {companyInfo.instagram}
          </span>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: styles.grayText, 
            fontSize: '10px' 
          }}>
            <Phone style={{ width: '12px', height: '12px' }} />
            {companyInfo.phone}
          </span>
          <span style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: styles.grayText, 
            fontSize: '10px' 
          }}>
            <Mail style={{ width: '12px', height: '12px' }} />
            {companyInfo.email}
          </span>
        </div>
      </div>
    </div>
  );
}
