import { BudgetFormData, CalculatedBudget, COMPLEXIDADE_OPTIONS } from '@/types/budget';

export function calculateBudget(formData: BudgetFormData): CalculatedBudget {
  let infraestruturaFundacoes = null;
  let infraestruturaContencoes = null;
  let superestrutura = null;
  let visitaTecnica = null;

  // 1. Cálculo de Infraestrutura - Fundações
  if (formData.tipoFundacao.length > 0 && formData.numElementosEstruturais && formData.numElementosEstruturais > 0) {
    const complexidade = COMPLEXIDADE_OPTIONS.find(c => c.value === formData.nivelComplexidade);
    const multiplicador = complexidade?.multiplicador || 1000;
    const valor = formData.numElementosEstruturais * multiplicador;
    
    const tiposTexto = formData.tipoFundacao.length > 0 
      ? `(${formData.tipoFundacao.join(', ')})`
      : '';
    
    infraestruturaFundacoes = {
      descricao: `Projeto de infraestrutura - Fundações ${tiposTexto}`,
      valor,
    };
  }

  // 2. Cálculo de Infraestrutura - Contenções
  if (formData.tipoContencao.length > 0 && formData.areaContencao && formData.areaContencao > 0) {
    let valor = 0;
    const area = formData.areaContencao;

    if (area <= 15) {
      valor = 3000;
    } else if (area <= 30) {
      valor = area * 350;
    } else {
      valor = area * 250;
    }

    infraestruturaContencoes = {
      descricao: `Projeto de infraestrutura - Contenções (${formData.areaContencao} m²)`,
      valor,
    };
  }

  // 3. Cálculo de Superestrutura
  if (formData.tipoEstrutura.length > 0 && formData.areaConstruida && formData.areaConstruida > 0) {
    const area = formData.areaConstruida;
    let valorPorM2 = 12;

    if (area >= 100 && area < 1000) {
      valorPorM2 = 12;
    } else if (area >= 1000 && area < 2000) {
      valorPorM2 = 10;
    } else if (area >= 2000) {
      valorPorM2 = 8.5;
    }

    let valorOriginal = area * valorPorM2;
    let descontoPavimentoTipo = 0;

    if (formData.pavimentosTipo) {
      descontoPavimentoTipo = valorOriginal * 0.15;
    }

    const valorFinal = valorOriginal - descontoPavimentoTipo;

    const tiposTexto = formData.tipoEstrutura.length > 0 
      ? `(${formData.tipoEstrutura.join(', ')})`
      : '';

    superestrutura = {
      descricao: `Projeto de superestrutura - Estruturas ${tiposTexto}`,
      valor: valorFinal,
      valorOriginal,
      descontoPavimentoTipo,
    };
  }

  // 4. Visita Técnica
  if (formData.visitaTecnica && formData.horasVisita > 0) {
    visitaTecnica = {
      descricao: `Visita técnica (${formData.horasVisita}h × R$ 300,00/h)`,
      valor: formData.horasVisita * 300,
    };
  }

  // Cálculo de totais
  const subtotal = 
    (infraestruturaFundacoes?.valor || 0) +
    (infraestruturaContencoes?.valor || 0) +
    (superestrutura?.valor || 0) +
    (visitaTecnica?.valor || 0);

  const descontoAVista = subtotal * 0.07;
  const total = subtotal;
  const totalAVista = subtotal - descontoAVista;
  const entrada = subtotal * 0.15;
  const saldo = subtotal * 0.85;

  return {
    infraestruturaFundacoes,
    infraestruturaContencoes,
    superestrutura,
    visitaTecnica,
    subtotal,
    descontoAVista,
    total,
    totalAVista,
    entrada,
    saldo,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function estimateDeadline(formData: BudgetFormData): string {
  let dias = 15;

  // Base por área
  if (formData.areaConstruida) {
    if (formData.areaConstruida < 500) dias = 15;
    else if (formData.areaConstruida < 1000) dias = 20;
    else if (formData.areaConstruida < 2000) dias = 25;
    else dias = 30;
  }

  // Ajuste por complexidade
  if (formData.nivelComplexidade === '02') dias += 5;
  if (formData.nivelComplexidade === '03') dias += 10;

  // Ajuste por escopo
  if (formData.tipoFundacao.length > 0) dias += 5;
  if (formData.tipoContencao.length > 0) dias += 5;

  return `${dias} dias úteis`;
}

export function formatDate(date: Date = new Date()): string {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
